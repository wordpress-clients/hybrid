require 'angulartics/src/angulartics'
require 'angulartics/src/angulartics-ga'

module.exports = angular.module 'wordpress-hybrid-client.analytics', [
    require('../config').name
    'angulartics'
    'angulartics.google.analytics'
]

require './analytics.config'
