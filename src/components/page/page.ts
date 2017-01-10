import { Component, Input } from '@angular/core';

/*
  Generated class for the Page component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'page',
  templateUrl: 'page.html'
})
export class PageComponent {
  @Input() item : any;

  constructor() {}

}
