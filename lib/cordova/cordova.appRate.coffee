module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .config ($cordovaAppRateProvider, $WPHCConfig) ->
        document.addEventListener "deviceready", () ->
            $cordovaAppRateProvider.setPreferences $WPHCConfig.cordova.appRate
        , false
