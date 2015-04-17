module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaStatusbar) ->
        $log.info 'cordova statusbar'

        if $WPHCConfig.cordova.statubar.show
            $cordovaStatusbar.show()
        else
            $cordovaStatusbar.hide()
