import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($WPHCConfig, $q, CacheFactory, $log, $wpApiPages, $stateParams) {
        'ngInject';

        super($WPHCConfig, $q, CacheFactory, $log, $stateParams);
        this.setType('pages');
        this.setService($wpApiPages);
    }
}
