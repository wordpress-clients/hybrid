import AbstractItemService from '../abstract/AbstractItemService.js';

export default class extends AbstractItemService {
    constructor($WPHCConfig, $q, CacheFactory, $log, $wpApiPages, $stateParams) {
        'ngInject';

        super($WPHCConfig, $q, CacheFactory, $log, $stateParams);
        this.setType('page');
        this.setService($wpApiPages);
    }
}
