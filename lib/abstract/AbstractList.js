export default class {
    constructor($WPHCConfig, $q, $scope, $stateParams) {
        'ngInject';

        this.type = null;
        this.title = null;
        this.list = null;
        this.service = null;
        this.isLoadingMore = false;
        this.isPaginationOver = false;
        this.config = $WPHCConfig;
        this.$stateParams = $stateParams;
        this.$q = $q;
        this.page = 1;
        this.$scope = $scope;
        this.loadMore = ionic.throttle(this.doLoadMore, 1000);
    }

    init() {
        this.page = 1;
        this.isPaginationOver = false;
        return this.doLoadMore();
    }

    refresh() {
        this.init();
        this.list = null;
        this.doLoadMore().finally(() => this.$scope.$broadcast('scroll.refreshComplete'));
    }

    doLoadMore() {
        let self = this;
        // prevent multiple call when the server takes some time to answer
        if (this.isLoadingMore || this.isPaginationOver) {
            return this.$q.when(null);
        }
        this.isLoadingMore = true;
        return this.service.get(angular.merge(this.getQuery(), _.get(this.config, `[${this.type}].query`) || {})).then((response) => {
            self.page++;
            self.list = (self.list) ? self.list.concat(response.data) : response.data;
            self.isPaginationOver = (response.data.length === 0 || response.data.length < _.get(this.config, `${this.type}.query.per_page`));
            this.$scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(() => this.isLoadingMore = false);
    }

    getQuery() {
        return {
            page: this.page,
            "_embed": true
        }
    }

    setType(type = null) {
        this.type = type;
    }

    setService(service = null) {
        this.service = service;
    }

    setTitle(title = null) {
        this.title = title;
    }
}
