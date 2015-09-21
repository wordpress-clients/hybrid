module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcComments', ($log) ->
    restrict: 'E'
    transclude: false
    replace: true
    scope:
        postId: "@"
    template: require './comments.html'
    bindToController: true
    controllerAs: 'commentsCtrl'
    controller: ($log, $scope, $element, $WPHCPost, $WPHCConfig) ->
        vm = @
        vm.postId = parseInt vm.postId
        vm.comments = null
        depth = _.get($WPHCConfig, 'post.comments.depth') || 2
        $WPHCPost.getComments vm.postId
            .then (comments) ->
                if !comments.lenght
                    vm.comments = []
                commentsTemp = []
                for comment in comments by -1
                    commentsTemp[comment.ID] = comment
                    comment.children = []
                    if comment.parent is 0
                        comment.level = 1
                        vm.comments.push comment
                    else
                        parent = commentsTemp[comment.parent]
                        comment.level = parent.level + 1
                        continue if depth is parent.level
                        parent.children.push comment
                $log.debug 'wphcComments:comments', vm.comments
        return @
