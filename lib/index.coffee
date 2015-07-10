# Create namespace
window.WPHC = window.WPHC || {}

require 'angular'
require 'angular-animate'
require 'angular-sanitize'
require 'angular-aria'
require 'angular-ui-router'
require 'angular-translate'
require 'angular-cache'
require 'angular-moment'
require 'angular-filter'
require 'angular-performance-stats'
require 'ionic-sdk/release/js/ionic'
require 'ionic-sdk/release/js/ionic-angular'
require 'moment'
require './font/font.coffee'

# lodash is a restangular dependency that is bundled in wp-api-angularjs.bundle
require 'expose?_!lodash'
require 'wp-api-angularjs/dist/wp-api-angularjs.bundle'

# Style entry point
require './scss/bootstrap'

module.exports = app = angular.module 'wordpress-hybrid-client', [
    'ionic'
    require('./config').name
    'angular-performance-stats'
    'ui.router'
    'wp-api-angularjs'
    'pascalprecht.translate'
    'angular-cache'
    'angularMoment'
    'angular.filter'
    require('./taxonomies/taxonomies.module').name
    require('./post/post.module').name
    require('./posts/posts.module').name
    require('./search/search.module').name
    require('./menu/menu.module').name
    require('./cordova/cordova.module').name
    require('./params/params.module').name
    require('./about/about.module').name
    require('./language/language.module').name
    require('./accessibility/accessibility.module').name
    require('./cacheImg/cacheImg.module').name
    require('./syntaxHighlighter/syntaxHighlighter.module').name
    require('./init/init.module').name
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
app.config ($WPHCConfig, $logProvider, $compileProvider) ->
    debugEnabled = _.get($WPHCConfig, 'debugEnabled') || false
    $logProvider.debugEnabled debugEnabled
    $compileProvider.debugInfoEnabled debugEnabled

###
IONIC CONF
###
app.config ($WPHCConfig, $ionicConfigProvider) ->
    $ionicConfigProvider.views.maxCache _.get($WPHCConfig, 'cache.views') || 10
    $ionicConfigProvider.views.forwardCache _.get($WPHCConfig, 'cache.forward') || false
    $ionicConfigProvider.scrolling.jsScrolling false

###
REST CONF
###
app.config ($WPHCConfig, WpApiProvider, $ionicConfigProvider) ->
    RestangularProvider = WpApiProvider.getRestangularProvider()
    RestangularProvider.setDefaultHttpFields
        timeout: _.get($WPHCConfig, 'api.timeout') || 5000
    RestangularProvider.setBaseUrl _.get($WPHCConfig, 'api.baseUrl') || null
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
app.config ($translateProvider, $WPHCLanguageProvider) ->
    languages = $WPHCLanguageProvider.getLanguages()
    for i, language of languages
        $translateProvider.translations language, require './translations/' + language

    $translateProvider
        .preferredLanguage $WPHCLanguageProvider.getPreferedLanguage()
        .registerAvailableLanguageKeys languages, $WPHCLanguageProvider.getLanguagesMapping()
        .fallbackLanguage 'en'
        .useSanitizeValueStrategy 'escape'

###
CACHE CONF
###
app.config ($WPHCConfig, CacheFactoryProvider) ->
    angular.extend(CacheFactoryProvider.defaults, _.get($WPHCConfig, 'cache.data') || {})

###
MEMORY STATS CONF
###
app.config ($WPHCConfig, angularPerformanceStatsProvider, $compileProvider) ->
    $compileProvider.debugInfoEnabled _.get($WPHCConfig, 'debugEnabled') || false
    angularPerformanceStatsProvider.enable false

###
MAIN CONTROLLER
###
app.controller 'WPHCMainController' , ($log, $WPHCConfig) ->
    $log.info 'main controller'

    vm = @
    vm.exposeAsideWhen = _.get($WPHCConfig, 'menu.exposeAsideWhen') || 'large'
    vm.appVersion = wordpressHybridClient.version || null
    vm.appConfig = $WPHCConfig
    vm.appTitle = vm.appConfig.title || null
    vm

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
app.run ($rootScope, $log, $WPHCConfig, $translate, $WPHCLanguage, $ionicPlatform, $WPHCAccessibility, $cordovaSplashscreen, angularPerformanceStats, $WPHCInit) ->
    $rootScope.appLoaded = undefined

    # handling debug events
    if $WPHCConfig.debugEnabled
        $rootScope.$on '$stateNotFound', (event, unfoundState, fromState, fromParams) ->
            $log.info '$stateNotFound', unfoundState
        $rootScope.$on '$stateChangeError', (event, toState, toParams, fromState, fromParams, error) ->
            $log.info '$stateChangeError', error

    $WPHCAccessibility.updateBodyClass()
    angularPerformanceStats.run()

    $ionicPlatform.ready () ->
        $WPHCInit.init().finally ()->
            $rootScope.appLoaded = true;
            # For web debug
            if !ionic.Platform.isWebView()
                $translate.use $WPHCLanguage.getLocale()
            else
                $cordovaSplashscreen.hide()

    # Clean up appLoading
    # angular.element(document.querySelector 'html').removeClass 'app-loading'
    # angular.element(document.querySelector '#appLoaderWrapper').remove()
