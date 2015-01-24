module.exports = ($log, $WPHCConfig) ->
    $log.info '$WPHCMenu'
    getList: () ->
        $WPHCConfig.menu
