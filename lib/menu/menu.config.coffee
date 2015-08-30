module.exports = angular.module('wordpress-hybrid-client.menu').config ($stateProvider) ->
    $stateProvider.decorator 'views', (state, parent) ->
        views = parent state
        if state.name is 'public'
            views['menu@public'] =
                template: require "./menu.html"
                controller: 'WPHCMenuController as menu'
        views
