import { Component } from '@angular/core';
import { ItemPage } from './item';

@Component({
    selector: 'page-posts-item',
    templateUrl: 'item.html'
})
export class ItemPostsPage extends ItemPage {
    type: string = 'posts';
}