import { Injectable } from '@angular/core';
const menu = require('../../config/menu.json');

@Injectable()
export class Menu {
    getRaw = () => menu;
}
