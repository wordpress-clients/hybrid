module.exports = angular.module('wordpress-hybrid-client.menu').controller 'WPHCMenuController', ($log, $scope, $WPHCMenu ) ->
    $log.info 'WPHCMenuController'
    vm = @
    vm.hasSocial = undefined
    vm.hasSettings = undefined
    vm.getWordpress = ->
        $WPHCMenu.getWordpress()
    vm.hasSocial = ->
        vm.hasSocial = $WPHCMenu.getSocial().length?
    vm.hasSettings = ->
        vm.hasSettings = $WPHCMenu.getSettings().length?
    vm.getSettings = ->
        $WPHCMenu.getSettings()
    vm.getSocial = ->
        $WPHCMenu.getSocial()

    return vm
