import { provideRouter, RouterConfig } from '@angular/router';
import {LeadsComponent} from './components/leads.component';
import {CalendarComponent} from './components/calendar.component';

export const routes: RouterConfig = [
  { path: '', component: LeadsComponent },
  { path: 'calendar', component: CalendarComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
