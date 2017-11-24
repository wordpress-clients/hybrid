import { Component } from '@angular/core';
import { ListPage } from './list';

@Component({
    selector: 'page-author-list',
    templateUrl: 'list.html'
})
export class ListAuthorPage extends ListPage {
    public static _menuMapping: string = 'author';
    type: string = 'posts';

    getQuery() {
        let query = super.getQuery();
        query.author = parseInt(this.navParams.get('id'));
        return query;
    }
}