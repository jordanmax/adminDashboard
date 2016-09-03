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
      movingDate:"10.08.2016",
      movingTimeStart:"02:00",
      movingTimeEnd:"03:00",
      moveFrom:"Irving, TX, USA",
      moveTo:"Santa Monica, CA, USA",
      movingSize:"2 Bed room",
      movingSizeType:"medium",
      phone:"123213213312",
      name:"aaasdsa",
      mail:"das@das.das",
      distance:"1,445 mi",
      note: 'Lorem ipsum dolor sit amet, integre vivendum mnesarchum vis an. Quem illum'
    },
    {
      movingDate:"10.08.2016",
      movingTimeStart:"02:00",
      movingTimeEnd:"15:30",
      moveFrom:"Irving, TX, USA",
      moveTo:"Santa Monica, CA, USA",
      movingSize:"2 Bed room",
      movingSizeType:"medium",
      phone:"123213213312",
      name:"aaasdsa",
      mail:"das@das.das",
      distance:"1,445 mi",
      note: 'Lorem ipsum dolor sit amet, integre vivendum mnesarchum vis an. Quem illum'
    },
    {
      movingDate:"10.08.2016",
      movingTimeStart:"17:00",
      movingTimeEnd:"18:30",
      moveFrom:"Irving, TX, USA",
      moveTo:"Santa Monica, CA, USA",
      movingSize:"2 Bed room",
      movingSizeType:"medium",
      phone:"123213213312",
      name:"aaasdsa",
      mail:"das@das.das",
      distance:"1,445 mi",
      note: 'Lorem ipsum dolor sit amet, integre vivendum mnesarchum vis an. Quem illum'
    }
  ];
  gridHours = [
    '8am','9am','10am','11am','12pm',
    '1pm','2pm','3pm','4pm','5pm','6pm',
    '7pm','8pm','9pm','10pm','11pm','12pm'
  ];
  selectedDayWeekIndex = null;

  selectedDayIndex = null;

  constructor() {
    this.init();
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
      let fullDate = '' + i + '.' +  date.format('MM') + '.' + date.format('YYYY');
      if (i < 10) fullDate = '0' + fullDate;

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
          }
        });

        dayItem.jobs.forEach(job => {
          job.duration = this.getJobDuration(job);
          job.offset = this.setJobOffset(job);
        });
        console.log(dayItem.jobs);
        if(dayItem.jobs.length) {
          dayItem.jobsByTime = this.groupJobsByTime(this.sortJobsByDuration(dayItem.jobs));
        }
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

  setJobOffset(job) {
    let time = job.movingTimeStart.split(':');
    let hoursOffset = time[0];
    let minutesOffset= time[1];
    if(hoursOffset.charAt(0) === '0') {
      hoursOffset = hoursOffset.slice(hoursOffset.length - 1)
    }
    if(minutesOffset.charAt(0) === '0') {
      minutesOffset = minutesOffset.slice(minutesOffset.length - 1)
    }

    return {
      top: hoursOffset + minutesOffset,
      height: -parseInt((job.duration/(1000*60*60))%24)
    }
  }

  parseTimeToHeight(time) {
    let s = 31 * 3 + 'px';
    return 'height:' + s
  }

  sortJobsByDuration(jobs) {
    return jobs.sort((jobA, jobB) => (
      jobA.duration > jobB.duration
    ))
  }

  getJobDuration(job) {
    let start  = job.movingDate + ' ' + job.movingTimeStart; //; 10.08.2016 02:00
    let end = job.movingDate + ' ' + job.movingTimeEnd; //; 10.08.2016 03:00
    let ms = moment(start,"DD.MM.YYYY HH:mm").diff(moment(end,"DD.MM.YYYY HH:mm"));

    return moment.duration(ms);
  }

  groupJobsByTime(jobs) {
    let jobsGroupByTime = {};
    let result = [];

    jobs.forEach((job) => {
      let groupNotFound = true;
      if(!jobsGroupByTime.hasOwnProperty('0')) {
        jobsGroupByTime['0'] = [];
        jobsGroupByTime['0'].push(job);
      } else {
        for (let prop in jobsGroupByTime) {
          let _prop = prop;

          for(let i = 0; i < jobsGroupByTime[prop].length; i++) {
            if (
              (job.movingTimeStart >= jobsGroupByTime[prop][i].movingTimeStart
              && job.movingTimeStart <= jobsGroupByTime[prop][i].movingTimeEnd)
              ||
              (job.movingTimeEnd >= jobsGroupByTime[prop][i].movingTimeStart
              && job.movingTimeEnd <= jobsGroupByTime[prop][i].movingTimeEnd)
            ) {
              jobsGroupByTime[_prop].push(job);
              groupNotFound = false;
              break;
            }
          }
        }
        if (groupNotFound) {
          jobsGroupByTime[Object.keys(jobsGroupByTime).length] = [];
          jobsGroupByTime[Object.keys(jobsGroupByTime).length - 1].push(job)
        }
      }
    });

    for (let prop in jobsGroupByTime) {
      result.push(jobsGroupByTime[prop]);
    }
    return result
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

  }

  closeFullInfo() {
    this.fullMonth[this.selectedDayWeekIndex].isOpen = false;
    this.fullMonth[this.selectedDayWeekIndex].selectedDay = null;
    this.fullMonth[this.selectedDayWeekIndex].days[this.selectedDayIndex].isActive = false;
  }

  private init(): void {
    this.date = moment();
    this.firstWeekDaySunday = false;
    this.generateDayNames();
    this.generateCalendar(this.date);
  }
}
