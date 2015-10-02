import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($WPHCConfig, $q, CacheFactory, $log, $wpApiTerms, $stateParams) {
        'ngInject';

        super($WPHCConfig, $q, CacheFactory, $log, $stateParams);
        this.setType('tag');
        this.setService($wpApiTerms);
    }

    getHttpPromise(query) {
        return this.service.getTagList(query);
    }
}
