require 'angular'
require 'angular-animate'
require 'angular-sanitize'
require 'angular-aria'
require 'angular-material/angular-material'
require 'angular-ui-router'
require 'angular-translate'
require 'angular-cache'
require 'angular-moment'
require 'ionic/js/ionic'
require 'ionic/js/ionic-angular'
require 'moment'
require 'imagesloaded/imagesloaded.pkgd'
require 'masonry/masonry'
require 'angular-masonry-directive/src/angular-masonry-directive.js'

require 'wp-api-angularjs/dist/wp-api-angularjs.bundle'

# Style entry point
require './scss/bootstrap'
require 'angular-material/angular-material.css'

# App loader
require '!file?name=css/[name].css!autoprefixer!sass!./appLoader/appLoader.scss'
require '!file?name=js/[name].js!./appLoader/appLoader.js'

# Create namespace
window.WPHC = {}

module.exports = app = angular.module 'wordpress-hybrid-client', [
  'ionic'
  'ngMaterial'
  'ui.router'
  'masonry'
  'wp-api-angularjs'
  'pascalprecht.translate'
  'angular-data.DSCacheFactory'
  require('./home/home.module').name
  require('./taxonomies/taxonomies.module').name
  require('./post/post.module').name
  require('./posts/posts.module').name
  require('./menu/menu.module').name
]

app.config ($stateProvider) ->
    $stateProvider
    .state 'public',
    url: "/public"
    abstract: true
    views:
        '@' :
            templateUrl: require "./views/ion-menu.html"
            controller: "WPHCMainController as main"
        'menu@public':
            templateUrl: require "./menu/menu.html"
            controller: "WPHCMenuController as menu"

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
app.config ($WPHCConfig, DSCacheFactoryProvider) ->
    DSCacheFactoryProvider.setCacheDefaults $WPHCConfig.cache.data

###
PALETTE CONF
###
app.config ($WPHCConfig, $mdThemingProvider) ->
    $mdThemingProvider.definePalette 'WPHCPalette', $WPHCConfig.palette
    $mdThemingProvider
    .theme('default')
    .primaryColor('WPHCPalette')

###
CONTROLLERS
###
app.controller 'WPHCMainController' , ($log) ->
    $log.info 'main controller'

###
DIRECTIVES
###
require "./directives/loader/loader.coffee"
require "./directives/posts/posts.coffee"
require "./directives/post/post.coffee"
require "./directives/taxonomies/taxonomies.coffee"

###
CONSTANTS
###
config = require "../config"
app.constant '$WPHCConfig', angular.extend config, WPHC.config || {}


###
RUN
###
app.run () ->
    # Clean up appLoading
    angular.element(document.querySelector 'html').removeClass 'app-loading'
    angular.element(document.querySelector '#appLoaderWrapper').remove()
