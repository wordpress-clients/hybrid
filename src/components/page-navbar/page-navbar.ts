import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchPage } from '../../pages/search/search';

/*
  Generated class for the PageNavbar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'page-navbar',
  templateUrl: 'page-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNavbarComponent {

  @Input() title: string;
  @Input() search: boolean = true;

  constructor(
    public navCtrl: NavController,
  ) { }

  goToSearch() {
    this.navCtrl.setRoot(SearchPage)
  }

}
