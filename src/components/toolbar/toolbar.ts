import { TranslateService } from '@ngx-translate/core';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { SocialSharing } from '@ionic-native/social-sharing';

import { addBookmark, removeBookmark } from '../../actions';
import { TaxonomiesModal } from './../../pages/taxonomies-modal/taxonomies-modal';
import { AppState } from '../../reducers';
import { Toast } from '../../providers';

/*
  Generated class for the Toolbar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  @Input() categories: Array<Object>;
  @Input() tags: Array<Object>;
  @Input() bookmarkId: string;
  @Input() shareMessage: string = '';
  @Input() shareSubject: string = '';
  @Input() shareUrl: string = '';

  isBookmarked$: Observable<Boolean>;
  isMobile: boolean;

  constructor(
    private modalCtrl: ModalController,
    private store: Store<AppState>,
    private toast: Toast,
    private translate: TranslateService,
    private platform: Platform,
    private socialSharing: SocialSharing,
  ) {
    this.isBookmarked$ = this.store.select((state: AppState) => {
      return Object.keys(state.bookmarks).indexOf(this.bookmarkId) > -1;
    });
    this.isMobile = this.platform.is('mobile') || (!this.shareMessage && !this.shareSubject);
  }

  private openTaxonomy(title: string, term: string, list: Array<Object>, postType: string) {
    let profileModal = this.modalCtrl.create(TaxonomiesModal, {
      title,
      postType,
      term,
      list
    });
    profileModal.present();
  }

  openCategories(e) {
    e.stopPropagation();
    this.openTaxonomy('TITLE_CATEGORIES', 'category', this.categories, 'posts');
  }

  openTags(e) {
    e.stopPropagation();
    this.openTaxonomy('TITLE_TAGS', 'tag', this.tags, 'posts');
  }

  doBookmark(e) {
    e.stopPropagation();
    let isBookmarked;
    this.isBookmarked$.take(1).subscribe(response => isBookmarked = response);

    if (isBookmarked) {
      this.store.dispatch(removeBookmark(this.bookmarkId));
      this.toast.show(this.translate.instant('BOOKMARK_REMOVED'));
    } else {
      this.store.dispatch(addBookmark(this.bookmarkId));
      this.toast.show(this.translate.instant('BOOKMARK_ADDED'));
    }
  }

  share() {
    this.socialSharing.share(this.shareMessage, this.shareSubject, null, this.shareUrl).then(() => {
      this.toast.show(this.translate.instant('SHARE_SUCCESS'));
    }).catch(() => {
      this.toast.show(this.translate.instant('SHARE_ERROR'));
    });
  }

}
