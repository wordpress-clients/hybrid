module.exports = angular.module('wordpress-hybrid-client.bookmark')
    .controller 'WPHCBookmarkController', ($log, $scope, $WPHCBookmark) ->
        $log.info 'WPHCBookmarkController'
        loadPosts = ->
            $WPHCBookmark.getList().then (posts) ->
                vm.posts = posts
        vm = @
        vm.posts = []
        vm.remove = (post) ->
            $WPHCBookmark.remove post
            loadPosts()
        $scope.$on '$ionicView.enter', ->
            loadPosts()
        return @
