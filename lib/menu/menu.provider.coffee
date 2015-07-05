module.exports = angular.module 'wordpress-hybrid-client.menu'
    .provider '$WPHCMenu', ($WPHCConfig) ->

        $get : ->
            getList: ->
                _.get($WPHCConfig, 'menu.list') || []
