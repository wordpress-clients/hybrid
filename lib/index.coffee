require 'hammerjs'
require 'angular'
require 'angular-animate'
require 'angular-sanitize'
require 'angular-aria'
require 'angular-material/angular-material'
require 'angular-ui-router'
require 'ionic/js/ionic'
require 'ionic/js/ionic-angular'

require 'wp-api-angularjs/dist/wp-api-angularjs.bundle'

# Style entry point
require './scss/bootstrap'
require 'angular-material/angular-material.css'

# Create namespace
window.WPHC = {}

module.exports = app = angular.module 'wordpress-hybrid-client', [
  'ionic'
  'ngMaterial'
  'ui.router'
  'wp-api-angularjs'
  require('./home/home.module').name
  require('./menu/menu.module').name
]

app.config ($stateProvider) ->
    $stateProvider
    .state 'public',
    url: "/public"
    abstract: true
    views:
        '@' :
            template: require "./views/menu"
            controller: "WPHCMainController as main"
        'menu@public':
            template: require "./menu/menu.html"
            controller: "WPHCMenuController as menu"

app.config (WpApiProvider, CONF) ->
    RestangularProvider = WpApiProvider.getRestangularProvider()
    RestangularProvider.setBaseUrl(CONF.ApiBaseUrl)
    RestangularProvider.setRestangularFields
        id: "ID"

app.controller 'WPHCMainController', require "./main.controller"

app.directive 'wphcLoader', require "./directives/loader/loader.coffee"

config = require "../config"

app.constant 'CONF', angular.extend config, WPHC.config || {}
