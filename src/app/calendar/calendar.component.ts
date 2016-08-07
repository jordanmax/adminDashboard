import { Component, Inject } from '@angular/core';
import { DaysList } from './days-list.component';
import { CalendarHeader } from './calendar-header.component';
import { AddJobModalComponent } from './add-job-modal.component';
import { AddJobModalService } from './add-job-modal.service';

import { CalendarService } from './calendar-service.ts';
import { Job } from './job';

@Component({
  selector: 'calendar',
  template: `
    <h4 class="page-header">Calendar Page</h4>
    <div class="calendar card-shadow">
      <calendar-header></calendar-header>
      <days-list></days-list>
    </div>

    <add-job-modal (addJob)="addJob($event)"></add-job-modal>
    `,
  directives: [AddJobModalComponent, DaysList, CalendarHeader],
  providers: [CalendarService, AddJobModalService]
})

export class CalendarComponent {
  constructor(
    @Inject(CalendarService) public calendarService: CalendarService,
    @Inject(AddJobModalService) public addJobModalService: AddJobModalService
  ) { }

  addJob(job: Object) {
    this.calendarService.addJob(job);
  }

}
