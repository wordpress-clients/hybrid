module.exports = angular.module('wordpress-hybrid-client.params').config ($WPHCConfig, $stateProvider, $WPHCMenuProvider) ->
    if $WPHCConfig.menu.settings.parameters.enabled
        $stateProvider
        .state 'public.params',
            url: "/params"
            views:
                'content':
                    template: require "./params.html"
                    controller: "WPHCParamsController as params"
        $WPHCMenuProvider.addMenuSetting 'params.title', 'public.params', 'icon ion-gear-b'
