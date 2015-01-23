module.exports = app = angular.module 'wordpress-hybrid-client.menu', []

app.controller 'WPHCMenuController', require "./menu.controller.coffee"
app.factory '$WPHCMenu', require "./menu.service.coffee"
