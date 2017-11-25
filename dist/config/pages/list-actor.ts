import { Component } from '@angular/core';
import { ListPage } from '../../src/pages/list/list';
import { ItemMoviePage } from './item-movie';

@Component({
    selector: 'page-actor-list',
    templateUrl: '../../src/pages/list/list.html'
})
export class ListActorPage extends ListPage {
    type: string = 'movie';
    // This is used to know which page component to open
    // when bookmarking from a list
    itemMenuMapping: string = ItemMoviePage._menuMapping;
    // reference used by the menu and bookmarks
    public static _menuMapping: string = 'actorItem';

    getQuery() {
        let query = super.getQuery();
        query.actor = parseInt(this.navParams.get('id'));
        return query;
    }
}