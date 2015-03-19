md5 = require 'MD5'

module.exports = angular.module('wordpress-hybrid-client.taxonomies').factory '$WPHCTaxonomies', ($log, $filter, $wpApiTaxonomies, $q, $WPHCConfig, CacheFactory) ->
    $log.info '$WPHCTaxonomies'

    getCache = () ->
        if CacheFactory.get 'taxonomies'
            return CacheFactory.get 'taxonomies'
        CacheFactory 'taxonomies', $WPHCConfig.taxonomies.cache

    getTitle: (term, slug) ->
        trans = ''
        switch term
            when "post_tag"
                trans = if slug then 'tag.title' else 'tags.title'
            when "category"
                trans = if slug then 'category.title' else 'categories.title'
        $log.debug trans, term, '$WPHCTaxonomies getTitle'

        if slug
            $filter('translate') trans,
                name: slug
        else
            $filter('translate') trans

    getList: (term) ->
        deferred = $q.defer()
        hash = md5 $WPHCConfig.api.baseUrl + term
        listCache = getCache().get 'list-' + hash
        $log.debug listCache, 'Taxo cache'
        if listCache
            deferred.resolve listCache
        else
            $wpApiTaxonomies.$getTermList term
            .then (response) ->
                getCache().put 'list-' + hash, response
                deferred.resolve response
        deferred.promise
