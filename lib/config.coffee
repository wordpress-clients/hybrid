config = if IS_PROD then require "../config.prod" else require "../config"
# Create namespace
window.WPHC = {}

module.exports = app = angular.module 'wordpress-hybrid-client.config', []

app.constant '$WPHCConfig', angular.extend config, WPHC.config || {}
