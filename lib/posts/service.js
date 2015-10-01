import AbstractList from '../abstract/AbstractTypeService.js';

export default class extends AbstractList {
    constructor($WPHCConfig, $q, CacheFactory, $log, $wpApiPosts) {
        'ngInject';

        super($WPHCConfig, $q, CacheFactory, $log);
        this.setType('posts');
        this.setService($wpApiPosts);
    }
}
