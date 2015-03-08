require 'angulartics/src/angulartics'
require 'angulartics/src/angulartics-ga'

module.exports = app = angular.module 'wordpress-hybrid-client.analytics', [
    require('../config').name
    'angulartics'
    'angulartics.google.analytics'
]

app.run ($log, $WPHCConfig, $cordovaGoogleAnalytics) ->
    if !$WPHCConfig.analytics or !$WPHCConfig.analytics.trackingId
        return
    if !ionic.Platform.isWebView()
        return
        $log.info 'cordova analytics'

        $cordovaGoogleAnalytics.debugMode() if $WPHCConfig.debugEnabled
        $cordovaGoogleAnalytics.startTrackerWithId $WPHCConfig.analytics.trackingId
        $cordovaGoogleAnalytics.trackView('Home Screen')

require './analytics.config'
