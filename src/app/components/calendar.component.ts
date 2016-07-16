import {Component} from '@angular/core';

@Component({
  selector: 'calendar',
  template: `
    <h4>Calendar Page</h4>
    <div class="calendar mdl-shadow--2dp">
      <div class="calendar__header">
        <div class="mdl-cell mdl-cell--6-col">
          <button class="mdl-button mdl-button--icon">
             <i class="material-icons" (click)="showPrevMonth()">keyboard_arrow_left</i>
          </button>
       
          <span class="calendar__header__title">
            {{ calMonthsLabels[month] }}
          </span>

          <button class="mdl-button mdl-button--icon">
              <i class="material-icons" (click)="showNextMonth()">keyboard_arrow_right</i>
          </button>
        </div>

        <div class="mdl-cell mdl-cell--6-col text-right">
          <button class="mdl-button">
            День
          </button>
          <button class="mdl-button">
            Неделя
          </button>
          <button class="mdl-button mdl-button--raised mdl-button--colored">
            Месяц
          </button>
          <button class="mdl-button">
            4 дня
          </button>
        </div>
      </div>

      <ul class="demo-list-item mdl-list calendar__legend-list">
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
        <div class="calendar__labels__item" *ngFor="let dayName of calDaysLabels">
          {{ dayName }}
        </div>
      </div>

      <div class="calendar__week" *ngFor="let week of currentMonthDays, let weekIndex = index">
        
        <div class="calendar__days-wrap">
          <div class="calendar__day" *ngFor="let day of week.days, let dayIndex = index" (click)="showFullInfo(day, weekIndex, dayIndex)">
            <div class="calendar__day-inner {{ day.className }}">
              <span class="calendar__day__date {{ day.isCurrentMonth }}">
                {{ day.date }}
              </span>
              <span class="calendar__day__job {{ job.size }}" *ngFor="let job of day.jobs">
                {{ job.date }} | {{ job.size }}
              </span>
            </div>
          </div>
        </div>

        <div class="calendar__day-full-info {{ week.className }}">
          <div *ngIf="week.selectedDay">
            <div class="calendar__day__date-label">{{ week.selectedDay.fullDate }}</div>
            <div *ngFor="let job of week.selectedDay.jobs"
                  class="calendar__day-full-info__job">
              {{ job.date }} | {{ job.size }} | {{ job.title }} 
            </div>
            <div *ngIf="!week.selectedDay.jobs.length" class="calendar__day__no-job">
                No jobs booked for today 
                <button class="mdl-button mdl-button--raised mdl-button--colored">
                  Add job
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>`
})

export class CalendarComponent {
  jobs = [
    {
      id: 1,
      size: 'small',
      date: '10-6-2016',
      title: 'Jobs for Mike in Los Santos'
    },
    {
      id: 2,
      size: 'large',
      date: '10-6-2016',
      title: 'Move tigers to Snata Monica'
    },
    {
      id: 11,
      size: 'medium',
      date: '10-6-2016',
      title: 'Jobs for Mike in Los Santos'
    },
    {
      id: 21,
      size: 'large',
      date: '10-6-2016',
      title: 'Move tigers to Snata Monica'
    },
    {
      id: 3,
      size: 'large',
      date: '9-6-2016',
      title: 'Move Refrigirator to Irvine'
    },
    {
      id: 1,
      size: 'small',
      date: '5-6-2016',
      title: 'Jobs for Mike in Los Santos'
    },
    {
      id: 2,
      size: 'large',
      date: '7-6-2016',
      title: 'Move tigers to Snata Monica'
    },
    {
      id: 11,
      size: 'medium',
      date: '7-6-2016',
      title: 'Jobs for Mike in Los Santos'
    },
    {
      id: 21,
      size: 'large',
      date: '7-6-2016',
      title: 'Move tigers to Snata Monica'
    },
    {
      id: 3,
      size: 'large',
      date: '4-6-2016',
      title: 'Move Refrigirator to Irvine'
    },
        {
      id: 1,
      size: 'small',
      date: '13-6-2016',
      title: 'Jobs for Mike in Los Santos'
    },
    {
      id: 2,
      size: 'large',
      date: '1-7-2016',
      title: 'Move tigers to Snata Monica'
    },
    {
      id: 11,
      size: 'medium',
      date: '10-6-2016',
      title: 'Jobs for Mike in Los Santos'
    },
    {
      id: 21,
      size: 'large',
      date: '22-8-2016',
      title: 'Move tigers to Snata Monica'
    },
    {
      id: 3,
      size: 'large',
      date: '22-6-2016',
      title: 'Move Refrigirator to Irvine'
    },
    {
      id: 1,
      size: 'small',
      date: '2-6-2016',
      title: 'Jobs for Mike in Los Santos'
    },
    {
      id: 2,
      size: 'large',
      date: '1-6-2016',
      title: 'Move tigers to Snata Monica'
    },
    {
      id: 11,
      size: 'medium',
      date: '1-5-2016',
      title: 'Jobs for Mike in Los Santos'
    },
    {
      id: 21,
      size: 'large',
      date: '7-7-2016',
      title: 'Move tigers to Snata Monica'
    },
    {
      id: 3,
      size: 'large',
      date: '25-6-2016',
      title: 'Move Refrigirator to Irvine'
    }
  ]
  calDaysLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  calMonthsLabels = ['January', 'February', 'March', 'April',
                   'May', 'June', 'July', 'August', 'September',
                   'October', 'November', 'December'];
  calDaysInMonth  = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  calCurrentDate = new Date();

  month = this.calCurrentDate.getMonth();

  year  = this.calCurrentDate.getFullYear();

  currentMonthDays = this.getDaysInMonth(this.month, this.year);

  selectedDayWeekIndex = null;

  selectedDayIndex = null;

  getDaysInMonth(month, year) {
     let date = new Date(year, month, 1);
     let days = [];
     let weeks = []

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
            miliseconds: date.getTime(),
            fullDate: date.toLocaleDateString(),
            isCurrentMonth: date.getMonth() === month ? 'current' : '',
            jobs: [],
            className: ''
          }
          this.jobs.forEach(job => {
            let jobDay = job.date.split('-');
            let jobDate = jobDay[0];
            let jobMonth = jobDay[1];
            if(jobDate == date.getDate() && jobMonth == date.getMonth()) {
              item.jobs[item.jobs.length] = job;
            }
          })

          days.push(item)
          date.setDate(date.getDate() + 1);
       }
       weeks.push({
          days: days.slice(0),
          selectedDay: null,
          className: 'closed'
       });
       days.length = 0;
     }
     console.log(weeks)
     return weeks;
  }

  sortByWeeks() {
    
  }

  showNextMonth() {
    this.currentMonthDays = this.getDaysInMonth(this.month + 1, this.year)
    this.month++;
  }

  showPrevMonth() {
    this.currentMonthDays = this.getDaysInMonth(this.month - 1, this.year)
    this.month--;
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

    console.log(day)
  }

}
