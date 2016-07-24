import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

@Component({
  selector: 'navbar',
  template: `
    <!-- Top row, always visible -->
    <div class="header">
      <a href="#" class="header__logo">Qshark Titan</a>
      <nav class="header__nav">
        <a class="header__nav__link" [routerLink]="['/']">
        All leads</a>
        <a class="header__nav__link" [routerLink]="['/calendar']">calendar</a>
      </nav>
    </div>
    `,
  directives: [ROUTER_DIRECTIVES]
})
export class NavBarComponent { }
