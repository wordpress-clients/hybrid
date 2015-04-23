module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaStatusbar, $ionicPlatform) ->
        $log.info 'cordova statusbar'

        $ionicPlatform.ready () ->
            if $WPHCConfig.cordova.statubar.show
                $cordovaStatusbar.show()
            else
                $cordovaStatusbar.hide()
