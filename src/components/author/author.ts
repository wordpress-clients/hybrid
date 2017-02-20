import { NavController } from 'ionic-angular';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { MenuMapping } from './../../pages/index';
import { AppState, IAuthorState } from '../../reducers';

/*
  Generated class for the Author component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'author',
  templateUrl: 'author.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent {
  author: IAuthorState | undefined = undefined;
  @Input() authorId: number; // Author ID
  @Input() link: Boolean;
  @Input() date: String;

  constructor(
    private navCtrl: NavController,
    private store: Store<AppState>
  ) {
    this.store.select('author')
      .take(1)
      .map((author) => this.author = author[this.authorId])
      .subscribe()
  }

  goToAuthorPage(e) {
    // this.navCtrl.push(MenuMapping.author, {
    //   id: this.authorId
    // });
  }

}
