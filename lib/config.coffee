config = if IS_PROD then require "../config.prod" else require "../config"

module.exports = app = angular.module 'wordpress-hybrid-client.config', []

app.constant '$WPHCConfig', angular.extend config, WPHC.config || {}
