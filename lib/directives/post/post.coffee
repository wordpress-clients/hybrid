require "./post.filter"
module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcPost', ($log) ->
    restrict: 'E'
    transclude: true
    replace: true
    scope:
        post: "="
        layout: '='
    template: require './post.html'
