module.exports = angular.module('wordpress-hybrid-client.taxonomies').factory '$WPHCSearch', ($log, $filter, $q) ->
    $log.info '$WPHCSearch'

    getTitle: (query) ->
        if query
            $filter('translate') 'search.titleQuery',
                query: query
        else
            $filter('translate') 'search.title'
