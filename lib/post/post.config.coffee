module.exports = ($stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state 'public.post',
        url: "/post/:id"
        views:
            'content':
                template: require "./post"
                controller: "WPHCPostController as post"
                resolve:
                    post : ($wpApiPosts, $stateParams) ->
                        $wpApiPosts.$get $stateParams.id
