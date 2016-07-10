import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

@Component({
  selector: 'sidebar',
  template: `
        <span class="mdl-layout-title mdl-layout-title--colored">
            <span class="mdl-layout-title__text">Titan: Movers CRM</span>
        </span>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" [routerLink]="['/']">All leads</a>
          <a class="mdl-navigation__link" [routerLink]="['/calendar']">calendar</a>
          <a class="mdl-navigation__link" href="">Link</a>
          <a class="mdl-navigation__link" href="">Link</a>
        </nav>`,
  directives: [ROUTER_DIRECTIVES]
})
export class SideBarComponent { }
