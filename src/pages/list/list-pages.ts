import { Component } from '@angular/core';
import { ListPage } from './list';
import { ItemPagesPage } from '../item/item-page';

@Component({
    selector: 'page-pages-list',
    templateUrl: 'list.html'
})
export class ListPagesPage extends ListPage {
    type: string = 'pages';
}