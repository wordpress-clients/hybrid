module.exports = angular.module 'wordpress-hybrid-client.menu'
    .provider '$WPHCMenu', ($WPHCConfig) ->
        settings = []

        addMenuSetting : (translation, href, icon) ->
            settings.push
              trans: translation
              uiSref: href
              icon: icon

        $get : ->
            getSettings: ->
                settings
            getWordpress: () ->
                $WPHCConfig.menu.wordpress || []
            getSocial: () ->
                $WPHCConfig.menu.social || []
            getSocialByPlatform: ->
                platforms = {}
                platforms[item.platform] = item for item in @getSocial()
                return platforms
