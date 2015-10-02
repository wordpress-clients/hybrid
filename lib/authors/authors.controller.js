import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCAuthors, $WPHCConfig, $q, $scope, $filter) {
        'ngInject';

        super($WPHCConfig, $q, $scope);
        this.showToolbar = true;
        this.setType('authors');
        this.setTitle($filter('translate')('authors.title'));
        this.setService($WPHCAuthors);
    }
}
