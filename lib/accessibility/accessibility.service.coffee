module.exports = angular.module('wordpress-hybrid-client.accessibility')
    .factory '$WPHCAccessibility', ($log, $WPHCConfig, $document) ->
        $log.info '$WPHCAccessibility'
        fontSize: localStorage.getItem("fontSize") || $WPHCConfig.settings.parameters.defaultFontSize

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
            "small" :
                trans : "fontSize.small"
                value: "small"
                order: 0
            "medium" :
                trans : "fontSize.medium"
                value: "medium"
                order: 1
            "large" :
                trans : "fontSize.large"
                value: "large"
                order: 2
            "x-large" :
                trans : "fontSize.x-large"
                value: "x-large"
                order: 3
            "xx-large" :
                trans : "fontSize.xx-large"
                value: "xx-large"
                order: 4
