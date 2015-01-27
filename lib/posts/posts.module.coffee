module.exports = app = angular.module 'wordpress-hybrid-client.posts', [
    'wp-api-angularjs'
]

require "./posts.service.coffee"
require './posts.controller'
