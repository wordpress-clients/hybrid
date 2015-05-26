require 'angular'
require 'angular-animate'
require 'angular-sanitize'
require 'angular-aria'
require 'angular-ui-router'
require 'angular-translate'
require 'angular-cache'
require 'angular-moment'
require 'angular-filter'
require 'angular-memory-stats'
require 'ionic/js/ionic'
require 'ionic/js/ionic-angular'
require 'moment'
require './font/font.coffee'

require 'wp-api-angularjs/dist/wp-api-angularjs.bundle'

# Style entry point
require './scss/bootstrap'

module.exports = app = angular.module 'wordpress-hybrid-client', [
  'ionic'
  require('./config').name
  'angular-memory-stats'
  'ui.router'
  'wp-api-angularjs'
  'pascalprecht.translate'
  'angular-cache'
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
    $ionicConfigProvider.views.forwardCache $WPHCConfig.cache.forward
    $ionicConfigProvider.scrolling.jsScrolling false

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
app.config ($translateProvider, $WPHCLanguageProvider) ->
    languages = $WPHCLanguageProvider.getLanguages()
    for i, language of languages
        $translateProvider.translations language, require './translations/' + language

    $translateProvider
        .preferredLanguage $WPHCLanguageProvider.getPreferedLanguage()
        .registerAvailableLanguageKeys languages, $WPHCLanguageProvider.getLanguagesMapping()
        .fallbackLanguage 'en'

###
CACHE CONF
###
app.config ($WPHCConfig, CacheFactoryProvider) ->
    angular.extend(CacheFactoryProvider.defaults, $WPHCConfig.cache.data)

###
MEMORY STATS CONF
###
app.config ($WPHCConfig, angularMemoryStatsProvider, $compileProvider) ->
    $compileProvider.debugInfoEnabled $WPHCConfig.debugEnabled
    angularMemoryStatsProvider.enable $WPHCConfig.debugEnabled

###
MAIN CONTROLLER
###
app.controller 'WPHCMainController' , ($log, $WPHCConfig) ->
    $log.info 'main controller'

    vm = @
    vm.exposeAsideWhen = $WPHCConfig.menu.exposeAsideWhen || 'large'
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
app.run ($rootScope, $log, $WPHCConfig, $translate, $WPHCLanguage, $ionicPlatform, $WPHCAccessibility, $cordovaSplashscreen) ->

    # handling debug events
    if $WPHCConfig.debugEnabled
        $rootScope.$on '$stateNotFound', (event, unfoundState, fromState, fromParams) ->
            $log.info '$stateNotFound', unfoundState
        $rootScope.$on '$stateChangeError', (event, toState, toParams, fromState, fromParams, error) ->
            $log.info '$stateChangeError', error

    $WPHCAccessibility.updateBodyClass()

    $ionicPlatform.ready () ->
        # For web debug
        if !ionic.Platform.isWebView()
            $translate.use $WPHCLanguage.getLocale()
        else
            $cordovaSplashscreen.hide()

    # Clean up appLoading
    angular.element(document.querySelector 'html').removeClass 'app-loading'
    angular.element(document.querySelector '#appLoaderWrapper').remove()
