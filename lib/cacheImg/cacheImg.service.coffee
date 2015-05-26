module.exports = angular.module 'wordpress-hybrid-client.cacheImg'
    .service 'CacheImages', ($q) ->
        checkCacheStatus: (src) ->
            deferred = $q.defer()
            ImgCache.isCached src, (path, success) ->
                if success
                    deferred.resolve path
                else
                ImgCache.cacheFile src, ->
                    ImgCache.isCached src, (path, success) ->
                        deferred.resolve path
                        return
                    , deferred.reject
                    return
                , deferred.reject
                return
            , deferred.reject
            deferred.promise
