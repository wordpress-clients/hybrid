module.exports = angular.module('wordpress-hybrid-client.params').config ($WPHCConfig, $stateProvider) ->
    $stateProvider
    .state 'public.params',
        url: "/params"
        views:
            'content':
                template: require "./params.html"
                controller: "WPHCParamsController as params"
