module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaSplashscreen) ->
        $log.info 'cordova splashscreen'

        $cordovaSplashscreen.hide()
