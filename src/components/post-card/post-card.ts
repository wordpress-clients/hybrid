import { Component } from '@angular/core';

/*
  Generated class for the PostCard component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'post-card',
  templateUrl: 'post-card.html'
})
export class PostCardComponent {

  text: string;

  constructor() {
    console.log('Hello PostCard Component');
    this.text = 'Hello World';
  }

}
