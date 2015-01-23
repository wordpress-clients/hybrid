module.exports = ($log, $scope, $WPHCMenu) ->
    $log.info 'WPHCMenuController'
    vm = @
    vm.test = 'test'
    vm.getMenu = () ->
        $WPHCMenu.getList()

    return vm
