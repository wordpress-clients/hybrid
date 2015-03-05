module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaNetwork) ->
        if !ionic.Platform.isWebView()
            return
        $log.info 'cordova network information'

        $log.debug $cordovaNetwork.getNetwork(), 'network information'
