module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .factory '$WPHCSocialSharing', ($log, $WPHCConfig, $ionicPlatform, $cordovaSocialSharing, $cordovaToast, $filter) ->
        $log.info 'cordova socialsharing'

        share: (platform, title, link) ->
            promise = null
            message = title
            switch platform
                when "twitter"
                    promise = $cordovaSocialSharing.shareViaTwitter message, null, link
                when "facebook"
                    promise = $cordovaSocialSharing.shareViaFacebook message, null, link
                when "native"
                    promise = $cordovaSocialSharing.share message, null, null, link

            if promise
                promise.then ->
                    $cordovaToast.showLongBottom($filter('translate') 'sharing.shared')
                .catch ->
                    $cordovaToast.showLongBottom($filter('translate') 'error')
