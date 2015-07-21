require "localforage"
require "angular-localforage"

module.exports = angular.module 'wordpress-hybrid-client.bookmark', [
    'LocalForageModule'
]

require "./bookmark.config.coffee"
require "./bookmark.service.coffee"
require './bookmark.controller'
