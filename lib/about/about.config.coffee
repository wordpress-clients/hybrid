module.exports = angular.module('wordpress-hybrid-client.about').config ($stateProvider, $WPHCMenuProvider) ->
    $stateProvider
    .state 'public.about',
        url: "/about"
        views:
            'content':
                template: require "./about.html"
                controller: "WPHCAboutController as about"

    $WPHCMenuProvider.addMenuSetting 'about.title', 'public.about', 'icon ion-information'
