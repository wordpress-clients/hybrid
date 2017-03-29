import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Menu } from '../../providers';
import { IMenuItem } from '../menu-items/menu-items';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  @Input() content: any;
  list: Array<IMenuItem>

  constructor(
    private menu: Menu
  ) {
    this.list = menu.getRaw();
  }
}
