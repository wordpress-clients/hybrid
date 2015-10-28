import md5 from 'MD5';
import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($injector) {
        'ngInject';

        super($injector);
    }

    getHttpPromise(id) {
        return this.service.get(id);
    }

    get(id) {
        let deferred = this.$q.defer();
        let hash = md5(this.config.api.baseUrl + id);
        let itemCache = this.getCache().get('item-' + hash);
        if (itemCache) {
            deferred.resolve(itemCache);
        } else {
            this.getHttpPromise(id).then((response) => {
                    this.getCache().put('item-' + hash, response);
                    deferred.resolve(response);
                })
                .catch((response) => {
                    deferred.reject(error);
                });
        }
        return deferred.promise;
    }
}
