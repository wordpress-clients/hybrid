import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCPosts, $WPHCConfig, $q, $scope, $filter, $stateParams) {
        'ngInject';

        super($WPHCConfig, $q, $scope, $stateParams);
        this.setType('posts');
        this.setTitle($filter('translate')('posts.title'));
        this.setService($WPHCPosts);
    }
}
