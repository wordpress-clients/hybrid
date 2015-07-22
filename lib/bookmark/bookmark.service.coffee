md5 = require 'MD5'
moment = require 'moment'

module.exports = angular.module('wordpress-hybrid-client.bookmark')
    .factory '$WPHCBookmark', ($log, $q, $WPHCConfig, CacheFactory, $cordovaToast, $filter, $window) ->
        $log.info '$WPHCBookmark'
        getCache = () ->
            hash = md5 $WPHCConfig.api.baseUrl
            if CacheFactory.get 'bookmark-' + hash
                return CacheFactory.get 'bookmark-' + hash
            cacheOptions = angular.extend _.get($WPHCConfig, 'bookmark.cache') || {},
                maxAge: Number.MAX_VALUE
            CacheFactory 'bookmark-' + hash, cacheOptions

        isBookmarked: (post) ->
            list = getCache().get 'list'
            test = _.findWhere list,
                ID: post.ID
            test?

        toggle: (post) ->
            isBookmarked = @isBookmarked post
            if isBookmarked then @remove post else @add post
            !isBookmarked

        remove: (post) ->
            list = getCache().get 'list'
            _.remove list,
                ID: post.ID
            getCache().put 'list', list
            $cordovaToast.showShortBottom($filter('translate') 'bookmark.removed') if _.get $window, 'plugins.toast'

        add : (post) ->
            post.bookmarked = moment().format()
            list = getCache().get('list') || []
            list.unshift post
            getCache().put 'list', list
            $cordovaToast.showShortBottom($filter('translate') 'bookmark.bookmarked') if _.get $window, 'plugins.toast'

        getList: () ->
            deferred = $q.defer()
            listCache = getCache().get 'list'
            if listCache
                deferred.resolve listCache
            else
                deferred.resolve []
            deferred.promise
