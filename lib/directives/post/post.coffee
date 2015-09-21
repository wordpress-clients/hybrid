require "./post.filter"
module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcPost', ($log) ->
    restrict: 'E'
    transclude: true
    replace: true
    scope:
        post: "="
        layout: '='
    template: require './post.html'
    bindToController: true
    controllerAs: 'postCtrl'
    controller: ($WPHCConfig) ->
        vm = @
        vm.enabled = _.get($WPHCConfig, 'post.comments.enabled')
        return @
