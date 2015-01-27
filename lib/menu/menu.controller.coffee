module.exports = angular.module('wordpress-hybrid-client.menu').controller 'WPHCMenuController', ($log, $scope, $WPHCMenu) ->
    $log.info 'WPHCMenuController'
    vm = @
    vm.test = 'test'
    vm.getMenu = () ->
        $WPHCMenu.getList()

    return vm
