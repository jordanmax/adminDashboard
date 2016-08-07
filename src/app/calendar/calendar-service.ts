import { Injectable } from '@angular/core';
import * as moment_ from 'moment';

const moment: moment.MomentStatic = (<any>moment_)['default'] || moment_;

@Injectable()
export class CalendarService {
  public isOpened: boolean;
  public dateValue: string;
  public dateLabels: Object;
  public viewValue: string;
  public days: Array<Object>;
  public fullMonth: Array<Object> = [];
  public dayNames: Array<string>;
  private el: any;
  private date: any;
  private cannonical: number;
  public firstWeekDaySunday: boolean;

  constructor() {
    this.init();
  }

  calCurrentDate = new Date();

  month = this.calCurrentDate.getMonth();

  year  = this.calCurrentDate.getFullYear();

  currentMonthDays = this.getDaysInMonth(this.month, this.year);

  selectedDayWeekIndex = null;

  selectedDayIndex = null;

  jobs = [''];

  getDaysInMonth(month, year) {
    let date = new Date(year, month, 1);
    let days = [];
    let weeks = [];

    let dayIndex = date.getDay();

    let firstDate = dayIndex - 1;
    date.setDate(date.getDate() - firstDate);

    for(let i = 0; i < 6; i++) {
      for(let j = 0; j < 7; j++) {
        let jobDate = date.getDate();
        let day = date.getDay();
        let ms = date.getTime();
        let item = {
          date: jobDate,
          day: day,
          dayIndex: j,
          miliseconds: date.getTime(),
          fullDate: date.toLocaleDateString(),
          isCurrentMonth: date.getMonth() === month ? 'current' : '',
          jobs: [],
          className: ''
        };
        //console.log(this.calDaysInMonth)
        // this.jobs.forEach(job => {
        //   let jobDay = job.date.split('-');
        //   let jobDate = jobDay[0];
        //   let jobMonth = jobDay[1];
        //   if(jobDate == date.getDate() && jobMonth == date.getMonth()) {
        //     item.jobs[item.jobs.length] = job;
        //   }
        // });

        days.push(item);
        date.setDate(date.getDate() + 1);
      }
      weeks.push({
        days: days.slice(0),
        selectedDay: null,
        className: 'closed'
      });
      days.length = 0;
    }

    return weeks;
  }

  private generateCalendar(date): void {
    let lastDayOfMonth = date.endOf('month').date();
    let month = date.month();
    let year = date.year();
    let n = 1;
    let firstWeekDay = null;
    let week = [];

    this.dateValue = date.format('MMMM');
    this.days = [];
    this.fullMonth = [];

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
        this.days.push({day: i, month: month + 1, year: year, enabled: true});
      } else {
        this.days.push({day: null, month: null, year: null, enabled: false});
      }
    }

    for(let i = 0, j = 1; i < this.days.length; i++, j++) {
      week.push(this.days[i]);
      if(j === 7) {
        this.fullMonth.push(week);
        week = [];
        j = 0;
      }
    }
    this.fullMonth.push(week);
  }

  private generateDayNames(): void {
    this.dayNames = [];
    let date = this.firstWeekDaySunday === true ? moment('2015-06-07') : moment('2015-06-01');
    for (let i = 0; i < 7; i += 1) {
      this.dayNames.push(date.format('ddd'));
      date.add('1', 'd');
    }
  }

  addJob(job) {
    let weekIndex = this.selectedDayWeekIndex;
    let dayIndex = this.selectedDayIndex;
    this.currentMonthDays[weekIndex].days[dayIndex].jobs.push(job);
  }

  showNextMonth() {
    this.date.add(1, 'M');
    this.generateCalendar(this.date);
  }

  showPrevMonth() {
    this.date.subtract(1, 'M');
    this.generateCalendar(this.date);
  }

  showFullInfo(day, weekIndex, dayIndex) {
    if(this.selectedDayWeekIndex && this.selectedDayIndex) {
      this.currentMonthDays[this.selectedDayWeekIndex].selectedDay = null;
      this.currentMonthDays[this.selectedDayWeekIndex].className = 'closed';
      this.currentMonthDays[this.selectedDayWeekIndex]
        .days[this.selectedDayIndex].className = '';
    }

    this.currentMonthDays[weekIndex].days[dayIndex].className = 'active';
    this.currentMonthDays[weekIndex].selectedDay = day;
    this.currentMonthDays[weekIndex].className = 'active';
    this.selectedDayWeekIndex = weekIndex;
    this.selectedDayIndex = dayIndex;

  }

  private init(): void {
    this.date = moment();
    this.firstWeekDaySunday = false;
    this.generateDayNames();
    this.generateCalendar(this.date);
  }
}
