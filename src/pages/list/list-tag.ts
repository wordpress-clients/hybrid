import { Component } from '@angular/core';
import { ListPage } from './list';
import { ItemPostsPage } from '../item/item-post';

@Component({
    selector: 'page-tag-list',
    templateUrl: 'list.html'
})
export class ListTagPage extends ListPage {
    type: string = 'posts';

    getQuery() {
        let query = super.getQuery();
        query.tags = parseInt(this.navParams.get('id'));
        return query;
    }
}