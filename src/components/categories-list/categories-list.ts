import { Component, ChangeDetectionStrategy } from '@angular/core';

/*
  Generated class for the CategoriesList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'categories-list',
  templateUrl: 'categories-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent {

  text: string;

  constructor() {
    console.log('Hello CategoriesList Component');
    this.text = 'Hello World';
  }

}
