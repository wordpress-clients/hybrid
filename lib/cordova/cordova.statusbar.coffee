module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaStatusbar) ->
        if !ionic.Platform.isWebView()
            return
        $log.info 'cordova statusbar'

        if $WPHCConfig.cordova.statubar.show
            $cordovaStatusbar.show()
        else
            $cordovaStatusbar.hide()
