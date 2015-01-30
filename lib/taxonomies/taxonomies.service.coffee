module.exports = angular.module('wordpress-hybrid-client.taxonomies').factory '$WPHCTaxonomies', ($log, $filter, $wpApiTaxonomies, $q, $WPHCConfig, DSCacheFactory) ->
    $log.info '$WPHCTaxonomies'

    getCache = () ->
        if DSCacheFactory.get 'taxonomies'
            return DSCacheFactory.get 'taxonomies'
        DSCacheFactory 'taxonomies', $WPHCConfig.taxonomies.cache

    getTitle: (term, slug) ->
        trans = ''
        switch term
            when "post_tag"
                trans = if slug then 'title.tag' else 'title.tags'
            when "category"
                trans = if slug then 'title.category' else 'title.categories'
        $log.debug trans, term, '$WPHCTaxonomies getTitle'

        if slug
            $filter('translate') trans,
                name: slug
        else
            $filter('translate') trans

    getList: (term) ->
        deferred = $q.defer()
        listCache = getCache().get 'list-' + term
        $log.debug listCache, 'Taxo cache'
        if listCache
            deferred.resolve listCache
        else
            $wpApiTaxonomies.$getTermList term
            .then (response) ->
                getCache().put 'list-' + term, response
                deferred.resolve response
        deferred.promise
