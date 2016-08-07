import { Component, Inject } from '@angular/core';
import { CalendarService } from './calendar-service.ts';

@Component({
  selector: 'calendar-header',
  template: `
      <div class="calendar__header">
        <div class="mdl-cell mdl-cell--6-col">
          <button class="mdl-button mdl-button--icon">
             <i class="material-icons" (click)="calendarService.showPrevMonth()">keyboard_arrow_left</i>
          </button>
       
          <span class="calendar__header__title">
            {{ calendarService.dateValue }}
          </span>

          <button class="mdl-button mdl-button--icon">
              <i class="material-icons" (click)="calendarService.showNextMonth()">keyboard_arrow_right</i>
          </button>
        </div>

        <div class="mdl-cell mdl-cell--6-col text-right">
          <button class="mdl-button">
            Day
          </button>
          <button class="mdl-button">
            Week
          </button>
          <button class="mdl-button mdl-button--raised mdl-button--colored">
            Month
          </button>
        </div>
      </div>`
})

export class CalendarHeader {
  constructor(@Inject(CalendarService) public calendarService: CalendarService) {
    console.log(calendarService)
  }

}
