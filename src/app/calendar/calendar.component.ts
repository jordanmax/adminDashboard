import { Component, Inject } from '@angular/core';
import { DaysList } from './days-list.component';
import { CalendarHeader } from './calendar-header.component';
import { AddJobModalComponent } from './add-job-modal.component';
import { AddJobModalService } from './add-job-modal.service';

import { MissionControlComponent } from './MissionControlComponent';

import { CalendarService } from './calendar-service.component';
import { Job } from './job';

@Component({
  selector: 'calendar',
  template: `
    <h4 class="page-header">Calendar Page</h4>
    <div class="calendar card-shadow">
      <mission-control></mission-control>
      <calendar-header></calendar-header>
      <days-list></days-list>
    </div>

    <add-job-modal></add-job-modal>
    `,
  directives: [AddJobModalComponent, DaysList, CalendarHeader, MissionControlComponent],
  providers: [CalendarService, AddJobModalService]
})

export class CalendarComponent {
  constructor(
    @Inject(CalendarService) public calendarService: CalendarService,
    @Inject(AddJobModalService) public addJobModalService: AddJobModalService
  ) { }

  addJobModal = {
    isOpen: '',
    currentDay: null
  };

  openModal() {
    console.log('opened')
  }

  openAddJobModal(day, weekIndex) {
    this.addJobModal.currentDay = {
      dayIndex: day.dayIndex,
      weekIndex: weekIndex
    };
  }

  addJob(job: Object) {
    let dayIndex = this.addJobModal.currentDay.dayIndex;
    let weekIndex = this.addJobModal.currentDay.weekIndex;
    //this.currentMonthDays[weekIndex].days[dayIndex].jobs.push(job);
  }

}
