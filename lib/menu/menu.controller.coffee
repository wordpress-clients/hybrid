module.exports = angular.module('wordpress-hybrid-client.menu').controller 'WPHCMenuController', ($log, $scope, $WPHCMenu, $state, $ionicSideMenuDelegate) ->
    $log.info 'WPHCMenuController'
    vm = @
    vm.searchQuery = ''
    vm.hasSocial = undefined
    vm.clearSearch = ->
        $ionicSideMenuDelegate.toggleLeft()
        vm.searchQuery = ''
    vm.search = ->
        if (vm.searchQuery)
            $ionicSideMenuDelegate.toggleLeft()
            $state.go 'public.search',
                search: vm.searchQuery
    vm.getWordpress = ->
        $WPHCMenu.getWordpress()
    vm.hasSocial = ->
        vm.hasSocial = if $WPHCMenu.getSocial().length then true else false
    vm.getSocial = ->
        $WPHCMenu.getSocial()

    return vm
