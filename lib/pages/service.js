import AbstractList from '../abstract/AbstractTypeService.js';

export default class extends AbstractList {
    constructor($WPHCConfig, $q, CacheFactory, $log, $wpApiPages) {
        'ngInject';

        super($WPHCConfig, $q, CacheFactory, $log);
        this.setType('pages');
        this.setService($wpApiPages);
    }
}
