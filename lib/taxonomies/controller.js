import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCTaxonomiesCategory, $WPHCTaxonomiesTag, $WPHCConfig, $q, $scope, $filter, $stateParams) {
        'ngInject';

        super($WPHCConfig, $q, $scope, $stateParams);
        console.log('WPHCTaxonomiesController')
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
