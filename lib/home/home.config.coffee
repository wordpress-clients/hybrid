module.exports = ($stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state 'public.home',
        url: "/home"
        views:
            'menuContent':
                template: require "./home"
                controller: "WPHCHomeController as home"
                # controllerAs: "home"

    $urlRouterProvider.otherwise('/public/home') ;
