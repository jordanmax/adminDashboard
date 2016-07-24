import { Component, Inject, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { AddJobModalService } from './add-job-modal.service';
import {NgClass} from '@angular/common';
import { NgForm } from '@angular/forms';
import { Job } from './job';

@Component({
  selector: 'add-job-modal',
  templateUrl: 'src/app/calendar/add-job-modal.component.html',
  directives: [NgClass]
})
export class AddJobModalComponent {
  isOpen = false;
  isClosed = false;
  currentDate = '';
  subscription: Subscription;
  model: Job;

  constructor(@Inject(AddJobModalService) private addJobModalService: AddJobModalService) {
    this.subscription = addJobModalService.modelOpened$.subscribe(
      date => {
        this.isOpen = true;
        this.isClosed = false;
        this.model.movingDate = date
      });
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  // @Input() addJobModal;
  // @Output() addJob = new EventEmitter<Object>();
  //
  submitted = false;

  model = new Job('', 'Long Beach, CA, United States', 'Portland, OR, United States', '2 Bedrooms', '925-285-0446', 'Simba', 'max@mail.com');

  closeModal() {
    this.isOpen = false;
    this.isClosed = true;
  }

  onSubmit() {
    this.model = new Job('', '', '', '', '', '', '');
  }


  get diagnostic() { return JSON.stringify(this.model); }
}

