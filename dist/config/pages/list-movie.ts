import { Component } from '@angular/core';
import { ListPage } from '../../src/pages/list/list';
import { ItemMoviePage } from './item-movie';

@Component({
    selector: 'page-authors-list',
    templateUrl: '../../src/pages/list/list.html'
})
export class ListMoviePage extends ListPage {
    type: string = 'movie';
    // This is used to know which page component to open
    // when bookmarking from a list
    itemMenuMapping: string = ItemMoviePage._menuMapping;
    // reference used by the menu and bookmarks
    public static _menuMapping: string = 'movie';
}