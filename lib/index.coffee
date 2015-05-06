require 'angular'
require 'angular-animate'
require 'angular-sanitize'
require 'angular-aria'
require 'angular-ui-router'
require 'angular-translate'
require 'angular-cache'
require 'angular-moment'
require 'angular-memory-stats'
require 'ionic/js/ionic'
require 'ionic/js/ionic-angular'
require 'moment'

require 'wp-api-angularjs/dist/wp-api-angularjs.bundle'

# Style entry point
require './scss/bootstrap'

# App loader
# require '!file?name=css/[name].css!autoprefixer!sass!./appLoader/appLoader.scss'
# require '!file?name=js/[name].js!./appLoader/appLoader.js'

module.exports = app = angular.module 'wordpress-hybrid-client', [
  'ionic'
  require('./config').name
  'angular-memory-stats'
  'ui.router'
  'wp-api-angularjs'
  'pascalprecht.translate'
  'angular-cache'
  require('./taxonomies/taxonomies.module').name
  require('./post/post.module').name
  require('./posts/posts.module').name
  require('./menu/menu.module').name
  require('./cordova/cordova.module').name
]

app.config ($stateProvider) ->
    $stateProvider
    .state 'public',
    url: "/public"
    abstract: true
    views:
        '@' :
            template: require "./views/ion-menu.html"
            controller: "WPHCMainController as main"
        'menu@public':
            template: require "./menu/menu.html"
            controller: "WPHCMenuController as menu"

###
ANGULAR CONF
###
app.config ($WPHCConfig, $logProvider) ->
    $logProvider.debugEnabled $WPHCConfig.debugEnabled

###
IONIC CONF
###
app.config ($WPHCConfig, $ionicConfigProvider) ->
    $ionicConfigProvider.views.maxCache $WPHCConfig.cache.views

###
REST CONF
###
app.config ($WPHCConfig, WpApiProvider, $ionicConfigProvider) ->
    RestangularProvider = WpApiProvider.getRestangularProvider()
    RestangularProvider.setDefaultHttpFields
        timeout: $WPHCConfig.api.timeout
    RestangularProvider.setBaseUrl $WPHCConfig.api.baseUrl
    RestangularProvider.setFullResponse true
    RestangularProvider.addResponseInterceptor (data, operation, what, url, response, deferred) ->
        data.wpApiHeaders =
            total: response.headers 'X-WP-Total'
            pages: response.headers 'X-WP-TotalPages'
        data
    RestangularProvider.setRestangularFields
        id: "ID"

###
TRANSLATION CONF
###
app.config ($WPHCConfig, $translateProvider) ->
    languages = []
    languagesMapping = {}
    for language, mapping of $WPHCConfig.translation.available
        languages.push language
        angular.extend languagesMapping, mapping
        $translateProvider.translations language, require './translations/' + language

    $translateProvider
        .preferredLanguage $WPHCConfig.translation.prefered
        .registerAvailableLanguageKeys languages, languagesMapping
        .fallbackLanguage 'en'
        .determinePreferredLanguage()

###
CACHE CONF
###
app.config ($WPHCConfig, CacheFactoryProvider) ->
    angular.extend(CacheFactoryProvider.defaults, $WPHCConfig.cache.data)

###
MEMORY STATS CONF
###
app.config ($WPHCConfig, angularMemoryStatsProvider, $compileProvider) ->
    if $WPHCConfig.env is 'prod'
        $compileProvider.debugInfoEnabled false
        angularMemoryStatsProvider.enable false

###
STYLE CONF
###
app.config ($WPHCConfig) ->
    if $WPHCConfig.style.googleFont
        window.WebFontConfig =
            google:
                families: $WPHCConfig.style.googleFont.families
        wf = document.createElement 'script'
        wf.src = if 'https:' == document.location.protocol then 'https' else 'http'
        wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'
        wf.type = 'text/javascript'
        wf.async = 'true'
        s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore wf, s
        document.body.style.fontFamily = $WPHCConfig.style.googleFont.fontFamily

###
MAIN CONTROLLER
###
app.controller 'WPHCMainController' , ($log, $WPHCConfig) ->
    $log.info 'main controller'

    vm = @
    vm.exposeAsideWhen = $WPHCConfig.menu.exposeAsideWhen || 'large'

###
DIRECTIVES
###
require "./directives/bindAndCompileHtml/bindAndCompileHtml.coffee"
require "./directives/taxonomies/taxonomies.coffee"
require "./directives/emptyList/emptyList.coffee"
require "./directives/inputEsc/inputEsc.coffee"
require "./directives/hideWhen/hideWhen.coffee"
require "./directives/showWhen/showWhen.coffee"
require "./directives/loader/loader.coffee"
require "./directives/posts/posts.coffee"
require "./directives/post/post.coffee"
require "./directives/href/href.coffee"

###
RUN
###
app.run ($rootScope, $log, $WPHCConfig) ->

    # handling debug events
    if $WPHCConfig.debugEnabled
        $rootScope.$on '$stateNotFound', (event, unfoundState, fromState, fromParams) ->
            $log.info '$stateNotFound', unfoundState
        $rootScope.$on '$stateChangeError', (event, toState, toParams, fromState, fromParams, error) ->
            $log.info '$stateChangeError', error

    # Clean up appLoading
    angular.element(document.querySelector 'html').removeClass 'app-loading'
    angular.element(document.querySelector '#appLoaderWrapper').remove()
