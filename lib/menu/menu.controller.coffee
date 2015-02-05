module.exports = angular.module('wordpress-hybrid-client.menu').controller 'WPHCMenuController', ($log, $scope, $WPHCMenu) ->
    $log.info 'WPHCMenuController'
    vm = @
    vm.test = 'test'
    vm.getWordpress = () ->
        $WPHCMenu.getWordpress()
    vm.getSocial = () ->
        $log.debug $WPHCMenu.getSocial(), '$WPHCMenu.getSocial()'
        $WPHCMenu.getSocial()

    return vm
