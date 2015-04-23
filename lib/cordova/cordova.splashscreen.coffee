module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaSplashscreen, $ionicPlatform) ->
        $log.info 'cordova splashscreen'

        $ionicPlatform.ready () ->
            $cordovaSplashscreen.hide()
