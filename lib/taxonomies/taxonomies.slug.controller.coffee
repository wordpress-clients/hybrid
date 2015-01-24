module.exports = ($log, $scope, $wpApiPosts, $state) ->
    $log.info 'WPHCTaxonomiesSlugController'

    vm = @
    vm.list = undefined

    $scope.$on '$ionicView.loaded', () ->
        # if the slug is empty we redirect to the list
        if $state.params.slug is ''
            $state.go 'public.taxonomies'

        filter = {}
        if $state.params.term is 'post_tag'
            filter.tag = $state.params.slug
        else if $state.params.term is 'category'
            filter.category_name = $state.params.slug

        $wpApiPosts.$getList filter
        .then (response) ->
            vm.list = response.data
        .catch () ->
            $log.debug 'posts error'
    return @
