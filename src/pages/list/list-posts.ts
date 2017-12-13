import { Component } from '@angular/core';
import { ListPage } from './list';

@Component({
    selector: 'page-posts-list',
    templateUrl: 'list.html'
})
export class ListPostsPage extends ListPage {
    type: string = 'posts';
}