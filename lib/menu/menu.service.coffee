module.exports = angular.module('wordpress-hybrid-client.menu').factory '$WPHCMenu', ($log, $WPHCConfig) ->
    $log.info '$WPHCMenu'
    getList: () ->
        $WPHCConfig.menu
