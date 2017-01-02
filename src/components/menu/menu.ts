import { Config } from './../../providers';
import { Component } from '@angular/core';

interface IMenu {
  
}


@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  list: Array<IMenu>

  constructor(
    private config: Config
  ) {
    config.getMenu('list');
  }

}
