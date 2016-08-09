import { Injectable } from '@angular/core';
import * as moment_ from 'moment';
import { Job } from './job';

const moment: moment.MomentStatic = (<any>moment_)['default'] || moment_;

@Injectable()
export class CalendarService {
  public isOpened: boolean;
  public dateValue: string;
  public dateLabels: Object;
  public viewValue: string;
  public days: Array<Object>;
  public fullMonth = [];
  public dayNames: Array<string>;
  private el: any;
  private date: any;
  private cannonical: number;
  public firstWeekDaySunday: boolean;
  public jobs = [
    {
    movingDate:"8.08.2016",
    movingTime:"02:12",
    moveFrom:"Irving, TX, USA",
    moveTo:"Santa Monica, CA, USA",
    movingSize:"",
    movingSizeType:"medium",
    phone:"123213213312",
    name:"aaasdsa",
    mail:"das@das.das",
    distance:"1,445 mi"
    },
    {
      movingDate:"8.08.2016",
      movingTime:"12:12",
      moveFrom:"Irving, TX, USA",
      moveTo:"Santa Monica, CA, USA",
      movingSize:"",
      movingSizeType:"small",
      phone:"123213213312",
      name:"aaasdsa",
      mail:"das@das.das",
      distance:"1,445 mi"
    },
    {
      movingDate:"8.08.2016",
      movingTime:"3:12",
      moveFrom:"Irving, TX, USA",
      moveTo:"Santa Monica, CA, USA",
      movingSize:"",
      movingSizeType:"small",
      phone:"123213213312",
      name:"aaasdsa",
      mail:"das@das.das",
      distance:"1,445 mi"
    },
    {
      movingDate:"8.08.2016",
      movingTime:"3:12",
      moveFrom:"Irving, TX, USA",
      moveTo:"Santa Monica, CA, USA",
      movingSize:"",
      movingSizeType:"small",
      phone:"123213213312",
      name:"aaasdsa",
      mail:"das@das.das",
      distance:"1,445 mi"
    },
    {
      movingDate:"8.08.2016",
      movingTime:"3:12",
      moveFrom:"Irving, TX, USA",
      moveTo:"Santa Monica, CA, USA",
      movingSize:"",
      movingSizeType:"small",
      phone:"123213213312",
      name:"aaasdsa",
      mail:"das@das.das",
      distance:"1,445 mi"
    },
    {
      movingDate:"8.08.2016",
      movingTime:"4:00",
      moveFrom:"Irving, TX, USA",
      moveTo:"Santa Monica, CA, USA",
      movingSize:"",
      movingSizeType:"large",
      phone:"123213213312",
      name:"aaasdsa",
      mail:"das@das.das",
      distance:"1,445 mi"
    }
  ];

  constructor() {
    this.init();
  }

  selectedDayWeekIndex = null;

  selectedDayIndex = null;

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
      let fullDate = '' + i + '.' +  date.format('MM') + '.' + date.format('YYYY');
      let jobsByTimeObj = {};
      let jobsByTime = [];

      if (i > 0) {
        let dayItem = {
          day: i,
          month: month + 1,
          fullDate: fullDate,
          year: year,
          isActive: false,
          jobs: [],
          jobsByTime: []
        };

        this.jobs.forEach(job => {
          if(job.movingDate == fullDate) {
            dayItem.jobs.push(job);
            if(jobsByTimeObj[job.movingTime]) {
              jobsByTimeObj[job.movingTime].push(job)
            } else {
              jobsByTimeObj[job.movingTime] = [];
              jobsByTimeObj[job.movingTime].push(job)
            }
          }
        });

        for (var key in jobsByTimeObj) {
          jobsByTime.push({
            time: key,
            jobs: jobsByTimeObj[key]
          })
        }

        dayItem.jobsByTime = jobsByTime;

        this.days.push(dayItem);

      } else {
        this.days.push({day: null});
      }
    }

    for(let i = 0, j = 1; i < this.days.length; i++, j++) {
      week.push(this.days[i]);
      if(j === 7) {
        this.fullMonth.push({
            days: week,
            isOpen: false,
            selectedDay: null
          }
        );
        week = [];
        j = 0;
      }
    }

    this.fullMonth.push({
      days: week,
      isOpen: false,
      selectedDay: null
    });
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
    this.fullMonth[this.selectedDayWeekIndex].days[this.selectedDayIndex].jobs.push(job);

    let jobsByTime = this.fullMonth[this.selectedDayWeekIndex].days[this.selectedDayIndex].jobsByTime;
    let isJobAdded = false;

    jobsByTime.forEach(time => {
      if(time.time === job.movingTime) {
        time.jobs.push(job);
        isJobAdded = true
      }
    });

    if(!isJobAdded) {
      jobsByTime.push({
        time: job.movingTime,
        jobs: [job]
      })
    }

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
    if(!day.day) {
      return false;
    }

    if(this.selectedDayWeekIndex != null && this.selectedDayIndex != null) {
      this.fullMonth[this.selectedDayWeekIndex].isOpen = false;
      this.fullMonth[this.selectedDayWeekIndex].days[this.selectedDayIndex].isActive = false;
      this.fullMonth[this.selectedDayWeekIndex].selectedDay = null;
    }

    this.fullMonth[weekIndex].isOpen = true;
    this.fullMonth[weekIndex].days[dayIndex].isActive = true;
    this.fullMonth[weekIndex].selectedDay = day;

    this.selectedDayWeekIndex = weekIndex;
    this.selectedDayIndex = dayIndex;

    console.log(day.jobsByTime);
  }

  private init(): void {
    this.date = moment();
    this.firstWeekDaySunday = false;
    this.generateDayNames();
    this.generateCalendar(this.date);
  }
}
