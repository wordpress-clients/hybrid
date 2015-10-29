import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($wpApiCustom, $injector, $stateParams) {
        'ngInject';

        super($injector);
        this.setType('customPosts');
        let service = $wpApiCustom.getInstance($stateParams.slug);
        this.setService(service);
    }

    getHttpPromise(query) {
        let service = this.$injector.get('$wpApiCustom').getInstance(this.$stateParams.slug);
        this.setService(service);
        return this.service.getList(query);
    }
}
