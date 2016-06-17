import {Component} from '@angular/core';

@Component({
  selector: 'leads',
  template: `
    <div *ngFor="let group of inbox, let groupIndex = index">
      <h4>{{ group.dayGroup.data }}</h4>
      <div *ngFor="let lead of group.dayGroup.leads, let i = index" class="md-lead mdl-shadow--2dp {{ lead.type == 'new' ? 'md-lead--new' : '' }}">
        <!-- Right aligned menu below button -->
        <div class="md-lead__btns">
          <button class="mdl-button mdl-button--icon mdl-button--accent" (click)="markAsRead(lead)">
            <i class="material-icons">check</i>
          </button>
          <button class="mdl-button mdl-button--icon mdl-button--colored"(click)="showMap(lead)">
            <i class="material-icons">place</i>
          </button>
          <button class="mdl-button mdl-button--icon" (click)="moveToTrash(group.dayGroup.leads)">
            <i class="material-icons">delete_forever</i>
          </button>
        </div>
        
        <div class="md-lead__main">
          <div class="md-lead__title">
            <span class="md-lead__label">
              {{ lead.moveFrom }}
            </span>
            <i class="material-icons">trending_flat</i>
            <span class="md-lead__label">
              {{ lead.moveTo }}
            </span>
          </div>
          <div class="md-lead__body">
            <span class="md-lead__label">Moving dates: 05/05/2016</span>
            <span class="md-lead__label">Moving size: Over 3</span>
            <span class="md-lead__label">Phone: 9095454758</span>
            <span class="md-lead__label">E-mail: tgfireup@gmail.com</span>
            <span class="md-lead__label">Distance: {{ lead.distance }}</span>
          </div>
        </div>
  
        <div class="md-lead__map-wrapper {{ lead.collapsed ? 'md-lead__map-wrapper--collapsed' : '' }}">
          <div id="map-{{ i }}" class="md-lead__map"></div>
        </div>
      </div>
    </div>
    `
})

export class LeadsComponent {

