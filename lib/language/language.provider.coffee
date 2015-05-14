module.exports = angular.module 'wordpress-hybrid-client.language'
    .provider '$WPHCLanguage', ($WPHCConfig, $translateProvider) ->
        locale = localStorage.getItem("locale") || 'en'
        languages = []
        languagesTranslated = {}
        languagesMapping = {}

        # init provider
        for language, mapping of $WPHCConfig.translation.available
            languages.push language
            languagesTranslated[language] = 'languages.' + language
            angular.extend languagesMapping, mapping

        getLanguages : ->
            languages

        getLanguagesMapping : ->
            languagesMapping

        getPreferedLanguage : ->
            $WPHCConfig.translation.prefered

        $get : ->
            getLanguagesList : ->
                languagesTranslated
            hasLocale: ->
                localStorage.getItem("locale")
            getLocale: ->
                locale
            setLocale: (locale) ->
                localStorage.setItem "locale", locale
                locale = locale
                $translateProvider.use locale
