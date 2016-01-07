module.exports = angular.module('wordpress-hybrid-client.cordova')
    .run(($log, $WPHCConfig, $ionicPlatform, $state, $http, $filter, $q, WpApi) => {
        'ngInject';

        $log.info('[pushNotifications]');

        if (!_.get($WPHCConfig, 'cordova.pushNotifications.enabled')) {
            $log.info('[pushNotifications] disabled');
            return;
        }

        let token = null;
        let os = null;
        if (ionic.Platform.isAndroid()) {
            os = 'Android';
        } else if (ionic.Platform.isIOS()) {
            os = 'iOS';
        } else if (ionic.Platform.isWindowsPhone()) {
            os = 'Windows';
        }

        $ionicPlatform.ready(() => {
            let androidConfig = _.get($WPHCConfig, 'cordova.pushNotifications.android');
            let iosConfig = _.get($WPHCConfig, 'cordova.pushNotifications.ios');

            $log.debug('[pushNotifications] init', androidConfig, iosConfig);
            var push = PushNotification.init({
                android: androidConfig,
                ios: iosConfig
            });

            push.on('registration', (data) => {
                $log.debug('[pushNotifications] registrationId', data.registrationId);
                token = data.registrationId;
                register(data.registrationId).then(() => $log.debug('[pushNotifications] registered!'));
            });

            push.on('notification', (data) => {
                $log.debug('[pushNotifications] notification data', data);

                if (data.additionalData.foreground) {
                    confirmNewContent(data.additionalData.id, data.message);
                } else {
                    openPost(data.additionalData.id);
                }
                if (ionic.Platform.isIOS()) {
                    push.setApplicationIconBadgeNumber(() => $log.debug('[pushNotifications] badge number ok!'), () => $log.debug('[pushNotifications] badge number error!'), data.count);
                }
            });

            push.on('error', function(error) {
                $log.debug('[pushNotifications] error registering', error);
            });
        });

        function openPost(postId) {
            let baseUrl = WpApi.getBaseUrl()
            $http.head(`${baseUrl}/posts/${postId}`, {
                params: {
                    os: os,
                    token: token
                }
            }).finally(() => {
                return $state.go('public.posts.id', {
                    id: postId
                });
            });
        };

        function confirmNewContent(postId, postMsg) {
            var buttonNo, buttonYes, text, title;
            title = $filter('translate')('pushNotifications.newContent.title');
            text = $filter('translate')('pushNotifications.newContent.text', {
                postTitle: postMsg,
                appTitle: _.get($WPHCConfig, 'title' || '')
            });
            buttonYes = $filter('translate')('yes');
            buttonNo = $filter('translate')('no');
            return navigator.notification.confirm(text, function(confirmation) {
                if (confirmation === 1) {
                    return openPost(postId);
                }
            }, title, [buttonYes, buttonNo]);
        };

        function register(token) {
            var baseUrl = _.get($WPHCConfig, 'cordova.pushNotifications.baseUrl');
            if (!baseUrl) {
                return $q.reject();
            }
            return $http({
                method: 'POST',
                url: baseUrl + '/register',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var p, str;
                    str = [];
                    for (p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                },
                data: {
                    os: os,
                    token: token
                }
            });
        };
    });
