module.exports = angular.module 'wordpress-hybrid-client.language'
    .provider '$WPHCLanguage', ($WPHCConfig, $translateProvider) ->

        languages = []
        languagesTranslated = {}
        languagesMapping = {}

        # init provider
        for language, mapping of $WPHCConfig.translation.available
            languages.push language
            languagesTranslated[language] = 'languages.' + language
            angular.extend languagesMapping, mapping

        getPreferedLanguage = ->
            $WPHCConfig.translation.prefered

        getLanguages = ->
            languages

        getLanguagesMapping = ->
            languagesMapping

        getPreferedLanguage : getPreferedLanguage
        getLanguages : getLanguages
        getLanguagesMapping: getLanguagesMapping

        $get : (amMoment) ->
            locale: localStorage.getItem("locale") || 'en'
            getPreferedLanguage : getPreferedLanguage
            getLanguages : getLanguages
            getLanguagesMapping: getLanguagesMapping
            getLanguagesList : ->
                languagesTranslated
            hasLocale: ->
                localStorage.getItem "locale"
            getLocale: ->
                @locale
            setLocale: (@locale) ->
                localStorage.setItem "locale", @locale
                $translateProvider.use @locale
                amMoment.changeLocale @locale
