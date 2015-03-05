module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaGoogleAnalytics) ->
        if !$WPHCConfig.analytics or !$WPHCConfig.analytics.trackingId
            return
        if !ionic.Platform.isWebView()
            return
        $log.info 'cordova analytics'

        $cordovaGoogleAnalytics.debugMode() if $WPHCConfig.debugEnabled
        $cordovaGoogleAnalytics.startTrackerWithId $WPHCConfig.analytics.trackingId
        $cordovaGoogleAnalytics.trackView('Home Screen')
