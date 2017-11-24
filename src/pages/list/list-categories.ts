import { Component } from '@angular/core';
import { ListPage } from './list';

@Component({
    selector: 'page-categories-list',
    templateUrl: 'list.html'
})
export class ListCategoriesPage extends ListPage {
    public static _menuMapping: string = 'categories';
    type: string = 'categories';
}