import { Component } from '@angular/core';
import { ListPage } from './list';

@Component({
    selector: 'page-tags-list',
    templateUrl: 'list.html'
})
export class ListTagsPage extends ListPage {
    type: string = 'tags';
}