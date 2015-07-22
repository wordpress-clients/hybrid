module.exports = angular.module('wordpress-hybrid-client.menu').controller 'WPHCMenuController', ($log, $scope, $WPHCMenu ) ->
    $log.info 'WPHCMenuController'
    vm = @
    vm.list = $WPHCMenu.getList()
    return vm
