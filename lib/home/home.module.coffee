module.exports = app = angular.module 'wordpress-hybrid-client.home', [
    'ui.router'
]

app.config require './home.config'
