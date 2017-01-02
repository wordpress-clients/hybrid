import { Injectable } from '@angular/core';
import deepExtend from 'deep-extend';
import _get from 'lodash/get';

import defaultConfig from '../../config/config.default.cson';
import configOverwrite from '../../config/config.cson';

export const RawConfig = deepExtend(defaultConfig, configOverwrite)

@Injectable()
export class Config {
    private _config = Config;

    get = (path = '', otherwise = undefined) => _get(this._config, path, otherwise);
    getApi = (path = '', otherwise = undefined) => this.get(`api.${path}`, otherwise);
    getMenu = (path = '', otherwise = undefined) => this.get(`menu.${path}`, otherwise);
    getNative = (path = '', otherwise = undefined) => this.get(`native.${path}`, otherwise);
    getToast = (path = '', otherwise = undefined) => this.get(`toast.${path}`, otherwise);
}
