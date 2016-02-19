export default class {
    constructor($injector, $q, $WPHCConfig, $log, $state, $http, $filter, WpApi) {
        'ngInject';
        this.$q = $q;
        this.WpApi = WpApi;
        this.$log = $log;
        this.$state = $state;
        this.$filter = $filter;
        this.$http = $http;
        this.$WPHCConfig = $WPHCConfig;
        this.token = null;
        this.os = null;
        this.androidConfig = _.get($WPHCConfig, 'cordova.pushNotifications.android');
        this.iosConfig = _.get($WPHCConfig, 'cordova.pushNotifications.ios');

        if (ionic.Platform.isAndroid()) {
            this.os = 'Android';
        } else if (ionic.Platform.isIOS()) {
            this.os = 'iOS';
        } else if (ionic.Platform.isWindowsPhone()) {
            this.os = 'Windows';
        }
    }

    hasPermission() {
        let deferred = this.$q.defer();
        PushNotification.hasPermission((response) => {
            let isEnabled = false;
            if (response.isEnabled) {
                isEnabled = true;
            }
            deferred.resolve(isEnabled);
        });
        return deferred.promise;
    }

    init() {
        this.hasPermission().then((hasPermission) => {
            this.$log.info('[pushNotifications] hasPermission?', hasPermission);
            if (!hasPermission) {
                return;
            }
            this.$log.debug('[pushNotifications] init', this.androidConfig, this.iosConfig);
            var push = PushNotification.init({
                android: this.androidConfig,
                ios: this.iosConfig
            });

            push.on('registration', (data) => {
                this.$log.debug('[pushNotifications] registrationId', data.registrationId);
                this.token = data.registrationId;
                this.registerWebService(data.registrationId)
                    .then(() => this.$log.info('[pushNotifications] registered!'))
                    .catch(() => this.$log.info('[pushNotifications] register failed!'));
            });

            push.on('notification', (data) => {
                this.$log.debug('[pushNotifications] notification data', data);

                if (data.additionalData.foreground) {
                    this.confirmNewContent(data.additionalData.id, data.message);
                } else {
                    this.openPost(data.additionalData.id);
                }
                if (ionic.Platform.isIOS()) {
                    push.setApplicationIconBadgeNumber(() => this.$log.debug('[pushNotifications] badge number ok!'), () => this.$log.debug('[pushNotifications] badge number error!'), data.count);
                }
            });

            push.on('error', function(error) {
                this.$log.debug('[pushNotifications] error registering', error);
            });
        });
    }

    unregister() {
        let deferred = this.$q.defer();
        PushNotification.unregister(() => deferred.resolve(), () => deferred.reject());
        return deferred.promise;
    }

    registerWebService(token) {
        var baseUrl = _.get(this.$WPHCConfig, 'cordova.pushNotifications.baseUrl');
        if (!baseUrl) {
            return this.$q.reject();
        }
        return this.$http({
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
                os: this.os,
                token: token
            }
        });
    };

    openPost(postId) {
        let baseUrl = this.WpApi.getBaseUrl()
        this.$http.head(`${baseUrl}/posts/${postId}`, {
            params: {
                os: this.os,
                token: this.token
            }
        }).finally(() => {
            return this.$state.go('public.posts.id', {
                id: postId
            });
        });
    };

    confirmNewContent(postId, postMsg) {
        var buttonNo, buttonYes, text, title;
        title = this.$filter('translate')('pushNotifications.newContent.title');
        text = this.$filter('translate')('pushNotifications.newContent.text', {
            postTitle: postMsg,
            appTitle: _.get(this.$WPHCConfig, 'title' || '')
        });
        buttonYes = this.$filter('translate')('yes');
        buttonNo = this.$filter('translate')('no');
        return navigator.notification.confirm(text, (confirmation) => {
            if (confirmation === 1) {
                return this.openPost(postId);
            }
        }, title, [buttonYes, buttonNo]);
    };
}
