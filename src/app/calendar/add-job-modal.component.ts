import { Component, Inject, OnDestroy, Output, EventEmitter, ViewChild, NgZone } from '@angular/core';
import { GoogleplaceDirective } from '../directives/googleplace.directive';
import {DatePicker} from '../directives/datepicker';

import {DatePicker} from 'ng2-datepicker';
import { Subscription }   from 'rxjs/Subscription';

import { AddJobModalService } from './add-job-modal.service';
import {NgClass} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/common';
import { NgForm } from '@angular/forms';
import { Job } from './job';

@Component({
  selector: 'add-job-modal',
  templateUrl: 'src/app/calendar/add-job-modal.component.html',
  directives: [NgClass, GoogleplaceDirective, FORM_DIRECTIVES, DatePicker]
})
export class AddJobModalComponent {
  isOpen = false;
  isClosed = false;
  haveDistance = false;
  submitted = false;
  currentDate = '';
  initDate= '';
  subscription: Subscription;
  model: Job;
  movingSizeOptions = [
    'Studio',
    '1 Bedroom',
    '2 Bedrooms',
    '3 Bedrooms',
    'Over 3',
    'Other'
  ];
  selectedMovingSizeOptions: string;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  model = new Job();

  @Output() addJob = new EventEmitter<Object>();

  constructor(@Inject(AddJobModalService) private addJobModalService: AddJobModalService ,@Inject(NgZone) public _ngZone: NgZone) {
    this.subscription = addJobModalService.modelOpened$.subscribe(
      date => {
        this.isOpen = true;
        this.isClosed = false;
        this.initDate = date;
      });
  }



  getAddress(place:Object, field) {
    this.model[field] = place['formatted_address'];
    this.calcRoute();
  }

  setMovingSize(value) {
    this.selectedMovingSizeOptions = value;
    this.model.movingSize = value
  }

  showMovingSizeInput() {
    return this.selectedMovingSizeOptions === 'Other'
  }

  closeModal() {
    this.isOpen = false;
    this.isClosed = true;
  }

  onSubmit() {
    this.addJob.emit(this.model);
    this.closeModal();
    this.model = new Job();
  }

  initMap() {
    let mapOptions = {
      zoom: 7,
      scrollwheel: false,
      center: new google.maps.LatLng(40.7903, -73.9597)
    };
    let map = new google.maps.Map(document.getElementById('modalMap'), mapOptions);

    this.directionsDisplay.setMap(map);
  }

  renderRoutes(data) {
    this.directionsDisplay.setDirections(data);
  }

  ngOnInit() {
    this.initMap()
  }

  calcRoute() {
    let start = this.model.moveFrom;
    let end = this.model.moveTo;
    let directionsService = new google.maps.DirectionsService();

    if(!start || !end) {
      return
    }
    // sets a object literal with an origin of start, destination of end and the travel mode
    let request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    };

    // this gives the directionsService var a route of the request object literal, and a callback method that executes upon the receipt of the response from directionsService.  Learn more about callbacks here, http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/
    this._ngZone.runOutsideAngular(() => {
      directionsService.route(request, (response, status) => {
        if (status == google.maps.DirectionsStatus.OK) {

          this.renderRoutes(response);
          this.model.distance = response.routes[0].legs[0].distance.text;
          this._ngZone.run(() => { });

        } else {

          this.model.distance = 'Error';
          this._ngZone.run(() => { });

        }
      })
    });
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}

