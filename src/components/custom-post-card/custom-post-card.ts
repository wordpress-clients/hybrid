import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/*
  Generated class for the CustomPostCard component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'custom-post-card',
  templateUrl: 'custom-post-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomPostCardComponent {
  @Input() post: any;
  @Input() type: String;
  @Input() onClick: (e, item) => void;
  categories: Array<any>;
  tags: Array<any>;

  constructor() {
    console.log('Hello CustomPostCard Component');
  }

}
