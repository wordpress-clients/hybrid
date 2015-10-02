import AbstractItemService from '../abstract/AbstractItemService.js';

export default class extends AbstractItemService {
    constructor($WPHCConfig, $q, CacheFactory, $log, $wpApiUsers) {
        'ngInject';

        super($WPHCConfig, $q, CacheFactory, $log);
        this.setType('author');
        this.setService($wpApiUsers);
    }
}
