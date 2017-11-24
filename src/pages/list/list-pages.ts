import { Component } from '@angular/core';
import { ListPage } from './list';
import { ItemPagesPage } from '../item/item-page';

@Component({
    selector: 'page-pages-list',
    templateUrl: 'list.html'
})
export class ListPagesPage extends ListPage {
    type: string = 'pages';
    // This is used to know which page component to open
    // when bookmarking form a list
    itemMenuMapping: string = ItemPagesPage._menuMapping;

    public static _menuMapping: string = 'pages';
}