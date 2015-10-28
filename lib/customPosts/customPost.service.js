import AbstractItemService from '../abstract/AbstractItemService.js';

export default class extends AbstractItemService {
    constructor($wpApiCustomPosts, $injector) {
        'ngInject';

        super($injector);
        this.setType('customPost');
        this.setService($wpApiCustomPosts);
    }
}
