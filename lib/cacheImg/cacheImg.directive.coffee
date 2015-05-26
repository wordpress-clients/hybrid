module.exports = angular.module 'wordpress-hybrid-client.cacheImg'
    .directive 'wphcImgCache', ->
        restrict: 'A'
        link: (scope, el, attrs) ->
            attrs.$observe 'ngSrc', (src) ->
                ImgCache.isCached src, (path, success) ->
                    if success
                        ImgCache.useCachedFile el
                    else
                        ImgCache.cacheFile src, ->
                            ImgCache.useCachedFile el
