import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';

import { MenuMapping } from './../../pages/index';

/*
  Generated class for the Author component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'author',
  templateUrl: 'author.html'
})
export class AuthorComponent {

  @Input() author : any;
  @Input() link : Boolean;
  @Input() date : String;

  constructor(
    private navCtrl: NavController
  ) { }
  
  goToAuthorPage(e) {
    this.navCtrl.push(MenuMapping.author, {
      id: this.author.id
    });
  }

}
