import { Component } from '@angular/core';
import { ListPage } from './list';

@Component({
    selector: 'page-author-list',
    templateUrl: 'list.html'
})
export class ListAuthorPage extends ListPage {
    type: string = 'posts';

    getQuery() {
        let query = super.getQuery();
        query.author = parseInt(this.navParams.get('id'));
        return query;
    }
}