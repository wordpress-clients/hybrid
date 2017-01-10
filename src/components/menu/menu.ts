import { Component, Input } from '@angular/core';

import { Config } from '../../providers';
import { MenuMapping } from '../../pages';

interface IMenu {
  type: String;
  trans: String;
  page?: String;
  params?: Object;
  icon?: String;
  list?: Array<IMenu>;
}

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {
  @Input() content: any;
  list: Array<IMenu>

  constructor(
    private config: Config
  ) {
    this.list = config.getMenu('list', []);
    console.log('this.list', this.list);
  }

  trackByIndex = (index: number, item) => index;

  doInternalClick = (e, { page, params, navRoot }) => {
    if (!MenuMapping[page]) {
      throw new Error(`the page "${page}" does not exist`);
    }
    if (navRoot) {
      this.content.setRoot(MenuMapping[page], params);
    } else {
      this.content.push(MenuMapping[page], params);
    }    
  }
}
