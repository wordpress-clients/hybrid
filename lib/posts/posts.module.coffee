module.exports = angular.module 'wordpress-hybrid-client.posts', [
    'wp-api-angularjs'
]

require "./posts.config.coffee"
require "./posts.service.coffee"
require './posts.controller'
