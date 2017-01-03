import { Component, Input } from '@angular/core';

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

  constructor() {}

}
