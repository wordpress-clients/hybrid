import { Component, Input, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

/*
  Generated class for the Post component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent {
  @ViewChild(Content) content: Content;
  @Input() post : any;

  constructor() { }
  
  ngOnChanges() {
    this.content && this.content.resize();
  }

}
