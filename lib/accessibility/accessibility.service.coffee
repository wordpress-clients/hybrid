module.exports = angular.module('wordpress-hybrid-client.accessibility')
    .factory '$WPHCAccessibility', ($log, $WPHCConfig, $document) ->
        $log.info '$WPHCAccessibility'
        fontSize: localStorage.getItem("fontSize") || $WPHCConfig.menu.settings.parameters.defaultFontSize

        setFontSize: (@fontSize) ->
            $log.info 'setting font size', @fontSize
            localStorage.setItem "fontSize", @fontSize
            @updateBodyClass()

        updateBodyClass : ->
            classes = ''
            for key of @getFontSizeList()
                classes += ' font-' + key
            angular.element $document[0].body
                .removeClass classes
                .addClass 'font-' + @fontSize

        getFontSize: ->
            return @fontSize

        getFontSizeList : ->
            "small" : "fontSize.small"
            "medium" : "fontSize.medium"
            "large" : "fontSize.large"
            "x-large" : "fontSize.x-large"
            "xx-large" : "fontSize.xx-large"
