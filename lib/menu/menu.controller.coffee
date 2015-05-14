module.exports = angular.module('wordpress-hybrid-client.menu').controller 'WPHCMenuController', ($log, $scope, $WPHCMenu ) ->
    $log.info 'WPHCMenuController'
    vm = @
    vm.getWordpress = ->
        $WPHCMenu.getWordpress()
    vm.hasSocial = ->
        if $WPHCMenu.getSocial().length then true else false
    vm.hasSettings = ->
        if $WPHCMenu.getSettings().length then true else false
    vm.getSettings = ->
        $WPHCMenu.getSettings()
    vm.getSocial = ->
        $WPHCMenu.getSocial()

    return vm
