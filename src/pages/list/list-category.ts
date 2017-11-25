import { Component } from '@angular/core';
import { ListPage } from './list';
import { ItemPostsPage } from '../item/item-post';

@Component({
    selector: 'page-category-list',
    templateUrl: 'list.html'
})
export class ListCategoryPage extends ListPage {
    public static _menuMapping: string = 'category';
    // This is used to know which page component to open
    // when bookmarking form a list
    itemMenuMapping: string = ItemPostsPage._menuMapping;

    type: string = 'posts';

    getQuery() {
        let query = super.getQuery();
        query.categories = parseInt(this.navParams.get('id'));
        return query;
    }
}