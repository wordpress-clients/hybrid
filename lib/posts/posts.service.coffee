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
            "filter[posts_per_page]": $WPHCConfig.posts.posts_per_page
            "filter[orderby]": $WPHCConfig.posts.orderby
            "filter[order]": $WPHCConfig.posts.order
            "filter[post_status]": $WPHCConfig.posts.post_status

        getList: (query) ->
            queryString = JSON.stringify query
            deferred = $q.defer()
            hash = md5 $WPHCConfig.api.baseUrl + queryString
            listCache = getCache().get 'list-' + hash
            $log.debug listCache, 'Post cache'
            if listCache
                deferred.resolve listCache
            else
                $wpApiPosts.$getList query
                .then (response) ->
                    response.isPaginationOver = (response.data.length is 0 or response.data.length < $WPHCConfig.posts.posts_per_page)
                    getCache().put 'list-' + hash, response
                    deferred.resolve response
                .catch (error) ->
                    deferred.reject error
            deferred.promise
