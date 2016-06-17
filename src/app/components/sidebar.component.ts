import {Component} from '@angular/core';

@Component({
  selector: 'sidebar',
  template: `
        <span class="mdl-layout-title mdl-layout-title--colored">
            <span class="mdl-layout-title__text">Titan: Movers CRM</span>
        </span>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="">All leads</a>
          <a class="mdl-navigation__link" href="">Link</a>
          <a class="mdl-navigation__link" href="">Link</a>
          <a class="mdl-navigation__link" href="">Link</a>
        </nav>`
})
export class SideBarComponent { }
