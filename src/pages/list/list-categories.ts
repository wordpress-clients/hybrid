import { Component } from '@angular/core';
import { ListPage } from './list';

@Component({
    selector: 'page-categories-list',
    templateUrl: 'list.html'
})
export class ListCategoriesPage extends ListPage {
    type: string = 'categories';
}