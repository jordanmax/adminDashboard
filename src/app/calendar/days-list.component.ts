import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CalendarService } from './calendar-service.ts';
import { AddJobModalService } from './add-job-modal.service';

@Component({
  selector: 'days-list',
  template: `<ul class="demo-list-item mdl-list calendar__legend-list">
        <li class="mdl-list__item">
          <span class="mdl-list__item-primary-content">
            <span class="calendar__legend green"></span>
            Small job
          </span>
        </li>
        <li class="mdl-list__item">
          <span class="mdl-list__item-primary-content">
            <span class="calendar__legend orange"></span>
            Medium job
          </span>
        </li>
        <li class="mdl-list__item">
          <span class="mdl-list__item-primary-content">
            <span class="calendar__legend red"></span>
            Large job
          </span>
        </li>
      </ul>

      <div class="calendar__labels">
        <div class="calendar__labels__item"
         *ngFor="let dayName of calendarService.dayNames">
          {{ dayName }}
        </div>
      </div>
      
      <div class="calendar__week" 
           *ngFor="let week of calendarService.fullMonth, let weekIndex = index">
        
        <div class="calendar__days-wrap">
        
          <div class="calendar__day"
               *ngFor="let d of week.days, let dayIndex = index"
               (click)="calendarService.showFullInfo(d, weekIndex, dayIndex)">
            <div class="calendar__day-inner" [ngClass]="{ active: d.isActive }">
              <span class="calendar__day__date">
                {{ d.day }}
              </span>
              <span class="calendar__day__job {{job.movingSizeType}}" *ngFor="let job of d.jobs">
                {{ job.phone }} | {{ job.moveFrom }} | {{ job.moveTo }}
              </span>
            </div>
          </div>
          
        </div>

        <div class="calendar__day-full-info" [ngClass]="{ open: week.isOpen }">
          <div *ngIf="week.selectedDay">
            <button class="mdl-button mdl-js-button mdl-button--icon calendar__day-full-info__close-btn"
                    (click)="calendarService.closeFullInfo()"
            >
              <i class="material-icons">close</i>
            </button>
            <div class="calendar__day__date-label">{{ week.selectedDay.fullDate }}</div>
            
            <div *ngFor="let jobsByTime of week.selectedDay.jobsByTime" class="calendar__day-full-info__job-wrapper">
              
              <div class="calendar__day-full-info__time">
                {{jobsByTime.time}}
              </div>
              
              <div *ngFor="let job of jobsByTime.jobs" class="calendar__day-full-info__job {{job.movingSizeType}}">
              
                <div class="calendar__day-full-info__job__item">
                  <i class="material-icons">&#xE878;</i>{{ job.movingDate }}
                </div>
                <div class="calendar__day-full-info__job__item">
                  <i class="material-icons">&#xE8B4;</i>{{ job.moveFrom }}
                </div>
                <div class="calendar__day-full-info__job__item">
                  <i class="material-icons">&#xE8B4;</i>{{ job.moveTo }}
                </div>
                <div class="calendar__day-full-info__job__item">
                  <i class="material-icons">&#xE84F;</i>{{ job.movingSizeType }}
                </div>
                <div class="calendar__day-full-info__job__item">
                  <i class="material-icons">&#xE551;</i>{{ job.phone }}
                </div>
                <div class="calendar__day-full-info__job__item">
                  <i class="material-icons">&#xE554;</i>{{ job.mail }}
                </div>
                
              </div>
              
            </div>
            
            <div *ngIf="!week.selectedDay.jobs.length" class="calendar__day__no-job">
                No jobs booked for today 
            </div>
            <button class="small-space mdl-button mdl-button--raised mdl-button--colored"
                    (click)="openModal(week.selectedDay.fullDate)">
                  Add job
            </button>
          </div>
        </div>
        
      </div>
  `
})

export class DaysList {
  constructor(
    @Inject(CalendarService) public calendarService: CalendarService,
    @Inject(AddJobModalService) public addJobModalService: AddJobModalService
  ) { }

  openModal(date) {
    this.addJobModalService.openModal(date);
  }

}
