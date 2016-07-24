import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CalendarService } from './calendar-service.component';
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
         *ngFor="let dayName of calendarService.calDaysLabels">
          {{ dayName }}
        </div>
      </div>

      <div class="calendar__week" 
      *ngFor="let week of calendarService.currentMonthDays, let weekIndex = index">
        
        <div class="calendar__days-wrap">
          <div class="calendar__day"
               *ngFor="let day of week.days, let dayIndex = index"
               (click)="calendarService.showFullInfo(day, weekIndex, dayIndex)">
            <div class="calendar__day-inner {{ day.className }}">
              <span class="calendar__day__date {{ day.isCurrentMonth }}">
                {{ day.date }}
              </span>
              <span class="calendar__day__job {{ job.size }}" *ngFor="let job of day.jobs">
                {{ job.movingDate }} | {{ job.moveFrom }} | {{ job.moveTo }} | {{ job.phone }}
              </span>
            </div>
          </div>
        </div>

        <div class="calendar__day-full-info {{ week.className }}">
          <div *ngIf="week.selectedDay">
            <div class="calendar__day__date-label">{{ week.selectedDay.fullDate }}</div>
            <div *ngFor="let job of week.selectedDay.jobs"
                  class="calendar__day-full-info__job">
              {{ job.movingDate }} | {{ job.moveFrom }} | {{ job.moveTo }} 
              {{ job.movingSize }} | {{ job.phone }} | {{ job.name }} | {{ job.mail }} 
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
