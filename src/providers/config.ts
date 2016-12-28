import { Injectable } from '@angular/core';
import deepExtend from 'deep-extend';
import _get from 'lodash/get';

import defaultConfig from '../../config/config.default.cson';
import configOverwrite from '../../config/config.cson';

export const Config = deepExtend(defaultConfig, configOverwrite)

@Injectable()
export class ConfigService {
    private _config = Config;

    get = (path = '', otherwise = undefined) => _get(this._config, path, otherwise);
    getApi = (path = '', otherwise) => this.get(`api.${path}`, otherwise);
    getMenu = (path = '', otherwise) => this.get(`menu.${path}`, otherwise);
    getNative = (path = '', otherwise) => this.get(`native.${path}`, otherwise);
}
