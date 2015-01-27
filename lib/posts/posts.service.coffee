module.exports = angular.module('wordpress-hybrid-client.posts').factory '$WPHCPosts', ($log, $wpApiPosts, $q, $WPHCConfig) ->
    $log.info '$WPHCPosts'
    getQuery: (page) ->
        page: page
        "filter[posts_per_page]": $WPHCConfig.posts.posts_per_page
        "filter[orderby]": $WPHCConfig.posts.orderby
        "filter[order]": $WPHCConfig.posts.order
        "filter[post_status]": $WPHCConfig.posts.post_status
    getList: (query) ->
        $wpApiPosts.$getList query
        .then (response) ->
            deferred = $q.defer()
            response.isPaginationOver = (response.data.length is 0 or response.data.length < $WPHCConfig.posts.posts_per_page)
            deferred.resolve response
            return deferred.promise
