module.exports = app = angular.module 'wordpress-hybrid-client.search', [
    'wp-api-angularjs'
]

require "./search.config.coffee"
require "./search.controller.coffee"
require "./search.service.coffee"
