module.exports = angular.module 'wordpress-hybrid-client.language'
    .provider '$WPHCLanguage', ($WPHCConfig, $translateProvider) ->

        languages = []
        languagesTranslated = {}
        languagesMapping = {}

        # init provider
        for language in _.get $WPHCConfig, 'translation.displayed'
            languagesTranslated[language] = 'languages.' + language
            languages.push language
            angular.extend languagesMapping, _.get($WPHCConfig, 'translation.available.' + language)
        getPreferedLanguage = ->
            $WPHCConfig.translation.prefered

        getLanguages = ->
            languages

        getLanguagesMapping = ->
            languagesMapping

        getPreferedLanguage : getPreferedLanguage
        getLanguages : getLanguages
        getLanguagesMapping: getLanguagesMapping

        $get : (amMoment, $ionicConfig, $filter) ->
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
                $ionicConfig.backButton.text $filter('translate') 'back'
                # specific to chinese so far
                if @locale is 'zh'
                    amMoment.changeLocale 'zh-cn'
                else
                    amMoment.changeLocale @locale
