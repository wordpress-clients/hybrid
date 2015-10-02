import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCPosts, $WPHCConfig, $q, $scope, $filter, $stateParams) {
        'ngInject';

        super($WPHCConfig, $q, $scope, $stateParams);
        this.showToolbar = true;
        this.setType('taxonomiesPosts');
        this.setService($WPHCPosts);
        this.term = $stateParams.term;
        this.$filter = $filter;
        this.setTitle(this.getTitle($stateParams.term, $stateParams.slug));
    }

    getQuery() {
        var query = super.getQuery();
        if (this.$stateParams.term === 'category') {
            query["filter[category_name]"] = this.$stateParams.slug
        } else if (this.$stateParams.term === 'post_tag') {
            query["filter[tag]"] = this.$stateParams.slug
        }
        return query;
    }

    getTitle(term, slug) {
        let trans = '';
        if (term === "category") {
            trans = slug ? 'category.title' : 'categories.title';
        } else if (term === "post_tag") {
            trans = slug ? 'tag.title' : 'tags.title';
        }
        if (slug) {
            return this.$filter('translate')(trans, {
                name: decodeURIComponent(slug)
            });
        }
        return this.$filter('translate')(trans);
    }
}
