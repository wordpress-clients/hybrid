import { Component } from '@angular/core';
import { ItemPage } from './item';

@Component({
    selector: 'page-pages-item',
    templateUrl: 'item.html'
})
export class ItemPagesPage extends ItemPage {
    type: string = 'pages';
    public static _menuMapping = 'pagesItem';

    get menuMapping() {
        return ItemPagesPage._menuMapping;
    }
}