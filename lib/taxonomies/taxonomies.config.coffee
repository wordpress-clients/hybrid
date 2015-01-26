module.exports = ($stateProvider) ->
    $stateProvider
    # .state 'public.taxonomies',
    #     url: "/taxonomies"
    #     abstract: true
    .state 'public.taxonomies',
        url: "/taxonomies/:term"
        views:
            'content@public':
                template: require "./taxonomies"
                controller: "WPHCTaxonomiesController as taxonomies"
    .state 'public.taxonomies.slug',
        url: "/:slug"
        views:
            'content@public':
                template: require "../posts/posts.html"
                controller: "WPHCTaxonomiesPostsController as posts"
