module.exports = app = angular.module 'wordpress-hybrid-client.post', []

app.config require './post.config'

app.controller 'WPHCPostController', require './post.controller'
