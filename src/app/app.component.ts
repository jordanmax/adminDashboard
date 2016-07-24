import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

import {NavBarComponent} from './components/navbar.component';
import {SideBarComponent} from './components/sidebar.component';

@Component({
  selector: 'my-app',
  template: `
        <navbar class="header"></navbar>
        <main class="main">
          <sidebar class="sidebar"></sidebar>
          <div class="page-content">
            <router-outlet></router-outlet>
          </div>
        </main>
      `,
  directives: [NavBarComponent, SideBarComponent, ROUTER_DIRECTIVES]
})
export class AppComponent {

}
