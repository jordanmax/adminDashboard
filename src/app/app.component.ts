import {Component} from '@angular/core';
import {NavBarComponent} from './components/navbar.component';
import {SideBarComponent} from './components/sidebar.component';
import {LeadsComponent} from './components/leads.component';


@Component({
  selector: 'my-app',
  template: `
      <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer has-drawer has-tabs is-upgraded">
        <navbar class="mdl-layout__header is-casting-shadow"></navbar>
        <sidebar class="mdl-layout__drawer"></sidebar>
        <main class="mdl-layout__content">
            <div class="mdl-grid">

                <div class="mdl-cell mdl-cell--12-col">
                    <leads></leads>
                </div>
            </div>
        </main>
      </div>
      `,
  directives: [NavBarComponent, SideBarComponent, LeadsComponent]
})
export class AppComponent {
  constructor() {
    this.ckeditorContent = `<p>My HTML</p>`;
  }
}
