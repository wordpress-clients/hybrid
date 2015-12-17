export default class {
    constructor($injector, $scope) {
        'ngInject';

        this.type = null;
        this.title = null;
        this.list = null;
        this.service = null;
        this.isLoadingMore = false;
        this.isPaginationOver = false;
        this.$injector = $injector;
        this.config = $injector.get('$WPHCConfig');
        this.$stateParams = $injector.get('$stateParams');
        this.$q = $injector.get('$q');
        this.$log = $injector.get('$log');
        this.page = 1;
        this.$scope = $scope;
        this.loadMore = ionic.throttle(angular.bind(this, () => {
            this.doLoadMore().finally(() => this.$scope.$broadcast('scroll.infiniteScrollComplete'));
        }), 1000);
    }

    init() {
        this.page = 1;
        this.isPaginationOver = false;
        return this.doLoadMore();
    }

    refresh() {
        this.page = 1;
        this.isPaginationOver = false;
        this.service.clearCache();
        this.doLoadMore(true).then(angular.bind(this, (response) => {
            this.$log.debug('[AbstractList] refresh', response);
        })).finally(() => this.$scope.$broadcast('scroll.refreshComplete'));
    }

    doLoadMore(refresh = false) {
        let self = this;
        // prevent multiple call when the server takes some time to answer
        if (this.isLoadingMore || this.isPaginationOver) {
            return this.$q.when(null);
        }
        this.isLoadingMore = true;
        return this.service.get(angular.merge(this.getQuery(), _.get(this.config, `[${this.type}].query`) || {})).then((response) => {
            self.page++;

            if (self.list && refresh) {
                let newPosts = [];
                let i = 0;
                let found = false;
                let latestId = self.list[0].id;
                let len = response.data.length;

                for (; i < len; i++) {
                    let post = response.data[i];
                    if (post.id === latestId) {
                        found = true
                        break;
                    }
                }
                if (i > 0 && found) {
                    newPosts = response.data.slice(0, i);
                    this.$log.debug('[AbstractList] new items to add to the list', newPosts.length);
                    if (newPosts.length) {
                        self.list = newPosts.concat(self.list);
                    }
                } else if (i == _.get(this.config, `${this.type}.query.per_page`)){ // new posts > perPage
                    this.$log.debug('[AbstractList] new posts > perPage');
                    self.list = response.data;
                }
            } else {
                self.list = (self.list) ? self.list.concat(response.data) : response.data;
            }
            self.isPaginationOver = (response.data.length === 0 || response.data.length < _.get(this.config, `${this.type}.query.per_page`));
            return response;
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
