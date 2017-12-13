import { Component } from '@angular/core';
import { ListPage } from './list';

@Component({
    selector: 'page-pages-list',
    templateUrl: 'list.html'
})
export class ListPagesPage extends ListPage {
    type: string = 'pages';
}