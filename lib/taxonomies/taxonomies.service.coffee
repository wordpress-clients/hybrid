md5 = require 'MD5'

module.exports = angular.module('wordpress-hybrid-client.taxonomies').factory '$WPHCTaxonomies', ($log, $rootScope, $filter, $wpApiTaxonomies, $q, $WPHCConfig, CacheFactory, $ionicModal) ->
    $log.info '$WPHCTaxonomies'

    modal = null

    getCache = () ->
        if CacheFactory.get 'taxonomies'
            return CacheFactory.get 'taxonomies'
        CacheFactory 'taxonomies', $WPHCConfig.taxonomies.cache

    showTaxonomiesInModal: (translation, list, term) ->
        # init the modal only on demand
        if !modal
            modal = $ionicModal.fromTemplate require('./taxonomies.modal.html'),
                scope: $rootScope.$new()
                animation: 'slide-in-up'
            modal.scope.modal = modal

        modal.scope.taxonomies =
            title: translation
            term : null
            list : []

        modal.show().then ->
            modal.scope.taxonomies.term = term
            modal.scope.taxonomies.list = list

    getTitle: (term, slug) ->
        trans = ''
        switch term
            when "post_tag"
                trans = if slug then 'tag.title' else 'tags.title'
            when "category"
                trans = if slug then 'category.title' else 'categories.title'

        if slug
            $filter('translate') trans,
                name: decodeURIComponent slug
        else
            $filter('translate') trans

    getList: (term) ->
        deferred = $q.defer()
        hash = md5 $WPHCConfig.api.baseUrl + term
        listCache = getCache().get 'list-' + hash
        if listCache
            deferred.resolve listCache
        else
            $wpApiTaxonomies.$getTermList term
            .then (response) ->
                getCache().put 'list-' + hash, response
                deferred.resolve response
            .catch (error) ->
                deferred.reject error
        deferred.promise
