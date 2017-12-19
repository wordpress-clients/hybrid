import { Component } from '@angular/core';
import { ItemPage } from './item';

@Component({
    selector: 'page-pages-item',
    templateUrl: 'item.html'
})
export class ItemPagesPage extends ItemPage {
    type: string = 'pages';
}