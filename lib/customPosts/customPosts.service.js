import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($wpApiCustom, $injector) {
        'ngInject';

        super($injector);
        this.setType('customPosts');
        this.setService($wpApiCustom);
    }
}
