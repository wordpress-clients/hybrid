import { Component } from '@angular/core';
import { ListPage } from './list';
import { ItemPostsPage } from '../item/item-post';

@Component({
    selector: 'page-posts-list',
    templateUrl: 'list.html'
})
export class ListPostsPage extends ListPage {
    type: string = 'posts';
}