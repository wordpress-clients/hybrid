module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .factory '$WPHCSocialSharing', ($log, $WPHCConfig, $WPHCMenu, $ionicPlatform, $cordovaSocialSharing, $cordovaToast, $filter) ->
        $log.info 'cordova socialsharing'

        share: (platform, title, link) ->
            promise = null
            socialAccounts = $WPHCMenu.getSocialByPlatform()
            message = title
            switch platform
                when "twitter"
                    if socialAccounts.twitter
                        message += ' via @' + socialAccounts.twitter.name
                    promise = $cordovaSocialSharing.shareViaTwitter message, null, link
                when "facebook"
                    if socialAccounts.facebook
                        message += ' via @' + socialAccounts.facebook.name
                    promise = $cordovaSocialSharing.shareViaFacebook message, null, link
                when "native"
                    promise = $cordovaSocialSharing.share message, null, null, link

            if promise
                promise.then ->
                    $cordovaToast.showLongBottom($filter('translate') 'sharing.shared')
                .catch ->
                    $cordovaToast.showLongBottom($filter('translate') 'error')
