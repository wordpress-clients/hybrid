import { Injectable } from '@angular/core';
const menu = require(`${__CONFIG_FOLDER__}/menu.json`);

@Injectable()
export class Menu {
    getRaw = () => menu;
}
