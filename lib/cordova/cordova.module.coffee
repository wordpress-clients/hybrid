require 'ng-cordova'

module.exports = app = angular.module 'wordpress-hybrid-client.cordova', [
    require('../config').name
    'ngCordova'
]

require './cordova.statusbar'
require './cordova.splashscreen'
require './cordova.network-information'
