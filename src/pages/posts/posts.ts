import { TranslateService } from 'ng2-translate/ng2-translate';
import {
    Component, trigger, state,
    style, transition, animate
} from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { WpApiPosts } from 'wp-api-angular';
import { Store } from '@ngrx/store';

import { PostPage } from '../../pages/post/post';
import { Toast, Config } from './../../providers';
import { PaginatedPage, IPaginatedPage, IPaginatedResult } from '../abstract/PaginatedPage';
import { addPosts, cleanPosts } from '../../actions';
import { AppState, IPostsState } from '../../reducers';

/*
  Generated class for the Posts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-posts',
    templateUrl: 'posts.html',
    animations: [
        trigger('appear', [
            state('in', style({ opacity: 1, transform: 'scale(1)' })),
            transition('void => in', [
                style({
                    opacity: 0,
                    transform: 'scale(0.8)'
                }),
                animate('0.2s ease-in')
            ]),
            transition('in => void', [
                animate('0.2s 10 ease-out', style({
                    opacity: 0,
                    transform: 'scale(0.8)'
                }))
            ])
        ])
    ]
})
export class PostsPage extends PaginatedPage implements IPaginatedPage {
    constructor(
        public config: Config,
        public navParams: NavParams,
        public toast: Toast,
        public translate: TranslateService,
        private navCtrl: NavController,
        private wpApiPosts: WpApiPosts,
        private store: Store<AppState>,
    ) {
        super(config, navParams, toast, translate);
        this.setStream(store.select('posts')
            .combineLatest(this.store.select('post'), (posts: IPostsState, post) => posts.list.map(id => post[id])));
        this.setStore(store.select('posts'));
        this.setService(wpApiPosts);
        this.setType('posts');
    }

    onLoad({ page, totalPages, totalItems, list }: IPaginatedResult) {
        this.store.dispatch(addPosts({
            page,
            totalPages,
            totalItems,
            list
        }));
    }

    onClean() {
        this.store.dispatch(cleanPosts());
    }

    openPage = (e, post) => {
        this.navCtrl.push(PostPage, {
            id: post.id
        })
    }

}
