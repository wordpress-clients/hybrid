import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WpApiPosts } from 'wp-api-angular'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { addPosts, cleanPosts } from '../../actions';
import { AppState, IPostsState } from '../../reducers';

/*
  Generated class for the Posts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-posts',
    templateUrl: 'posts.html'
})
export class PostsPage {

    isPaginationEnabled: boolean = true;
    shouldRetry: boolean = false;
    page: number = 1;
    posts$: Observable<Array<any>>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private wpApiPosts: WpApiPosts,
        private store: Store<AppState>
    ) {
        this.posts$ = store.select('posts')
            .combineLatest(this.store.select('post'), (posts: IPostsState, post) => posts.list.map(id => post[id]));
    }

    ionViewDidLoad() {
        let currentList;
        this.store.select('posts').take(1).subscribe(({ list }) => currentList = list);
        console.log('ionViewDidLoad PostsPage', currentList);
        if (!currentList.length) {
            this.getPosts().toPromise();
        }
    }

    trackByPostId = (index: number, item) => item.id;

    private getPosts() {
        console.log('getPosts');
        let currentPage;
        this.store.select('posts').take(1).subscribe(({ page }) => currentPage = page);
        const nextPage = currentPage += 1;

        return this.wpApiPosts.getList({
            "search": `_embed=true&per_page=10&page=${nextPage}`
        })
            .debounceTime(400)
            .retry(3)
            .map((r) => {
                const totalPages = parseInt(r.headers.get('x-wp-totalpages'));
                this.store.dispatch(addPosts({
                    page: nextPage,
                    totalPages,
                    totalItems: parseInt(r.headers.get('x-wp-total')),
                    list: r.json()
                }));
                this.isPaginationEnabled = true;
                return totalPages <= nextPage;
            })
            .catch(res => {
                this.shouldRetry = true;
                this.isPaginationEnabled = false;
                console.log("ERROR! " + res);
                return res;
            });
    }

    doLoad() {
        console.log('doLoad');
        return this.getPosts().toPromise();
    }

    doRefresh(refresher) {
        console.log('doRefresh');
        this.store.dispatch(cleanPosts());
        this.getPosts().toPromise().then(() => refresher.complete(), (error) => refresher.complete());
    }

    doInfinite(infiniteScroll) {
        console.log('doInfinite');
        this.getPosts().toPromise().then((isComplete) => {
            infiniteScroll.complete();
            this.isPaginationEnabled = !isComplete;
        }, (error) => infiniteScroll.complete());
    }

}
