###
@ngdoc directive
@name wordpress - hybrid - client: wphcPost
@restrict E
@description
Display a post
@example
       < pre >
</pre >
###
module.exports = ($log) ->
    restrict: 'E'
    transclude: true
    replace: true
    scope:
        post: "="
        layout: '='
    template: require './post.html'
