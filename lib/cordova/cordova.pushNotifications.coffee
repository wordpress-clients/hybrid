module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaPush, $rootScope) ->
        $log.info 'cordova push notifications'

        if !_.get $WPHCConfig, 'cordova.pushNotifications.enabled'
            return

        androidConfig = _.get $WPHCConfig, 'cordova.pushNotifications.android'
        iosConfig = _.get $WPHCConfig, 'cordova.pushNotifications.ios'

        if !androidConfig && !iosConfig
            return

        document.addEventListener "deviceready", () ->
            ###
            # ANDROID
            ###
            $cordovaPush.register(androidConfig).then (result) ->
                $log.debug('android push notification registration success', result);
                return
            , (err) ->
                $log.debug('android push notification registration error', err);
                return
            $rootScope.$on '$cordovaPush:notificationReceived', (event, notification) ->
                console.log('push notif', notification);
                switch notification.event
                    when 'registered'
                        if notification.regid.length > 0
                            alert 'registration ID = ' + notification.regid
                    when 'message'
                        # this is the actual push notification. its format depends on the data model from the push server
                        alert 'message = ' + notification.message + ' msgCount = ' + notification.msgcnt
                    when 'error'
                        alert 'GCM error = ' + notification.msg
                    else
                        alert 'An unknown GCM event has occurred'
                        break
                return
        , false
