module.exports = ($log, $scope, $WPHCMenu) ->
    $log.info 'WPHCMenuController'
    vm = @
    vm.getMenu = $WPHCMenu.getList()

    return vm
