import AbstractItem from '../abstract/AbstractItem.js';

export default class extends AbstractItem {

    constructor($WPHCPage, $WPHCConfig, $q, $scope, $filter, $stateParams) {
        'ngInject';

        super($WPHCConfig, $q, $scope, $stateParams);
        this.setType('page');
        // this.setTitle($filter('translate')('pages.title'));
        this.setService($WPHCPage);
    }
}
