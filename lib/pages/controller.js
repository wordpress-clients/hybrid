import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCPages, $WPHCConfig, $q, $scope, $filter) {
        'ngInject';

        super($WPHCConfig, $q, $scope);
        this.showToolbar = false;
        this.setType('pages');
        this.setTitle($filter('translate')('pages.title'));
        this.setService($WPHCPages);
    }
}
