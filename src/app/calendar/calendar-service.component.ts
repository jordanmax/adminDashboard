import { Injectable } from '@angular/core';

@Injectable()
export class CalendarService {
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

  jobs = ['1'];

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

  sortByWeeks() {

  }

  addJob(job) {
    let weekIndex = this.selectedDayWeekIndex;
    let dayIndex = this.selectedDayIndex;
    this.currentMonthDays[weekIndex].days[dayIndex].jobs.push(job);
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

  }
}
