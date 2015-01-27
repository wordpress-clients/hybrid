module.exports = angular.module('wordpress-hybrid-client.taxonomies').controller 'WPHCTaxonomiesPostsController', ($log, $scope, $controller, $WPHCTaxonomies, $state, $WPHCPosts) ->
    parent = $controller 'WPHCPostsController',
        $scope: $scope
    parent.title = $WPHCTaxonomies.getTitle $state.params.term, $state.params.slug
    parent.getQuery = () ->
        query = $WPHCPosts.getQuery parent.page
        if $state.params.term is 'post_tag'
            query["filter[tag]"] = $state.params.slug
        else if $state.params.term is 'category'
            query["filter[category_name]"] = $state.params.slug
        query
    return parent