  inbox = [
    {
      dayGroup: {
        data: 'Today',
        leads: [
          {
            type: 'new',
            moveFrom: 'LA, CA, United States',
            moveTo: 'irvine, CA, United States',
            date: {
              day: 'May 23',
              time: '10:30 AM'
            },
            movingDate: '05/05/2016',
            movingSize: 'OVER 3 PHONE',
            tel: '9095454758',
            email: 'TGFIREUP@GMAIL.COM',
            collapsed: true
          },
          {
            type: 'new',
            moveFrom: 'ntario, CA, United States',
            moveTo: 'irvine, CA, United States',
            date: {
              day: 'June 3',
              time: '10:30 AM'
            },
            movingDate: '05/05/2016',
            movingSize: 'OVER 3 PHONE',
            tel: '9095454758',
            email: 'TGFIREUP@GMAIL.COM',
            collapsed: true
          },
          {
            type: 'new',
            moveFrom: 'orange, CA, United States',
            moveTo: 'long beach, CA, United States',
            date: {
              day: 'Aug 11',
              time: '20:30 AM'
            },
            movingDate: '05/05/2016',
            movingSize: 'OVER 3 PHONE',
            tel: '9095454758',
            email: 'TGFIREUP@GMAIL.COM',
            collapsed: true
          },
          {
            type: 'new',
            moveFrom: 'LA, CA, United States',
            moveTo: 'irvine, CA, United States',
            date: {
              day: 'May 23',
              time: '10:30 AM'
            },
            movingDate: '05/05/2016',
            movingSize: 'OVER 3 PHONE',
            tel: '9095454758',
            email: 'TGFIREUP@GMAIL.COM',
            collapsed: true
          },
          {
            type: 'new',
            moveFrom: 'ntario, CA, United States',
            moveTo: 'irvine, CA, United States',
            date: {
              day: 'June 3',
              time: '10:30 AM'
            },
            movingDate: '05/05/2016',
            movingSize: 'OVER 3 PHONE',
            tel: '9095454758',
            email: 'TGFIREUP@GMAIL.COM',
            collapsed: true
          },
          {
            moveFrom: 'orange, CA, United States',
            moveTo: 'long beach, CA, United States',
            date: {
              day: 'Aug 11',
              time: '20:30 AM'
            },
            movingDate: '05/05/2016',
            movingSize: 'OVER 3 PHONE',
            tel: '9095454758',
            email: 'TGFIREUP@GMAIL.COM',
            collapsed: true
          }
        ]
      }
    },
    {
      dayGroup: {
        data: 'Yestarday',
        leads: [
          {
            type: 'new',
            moveFrom: 'LA, CA, United States',
            moveTo: 'irvine, CA, United States',
            date: {
              day: 'May 23',
              time: '10:30 AM'
            },
            movingDate: '05/05/2016',
            movingSize: 'OVER 3 PHONE',
            tel: '9095454758',
            email: 'TGFIREUP@GMAIL.COM',
            collapsed: true
          },
          {
            type: 'new',
            moveFrom: 'ntario, CA, United States',
            moveTo: 'irvine, CA, United States',
            date: {
              day: 'June 3',
              time: '10:30 AM'
            },
            movingDate: '05/05/2016',
            movingSize: 'OVER 3 PHONE',
            tel: '9095454758',
            email: 'TGFIREUP@GMAIL.COM',
            collapsed: true
          },
          {
            moveFrom: 'orange, CA, United States',
            moveTo: 'long beach, CA, United States',
            date: {
              day: 'Aug 11',
              time: '20:30 AM'
            },
            movingDate: '05/05/2016',
            movingSize: 'OVER 3 PHONE',
            tel: '9095454758',
            email: 'TGFIREUP@GMAIL.COM',
            collapsed: true
          }
        ]
      }
    },
    {
      dayGroup: {
        data: '06.16.2016',
        leads: [
          {
            type: 'new',
            moveFrom: 'LA, CA, United States',
            moveTo: 'irvine, CA, United States',
            date: {
              day: 'May 23',
              time: '10:30 AM'
            },
            movingDate: '05/05/2016',
            movingSize: 'OVER 3 PHONE',
            tel: '9095454758',
            email: 'TGFIREUP@GMAIL.COM',
            collapsed: true
          },
          {
            type: 'new',
            moveFrom: 'ntario, CA, United States',
            moveTo: 'irvine, CA, United States',
            date: {
              day: 'June 3',
              time: '10:30 AM'
            },
            movingDate: '05/05/2016',
            movingSize: 'OVER 3 PHONE',
            tel: '9095454758',
            email: 'TGFIREUP@GMAIL.COM',
            collapsed: true
          },
          {
            moveFrom: 'orange, CA, United States',
            moveTo: 'long beach, CA, United States',
            date: {
              day: 'Aug 11',
              time: '20:30 AM'
            },
            movingDate: '05/05/2016',
            movingSize: 'OVER 3 PHONE',
            tel: '9095454758',
            email: 'TGFIREUP@GMAIL.COM',
            collapsed: true
          }
        ]
      }
    }
  ];

  moveToTrash(lead) {
    console.log(lead);
    if (confirm("Are you sure you want to delete " + lead.date + "?")) {
      var index = this.leads.indexOf(lead);
      this.leads.splice(index, 1);
    }
  }

  markAsRead(lead) {
    var index = this.leads.indexOf(lead);
    this.leads[index].type = 'read';
  }

  showMap(lead) {
    var index = this.leads.indexOf(lead);
    this.initMap(lead, index);
    this.leads[index].type = 'read';
    this.leads[index].collapsed = !this.leads[index].collapsed
  }

  initMap(lead, index) {
    var that = this;
    var map = new google.maps.Map(document.getElementById('map-' + index), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();

    initialize();
    calcRoute();


    function initialize() {

      directionsDisplay = new google.maps.DirectionsRenderer();

      var mapOptions = {
        zoom: 7,
        scrollwheel: false,
        center: new google.maps.LatLng(40.7903, -73.9597)
      };

      var map = new google.maps.Map(document.getElementById('map-' + index),
        mapOptions);

      directionsDisplay.setMap(map);
    }

    function calcRoute() {
      var start = lead.moveFrom;
      var end = lead.moveTo;

      // sets a object literal with an origin of start, destination of end and the travel mode
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
      };

      // this gives the directionsService var a route of the request object literal, and a callback method that executes upon the receipt of the response from directionsService.  Learn more about callbacks here, http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          that.leads[index].distance = response.routes[0].legs[0].distance.text;
        }
      });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    google.maps.event.addDomListener(window, 'load', calcRoute);
  }

}
