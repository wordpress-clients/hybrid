md5 = require 'MD5'

module.exports = angular.module('wordpress-hybrid-client.posts')
    .factory '$WPHCPosts', ($log, $wpApiPosts, $q, $WPHCConfig, CacheFactory) ->
        $log.info '$WPHCPosts'

        getCache = () ->
            if CacheFactory.get 'posts'
                return CacheFactory.get 'posts'
            CacheFactory 'posts', $WPHCConfig.posts.cache

        clearCache: () ->
            CacheFactory.destroy 'posts'

        getQuery: (page) ->
            page: page
            "_embed": true
            "filter[posts_per_page]": _.get($WPHCConfig, 'posts.per_page') || 5
            "filter[orderby]": _.get($WPHCConfig, 'posts.orderby') || 'date'
            "filter[order]": _.get($WPHCConfig, 'posts.order') || 'desc'
            "filter[post_status]": _.get($WPHCConfig, 'posts.post_status') || 'publish'

        getList: (query) ->
            queryString = JSON.stringify query
            deferred = $q.defer()
            hash = md5 $WPHCConfig.api.baseUrl + queryString
            listCache = getCache().get 'list-' + hash
            $log.debug listCache, 'Post cache'
            if listCache
                deferred.resolve listCache
            else
                $wpApiPosts.getList query
                .then (response) ->
                    response.isPaginationOver = (response.data.length is 0 or response.data.length < $WPHCConfig.posts.posts_per_page)
                    getCache().put 'list-' + hash, response
                    deferred.resolve response
                .catch (error) ->
                    deferred.reject error
            deferred.promise
