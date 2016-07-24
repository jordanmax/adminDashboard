import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

@Component({
  selector: 'sidebar',
  template: `
        <nav class="sidebar-nav">
          <a class="sidebar-nav__link active" [routerLink]="['/']">
            <i class="material-icons">list</i>
            Filter
          </a>
          <a href="" class="sidebar-nav__link">
            <i class="material-icons">&#xE146;</i> 
            New moving job
          </a>
          <a class="sidebar-nav__link" href=""><i class="material-icons">motorcycle</i>
          Link</a>
          <a class="sidebar-nav__link" href=""><i class="material-icons">motorcycle</i>
          Link</a>
        </nav>`,
  directives: [ROUTER_DIRECTIVES]
})
export class SideBarComponent { }
