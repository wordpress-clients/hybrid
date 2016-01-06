import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCCustomPosts, $injector, $filter) {
        'ngInject';

        super($injector);
        this.setType('customPosts');
        this.setService($WPHCCustomPosts);
        this.type = _.get(this.$stateParams, 'slug');
        this.setTitle(this.type);
    }
}
