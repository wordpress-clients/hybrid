import AbstractItem from '../abstract/AbstractItem.js';

export default class extends AbstractItem {

    constructor($WPHCPage, $injector, $scope) {
        'ngInject';

        super($injector, $scope);
        this.setType('page');
        // this.setTitle($filter('translate')('pages.title'));
        this.setService($WPHCPage);
    }
}
