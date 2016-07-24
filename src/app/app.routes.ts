import { provideRouter, RouterConfig } from '@angular/router';
import {LeadsComponent} from './components/leads.component';
import {CalendarComponent} from './calendar/calendar.component';

export const routes: RouterConfig = [
  { path: '', component: CalendarComponent },
  { path: 'calendar', component: CalendarComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
