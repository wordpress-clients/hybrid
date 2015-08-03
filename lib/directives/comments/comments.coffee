module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcComments', ($log) ->
    restrict: 'E'
    transclude: false
    replace: true
    scope:
        postId: "@"
    template: require './comments.html'
    bindToController: true
    controllerAs: 'commentsCtrl'
    controller: ($log, $scope, $element, $WPHCPost) ->
        vm = @
        vm.postId = parseInt vm.postId
        vm.comments = []
        $WPHCPost.getComments vm.postId
            .then (comments) ->
                commentsTemp = []
                for comment in comments by -1
                    if comment.parent is 0
                        comment.children = []
                        commentsTemp[comment.ID] = comment
                        vm.comments.push comment
                    else
                        parent = commentsTemp[comment.parent]
                        parent.children.push comment
                # delete commentsTemp
                $log.debug 'wphcComments:comments', vm.comments
