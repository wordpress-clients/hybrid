module.exports = angular.module 'wordpress-hybrid-client.menu'
    .factory '$WPHCMenu', ($log, $WPHCConfig) ->
        $log.info '$WPHCMenu'
        getWordpress: () ->
            $WPHCConfig.menu.wordpress || []
        getSocial: () ->
            $WPHCConfig.menu.social || []
        getSocialByPlatform: ->
            platforms = {}
            platforms[item.platform] = item for item in @getSocial()
            return platforms
