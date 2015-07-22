module.exports = angular.module('wordpress-hybrid-client.about').config ($WPHCConfig, $stateProvider, $WPHCMenuProvider) ->
    $stateProvider
    .state 'public.about',
        url: "/about"
        views:
            'content':
                template: require "./about.html"
                controller: "WPHCAboutController as about"
