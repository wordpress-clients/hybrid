import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCTaxonomiesCategory, $WPHCTaxonomiesTag, $injector, $scope, $filter, $stateParams) {
        'ngInject';

        super($injector, $scope);
        this.showToolbar = true;
        this.setType('taxonomies');
        if ($stateParams.term === 'category') {
            this.setTitle($filter('translate')('categories.title'));
            this.setService($WPHCTaxonomiesCategory);
        } else if ($stateParams.term === 'post_tag') {
            this.setTitle($filter('translate')('tags.title'));
            this.setService($WPHCTaxonomiesTag);
        }
        this.term = $stateParams.term;
    }
}
