module.exports = angular.module 'wordpress-hybrid-client.about'
    .controller 'WPHCAboutController', ($log, $scope) ->
        vm = @
        vm.content = require "../../about.md"
