module.exports = app = angular.module 'wordpress-hybrid-client.posts', [
    'wp-api-angularjs'
]

# app.config require './post.config'

app.factory '$WPHCPosts', require "./posts.service.coffee"
app.controller 'WPHCPostsController', require './posts.controller'
