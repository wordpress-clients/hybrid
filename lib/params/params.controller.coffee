module.exports = angular.module 'wordpress-hybrid-client.params'
    .controller 'WPHCParamsController', ($log, $scope, $WPHCAccessibility, $WPHCLanguage) ->
        vm = @
        vm.fontSize = $WPHCAccessibility.getFontSizeList()
        vm.changeFontSize = ->
            $log.info 'changing fontSize to: ' + vm.selected.fontSize
            $WPHCAccessibility.setFontSize vm.selected.fontSize
            return
        vm.changeLanguage = ->
            $log.info 'changing language to: ' + vm.selected.language
            $WPHCLanguage.setLocale vm.selected.language
            return
        vm.languages = $WPHCLanguage.getLanguagesList()
        vm.selected =
            fontSize: $WPHCAccessibility.getFontSize(),
            language: $WPHCLanguage.getLocale()
        vm
