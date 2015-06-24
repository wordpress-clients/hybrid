module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .config ($cordovaAppRateProvider, $WPHCConfig) ->
        if !_.get $WPHCConfig, 'cordova.appRate.enabled'
            return

        document.addEventListener "deviceready", () ->
            $cordovaAppRateProvider.setPreferences $WPHCConfig.cordova.appRate
        , false
