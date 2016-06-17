import {Component} from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
    <!-- Top row, always visible -->
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <span class="mdl-layout-title">All leads</span>
      <div class="mdl-layout-spacer"></div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                      mdl-textfield--floating-label mdl-textfield--align-right">
        <label class="mdl-button mdl-js-button mdl-button--icon"
               for="waterfall-exp">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder">
          <input class="mdl-textfield__input" type="text" name="sample"
                 id="waterfall-exp">
        </div>
      </div>
    </div>
    <!-- Tabs -->
    <div class="mdl-layout__tab-bar-container">
      <div class="mdl-layout__tab-bar-button mdl-layout__tab-bar-left-button">
        <i class="material-icons">chevron_left</i>
      </div>
      <div class="mdl-layout__tab-bar is-casting-shadow">
        <a href="#scroll-tab-1" class="mdl-layout__tab is-active">Tab 1</a>
        <a href="#scroll-tab-2" class="mdl-layout__tab">Tab 2upgraded</a>
      </div>
      <div class="mdl-layout__tab-bar-button mdl-layout__tab-bar-right-button"><i class="material-icons">chevron_right</i></div>
    </div>
    `
})
export class NavBarComponent { }
