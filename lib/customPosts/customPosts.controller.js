import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCCustomPosts, $injector, $filter) {
        'ngInject';

        super($injector);
        this.setType('customPosts');
        this.setTitle($filter('translate')('customPosts.title'));
        this.setService($WPHCCustomPosts);
    }
}
