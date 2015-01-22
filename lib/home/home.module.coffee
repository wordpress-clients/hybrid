module.exports = app = angular.module 'wordpress-hybrid-client.home', []

app.config require './home.config'

app.controller 'WPHCHomeController', require './home.controller'
