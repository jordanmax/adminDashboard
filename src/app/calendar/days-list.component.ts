import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CalendarService } from './calendar-service.ts';
import { AddJobModalService } from './add-job-modal.service';

@Component({
  selector: 'days-list',
  templateUrl: 'src/app/calendar/day-list.component.html'
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
