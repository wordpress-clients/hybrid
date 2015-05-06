module.exports = angular.module('wordpress-hybrid-client.menu').controller 'WPHCMenuController', ($log, $scope, $WPHCMenu ) ->
    $log.info 'WPHCMenuController'
    vm = @
    vm.hasSocial = undefined
    vm.getWordpress = ->
        $WPHCMenu.getWordpress()
    vm.hasSocial = ->
        vm.hasSocial = if $WPHCMenu.getSocial().length then true else false
    vm.getSocial = ->
        $WPHCMenu.getSocial()

    return vm
