import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCPosts, $WPHCTaxonomiesCustomPosts, $injector, $scope, $filter, $stateParams) {
        'ngInject';

        super($injector, $scope);
        this.showToolbar = true;
        this.setType('taxonomiesPosts');
        if ($stateParams.postType == 'post') {
            this.setService($WPHCPosts);
        } else {
            this.setService($WPHCTaxonomiesCustomPosts);
        }

        this.term = $stateParams.term;
        this.postType = $stateParams.postType;
        this.$filter = $filter;
        this.setTitle(this.getTitle($stateParams.term, $stateParams.slug));
    }

    getQuery() {
        var query = super.getQuery();
        if (this.$stateParams.term === 'category') {
            query["filter[category_name]"] = this.$stateParams.slug
        } else if (this.$stateParams.term === 'post_tag') {
            query["filter[tag]"] = this.$stateParams.slug
        } else {
            query[`filter[${this.$stateParams.term}]`] = this.$stateParams.slug
        }
        return query;
    }

    getTitle(term, slug) {
        let trans = '';
        if (term === "category") {
            trans = slug ? 'category.title' : 'categories.title';
        } else if (term === "post_tag") {
            trans = slug ? 'tag.title' : 'tags.title';
        } else {
            trans = 'customTaxonomy.title';
        }
        if (slug) {
            return this.$filter('translate')(trans, {
                name: decodeURIComponent(slug),
                term: this.$stateParams.term
            });
        }
        return this.$filter('translate')(trans);
    }
}
