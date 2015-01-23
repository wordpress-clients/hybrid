module.exports = ($log, $WPHCConfig) ->
    $log.info '$WPHCMenu'
    getList: () ->
        $log.debug $WPHCConfig.menu, '$WPHCConfig.menu'
        $WPHCConfig.menu
