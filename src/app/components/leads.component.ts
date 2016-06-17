import {Component} from '@angular/core';

@Component({
  selector: 'leads',
  template: `
    <div *ngFor="let group of inbox, let groupIndex = index">
      <h4>{{ group.dayGroup.data }}</h4>
      <div *ngFor="let lead of group.dayGroup.leads, let leadIndex = index" class="md-lead mdl-shadow--2dp {{ lead.type == 'new' ? 'md-lead--new' : '' }}">
        <div class="md-lead__main-wrap">
          <div class="md-lead__btns">
            <button *ngIf="lead.type == 'new'" class="mdl-button mdl-button--icon mdl-button--accent" (click)="markAsRead(groupIndex, leadIndex)">
              <i class="material-icons">check</i>
            </button>
            <button class="mdl-button mdl-button--icon" (click)="showEditor(groupIndex, leadIndex)">
              <i class="material-icons">&#xE158;</i>
            </button>
            <button class="mdl-button mdl-button--icon mdl-button--colored"(click)="showMap(groupIndex, leadIndex)">
              <i class="material-icons">place</i>
            </button>
            <button class="mdl-button mdl-button--icon" (click)="moveToTrash(groupIndex, leadIndex)">
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
          </div>
          <div class="md-lead__body">
            <span class="md-lead__label">Moving dates: 05/05/2016</span>
            <span class="md-lead__label">Moving size: Over 3</span>
            <span class="md-lead__label">Phone: 9095454758</span>
            <span class="md-lead__label">E-mail: tgfireup@gmail.com {{ lead.id}}</span>
            <span class="md-lead__label">Distance: {{ lead.distance }}</span>
          </div>
        </div>
  
        <div class="md-lead__map-wrapper {{ lead.collapsed ? 'md-lead__map-wrapper--collapsed' : '' }}">
          <div id="map-{{ lead.id }}" class="md-lead__map"></div>
        </div>

        <div class="md-lead__send-msg {{ lead.showEditor ? '' : 'md-lead__send-msg--collapsed' }}">
          <form action="#">
            <textarea class="mdl-textfield__input"
                      type="text"
                      rows="3"
                      id="area-{{ lead.id }}" >
            </textarea>
            <div class="mdl-textfield--align-right">
              <button class="mdl-button mdl-button--raised mdl-button--accent">
                Send
              </button>
            </div>
          </form>
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
            id: 1,
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
            id: 2,
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
            id: 3,
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
            id: 4,
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
            id: 5,
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
            id: 6,
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
            id: 7,
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
            id: 8,
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
            id: 9,
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
            id: 10,
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
            id: 11,
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
            id: 12,
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

  moveToTrash(groupIndex, leadIndex) {
    var allLeads = this.inbox[groupIndex].dayGroup.leads;
    var lead = allLeads[leadIndex];
    if (confirm("Are you sure you want to delete " + lead.date + "?")) {
      allLeads.splice(leadIndex, 1);
    }
  }

  markAsRead(groupIndex, leadIndex) {
    this.inbox[groupIndex].dayGroup.leads[leadIndex].type = 'read'
  }

  showEditor(groupIndex, leadIndex) {
    var lead = this.inbox[groupIndex].dayGroup.leads[leadIndex];
    var selector = 'textarea#' + 'area-' + lead.id;
    console.log(selector)
    lead.showEditor = !lead.showEditor;
    lead.type = 'read';
    tinymce.init({ selector: selector });
  }

  showMap(groupIndex, leadIndex) {
    var lead = this.inbox[groupIndex].dayGroup.leads[leadIndex];
    this.initMap(groupIndex, leadIndex);
    lead.type = 'read';
    lead.collapsed = !lead.collapsed
  }

  initMap(groupIndex, leadIndex) {
    var lead = this.inbox[groupIndex].dayGroup.leads[leadIndex];
    var that = this;
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

      var map = new google.maps.Map(document.getElementById('map-' + lead.id),
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
          lead.distance = response.routes[0].legs[0].distance.text;
        }
      });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    google.maps.event.addDomListener(window, 'load', calcRoute);
  }

}
