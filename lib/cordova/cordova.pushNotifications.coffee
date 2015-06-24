module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaPush, $rootScope, $http, $filter, $state, $q, $ionicPlatform) ->
        $log.info 'cordova push notifications'

        if !_.get $WPHCConfig, 'cordova.pushNotifications.enabled'
            return

        androidConfig = _.get $WPHCConfig, 'cordova.pushNotifications.android'
        iosConfig = _.get $WPHCConfig, 'cordova.pushNotifications.ios'

        if !androidConfig && !iosConfig
            return

        openPost = (postId) ->
            $state.go 'public.post',
                id : postId

        confirmNewContent = (postId , postMsg) ->
            title = $filter('translate') 'pushNotifications.newContent.title'
            text = $filter('translate') 'pushNotifications.newContent.text',
                postTitle: postMsg
                appTitle: _.get $WPHCConfig, 'title' || ''
            buttonYes = $filter('translate') 'yes'
            buttonNo = $filter('translate') 'no'
            navigator.notification.confirm text, (confirmation) ->
                openPost postId if confirmation is 1
            , title, [buttonYes, buttonNo]

        register = (os ,token) ->
            baseUrl = _.get $WPHCConfig, 'cordova.pushNotifications.baseUrl'
            return $q.reject() if !baseUrl

            $http
                method: 'POST'
                url: baseUrl + '/register'
                headers: 'Content-Type': 'application/x-www-form-urlencoded'
                transformRequest: (obj) ->
                    str = []
                    for p of obj
                        str.push encodeURIComponent(p) + '=' + encodeURIComponent(obj[p])
                    str.join '&'
                data:
                    os: os
                    token: token

        $ionicPlatform.ready () ->
            if ionic.Platform.isAndroid()
                $cordovaPush.register(androidConfig).then (result) ->
                    $log.debug('android push notification registration success', result);
                    return
                , (err) ->
                    $log.error('android push notification registration error', err);
                    return
                $rootScope.$on '$cordovaPush:notificationReceived', (event, notification) ->
                    switch notification.event
                        when 'registered'
                            return if !notification.regid.length
                            $log.debug 'registration ID', notification.regid
                            register('Android', notification.regid).success ->
                                $log.info 'Push notif Token stored'
                            break
                        when 'message'
                            $log.debug 'Push notif message', notification
                            if notification.foreground
                                confirmNewContent notification.payload.id, notification.payload.message
                            else
                                openPost notification.payload.id
                            break
                        when 'error'
                            $log.debug 'Push notif error', notification
                            break
                    return
            else if ionic.Platform.isIOS()
                $cordovaPush.register(iosConfig).then (deviceToken) ->
                    register('iOS', deviceToken).success ->
                        $log.info 'Push notif Token stored'
                    $log.debug('iOS push notification registration success', deviceToken);
                    return
                , (err) ->
                    $log.error('iOS push notification registration error', err);
                    return
                $rootScope.$on '$cordovaPush:notificationReceived', (event, notification) ->
                    $log.debug 'Push notif message', notification
                    if notification.alert
                        if notification.foreground
                            confirmNewContent notification.id, notification.alert
                        else
                            openPost notification.id
                    if notification.badge
                        $cordovaPush.setBadgeNumber(notification.badge).then (result) ->
                            $log.debug 'Push notif badge ok', result
                            return
                        , (err) ->
                            $log.debug 'Push notif badge error', err
                            return

        , false
