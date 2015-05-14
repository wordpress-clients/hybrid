module.exports = angular.module('wordpress-hybrid-client.about').config ($WPHCConfig, $stateProvider, $WPHCMenuProvider) ->
    if $WPHCConfig.menu.settings.about.enabled
        $stateProvider
        .state 'public.about',
            url: "/about"
            views:
                'content':
                    template: require "./about.html"
                    controller: "WPHCAboutController as about"
        $WPHCMenuProvider.addMenuSetting 'about.title', 'public.about', 'icon ion-information'
