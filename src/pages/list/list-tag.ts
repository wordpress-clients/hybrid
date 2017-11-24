import { Component } from '@angular/core';
import { ListPage } from './list';

@Component({
    selector: 'page-tag-list',
    templateUrl: 'list.html'
})
export class ListTagPage extends ListPage {
    public static _menuMapping: string = 'tag';
    type: string = 'posts';

    getQuery() {
        let query = super.getQuery();
        query.tags = parseInt(this.navParams.get('id'));
        return query;
    }
}