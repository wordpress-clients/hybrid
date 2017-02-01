import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Config } from '../../providers';
import { IMenuItem } from '../menu-items/menu-items';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  @Input() content: any;
  list: Array<IMenuItem>
  title: string

  constructor(
    private config: Config
  ) {
    this.list = config.getMenu('list', []);
    this.title = config.get('title', '');
  }
}
