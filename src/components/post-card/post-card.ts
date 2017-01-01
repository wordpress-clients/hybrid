import { Component, Input } from '@angular/core';

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
  @Input() post: any;
  categories: Array<any>;
  tags: Array<any>;

  constructor() {}

  ngOnInit() {
    const terms = this.post._embedded['https://api.w.org/term'] || this.post._embedded['wp:term'];
    this.categories = terms[0];
    this.tags = terms[1];
  }

}
