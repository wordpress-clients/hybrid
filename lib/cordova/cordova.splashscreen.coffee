module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaSplashscreen) ->
        if !ionic.Platform.isWebView()
            return
        $log.info 'cordova splashscreen'

        $cordovaSplashscreen.show()
