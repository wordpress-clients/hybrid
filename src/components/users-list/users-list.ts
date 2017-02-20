import { Component } from '@angular/core';

/*
  Generated class for the UsersList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'users-list',
  templateUrl: 'users-list.html'
})
export class UsersListComponent {

  text: string;

  constructor() {
    console.log('Hello UsersList Component');
    this.text = 'Hello World';
  }

}
