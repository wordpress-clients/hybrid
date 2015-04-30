md5 = require 'MD5'

module.exports = angular.module('wordpress-hybrid-client.post').factory '$WPHCPost', ($log, $wpApiPosts, $q, $WPHCConfig, CacheFactory) ->
    $log.info '$WPHCPost'

    getCache = () ->
        if CacheFactory.get 'post'
            return CacheFactory.get 'post'
        CacheFactory 'post', $WPHCConfig.post.cache

    get: (id) ->
        deferred = $q.defer()
        hash = md5 $WPHCConfig.api.baseUrl + id
        itemCache = getCache().get 'item-' + hash
        $log.debug 'Post cache', itemCache
        if itemCache
            deferred.resolve itemCache
        else
            $wpApiPosts.$get id
            .then (response) ->
                getCache().put 'item-' + hash, response
                deferred.resolve response
            .catch (error) ->
                deferred.reject error
        deferred.promise
