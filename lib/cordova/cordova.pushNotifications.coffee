module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaPush, $rootScope, $http, $filter, $state, $q) ->
        $log.info 'cordova push notifications'

        if !_.get $WPHCConfig, 'cordova.pushNotifications.enabled'
            return

        androidConfig = _.get $WPHCConfig, 'cordova.pushNotifications.android'
        iosConfig = _.get $WPHCConfig, 'cordova.pushNotifications.ios'

        if !androidConfig && !iosConfig
            return

        confirmNewContent = (postId , postTitle) ->
            title = $filter('translate') 'pushNotifications.newContent.title'
            text = $filter('translate') 'pushNotifications.newContent.text',
                postTitle: postTitle
                appTitle: _.get $WPHCConfig, 'title' || ''
            buttonYes = $filter('translate') 'yes'
            buttonNo = $filter('translate') 'no'
            navigator.notification.confirm text, () ->
                $state.go 'public.post',
                    id : postId
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
                            confirmNewContent notification.payload.id, notification.payload.title
                        else
                            # notification.payload.id
                            # notification.payload.title
                        break
                    when 'error'
                        $log.debug 'Push notif error', notification
                        break
                return
        , false
