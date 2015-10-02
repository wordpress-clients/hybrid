import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($WPHCConfig, $q, CacheFactory, $log, $wpApiPosts, $stateParams) {
        'ngInject';

        super($WPHCConfig, $q, CacheFactory, $log, $stateParams);
        this.setType('posts');
        this.setService($wpApiPosts);
    }
}
