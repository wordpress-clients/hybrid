import { Component } from '@angular/core';
import { ListPage } from '../../src/pages/list/list';

@Component({
    selector: 'page-authors-list',
    templateUrl: '../../src/pages/list/list.html'
})
export class ListMoviePage extends ListPage {
    type: string = 'movie';
}