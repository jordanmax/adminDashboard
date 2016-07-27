import {Component, ViewContainerRef, Input, Output, EventEmitter, AfterViewInit, Inject} from '@angular/core';
import { AddJobModalService } from '../calendar/add-job-modal.service';
import {NgIf, NgFor, NgClass, NgModel, FORM_DIRECTIVES, ControlValueAccessor} from '@angular/common';
import { Subscription }   from 'rxjs/Subscription';
import * as moment_ from 'moment';

const moment: moment.MomentStatic = (<any>moment_)['default'] || moment_;

@Component({
  selector: 'datepicker[ngModel]',
  template: `
  <input type="text"
         class="form-field__input"
         (focus)="openDatepicker()"
         [value]="viewValue"
         [hidden]="isStatic"
         readonly>

  <div class="datepicker" *ngIf="isStatic || isOpened" [ngClass]="{ static: isStatic }">
    <div class="datepicker__dayname">{{ dateLabels.fullDayName }}</div>
    <div class="datepicker__header">
      <div class="mdl-button mdl-js-button mdl-button--icon" (click)="prevMonth()">
        <i class="material-icons">keyboard_arrow_left</i>
      </div>
      <div class="datepicker__header__content">
        <div class="datepicker__header__month">{{ dateLabels.month }}</div>
        <div class="datepicker__header__day">{{ dateLabels.day }}</div>
        <div class="datepicker__header__year">{{ dateLabels.year }}</div>
      </div>
      <div class="mdl-button mdl-js-button mdl-button--icon" (click)="nextMonth()">
        <i class="material-icons">keyboard_arrow_right</i>
      </div>
    </div>
    <div class="datepicker__body">
    
      <div class="datepicker__day-names">
        <span  class="datepicker__day-names__item" *ngFor="#dn of dayNames">
          {{ dn }}
        </span>
      </div>
      <div class="datepicker__days-wrapper">
        <span class="datepicker__days-wrapper__item" *ngFor="#d of days; #i = index;">
          <span class="day mdl-button mdl-button--icon" [ngClass]="{'disabled': !d.enabled, 'selected': isSelected(d)}" (click)="selectDate($event, d)">
            {{ d.day }}
          </span>
        </span>
      </div>
      
    </div>
  </div>
  `,
  providers: [],
  directives: [FORM_DIRECTIVES, NgIf, NgFor, NgClass],
  pipes: []
})
export class DatePicker implements ControlValueAccessor, AfterViewInit {
  public isOpened: boolean;
  public dateValue: string;
  public dateLabels: Object;
  public viewValue: string;
  public days: Array<Object>;
  public dayNames: Array<string>;
  private el: any;
  private date: any;
  private viewContainer: ViewContainerRef;
  private onChange: Function;
  private onTouched: Function;
  private cd: any;
  private cannonical: number;
  subscription: Subscription;

  @Input('model-format') modelFormat: string;
  @Input('view-format') viewFormat: string;
  @Input('init-date') initDate: string;
  @Input('first-week-day-sunday') firstWeekDaySunday: boolean;
  @Input('static') isStatic: boolean;

  @Output() changed: EventEmitter<Date> = new EventEmitter<Date>();

  constructor(
    @Inject(NgModel) cd: NgModel,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(AddJobModalService) private addJobModalService: AddJobModalService
  ) {
    cd.valueAccessor = this;
    this.cd = cd;
    this.viewContainer = viewContainer;
    this.el = viewContainer.element.nativeElement;
    if(this.initDate) {
      this.init();
    }

    this.subscription = addJobModalService.modelOpened$.subscribe(
      date => {
        this.initDate = date;
        this.initValue();
        this.init();
      });
  }

  ngAfterViewInit() {
    if(this.initDate) {
      this.initValue();
    }
  }

  public openDatepicker(): void {
    this.isOpened = true;
  }

  public closeDatepicker(): void {
    this.isOpened = false;
  }

  public prevYear(): void {
    this.date.subtract(1, 'Y');
    this.generateCalendar(this.date);
  }

  public prevMonth(): void {
    this.date.subtract(1, 'M');
    this.generateCalendar(this.date);
  }

  public nextYear(): void {
    this.date.add(1, 'Y');
    this.generateCalendar(this.date);
  }

  public nextMonth(): void {
    this.date.add(1, 'M');
    this.generateCalendar(this.date);
  }

  public selectDate(e, date): void {
    e.preventDefault();
    if (this.isSelected(date)) return;

    let selectedDate = moment(date.day + '.' + date.month + '.' + date.year, 'DD.MM.YYYY');
    this.setValue(selectedDate);
    this.closeDatepicker();
    this.changed.emit(selectedDate.toDate());
  }

  private generateCalendar(date): void {
    let lastDayOfMonth = date.endOf('month').date();
    let month = date.month();
    let year = date.year();
    let n = 1;
    let firstWeekDay = null;

    this.dateValue = date.format('MMMM YYYY');
    this.dateLabels = {
      day: date.format('DD'),
      fullDayName: date.format('dddd'),
      month: date.format('MMM'),
      year: date.format('YYYY')
    };
    this.days = [];

    if (this.firstWeekDaySunday === true) {
      firstWeekDay = date.set('date', 2).day();
    } else {
      firstWeekDay = date.set('date', 1).day();
    }

    if (firstWeekDay !== 1) {
      n -= firstWeekDay - 1;
    }

    for (let i = n; i <= lastDayOfMonth; i += 1) {
      if (i > 0) {
        this.days.push({ day: i, month: month + 1, year: year, enabled: true });
      } else {
        this.days.push({ day: null, month: null, year: null, enabled: false });
      }
    }
  }

  isSelected(date) {
    let selectedDate = moment(date.day + '.' + date.month + '.' + date.year, 'DD.MM.YYYY');
    return selectedDate.toDate().getTime() === this.cannonical;
  }

  private generateDayNames(): void {
    this.dayNames = [];
    let date = this.firstWeekDaySunday === true ? moment('2015-06-07') : moment('2015-06-01');
    for (let i = 0; i < 7; i += 1) {
      this.dayNames.push(date.format('ddd'));
      date.add('1', 'd');
    }
  }

  private initMouseEvents(): void {
    let body = document.getElementsByTagName('body')[0];

    body.addEventListener('click', (e) => {
      if (!this.isOpened || !e.target) return;
      if (this.el !== e.target && !this.el.contains(e.target)) {
        this.closeDatepicker();
      }
    }, false);
  }

  private setValue(value: any): void {
    let val = moment(value, this.modelFormat || 'YYYY-MM-DD');
    this.viewValue = val.format(this.viewFormat || 'Do MMMM YYYY');
    this.cd.viewToModelUpdate(val.format(this.modelFormat || 'YYYY-MM-DD'));
    this.cannonical = val.toDate().getTime();
  }

  private initValue(): void {
    setTimeout(() => {
      if (!this.initDate) {
        this.setValue(moment().format(this.modelFormat || 'YYYY-MM-DD'));
      } else {
        this.setValue(moment(this.initDate, this.modelFormat || 'YYYY-MM-DD'));
      }
    });
  }

  writeValue(value: string): void {
    if (!value) return;
    this.setValue(value);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: any) => {}): void {
    this.onTouched = fn;
  }

  private init(): void {
    this.isOpened = false;
    this.date = moment();
    this.firstWeekDaySunday = false;
    this.generateDayNames();
    this.generateCalendar(this.date);
    this.initMouseEvents();
  }
}
