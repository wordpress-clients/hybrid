import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCPosts, $WPHCConfig, $q, $scope, $filter) {
        'ngInject';

        super($WPHCConfig, $q, $scope);
        this.showToolbar = true;
        this.setType('posts');
        this.setTitle($filter('translate')('posts.title'));
        this.setService($WPHCPosts);
    }
}
