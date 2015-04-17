module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaNetwork) ->
        $log.info 'cordova network information'

        $log.debug $cordovaNetwork.getNetwork(), 'network information'
