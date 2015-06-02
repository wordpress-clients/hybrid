module.exports = angular.module 'wordpress-hybrid-client.language'
    .run ($WPHCConfig, $WPHCLanguage) ->
        # We use Cordova's plugin to determine the locale when on webView
        if !ionic.Platform.isWebView()
            if $WPHCLanguage.hasLocale()
                $WPHCLanguage.setLocale $WPHCLanguage.getLocale()
            else
                $WPHCLanguage.setLocale $WPHCLanguage.getPreferedLanguage()
