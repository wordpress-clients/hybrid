import md5 from 'MD5';

export default class {
    constructor($WPHCConfig, $q, CacheFactory, $log) {
        'ngInject';

        this.$WPHCConfig = $WPHCConfig;
        this.CacheFactory = CacheFactory;
        this.$log = $log;
        this.$q = $q;
        this.type = null;
        this.service = null;
    }

    setType(type = null) {
        this.type = type;
    }

    setService(service = null) {
        this.service = service;
    }

    getCache() {
        if (this.CacheFactory.get(this.type)) {
            return this.CacheFactory.get(this.type);
        }
        return this.CacheFactory(this.type, _.set(this.$WPHCConfig, `${this.type}.cache`));
    }


    clearCache() {
        this.CacheFactory.destroy(this.type);
    }

    getList(query) {
        let queryString = JSON.stringify(query);
        let deferred = this.$q.defer();
        let hash = md5(this.$WPHCConfig.api.baseUrl + queryString);
        let listCache = this.getCache().get('list-' + hash);
        this.$log.debug(`${this.type} cache`, listCache);
        if (listCache) {
            deferred.resolve(listCache);
        } else {
            this.service.getList(query)
                .then((response) => {
                    this.getCache().put('list-' + hash, response);
                    deferred.resolve(response);
                })
                .catch((response) => {
                    deferred.reject(error);
                });
        }
        return deferred.promise;
    }
}
