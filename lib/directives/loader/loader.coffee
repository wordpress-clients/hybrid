###
@ngdoc directive
@name wordpress - hybrid - client: wphcLoader
@restrict E
@description
A simple loader
</pre >
###
module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcLoader', ($log) ->
    restrict: 'E'
    transclude: true
    replace: true
    template: require './loader.html'
    scope:
        onLoad: "&"
    controller: ($scope, $element, $attrs, $state, $log, $WPHCConfig, $timeout) ->
        $scope.getContentHeight = ->
            return $element.parent().parent()[0].offsetHeight;
        $scope.promiseLoad = $attrs.onLoad?
        $log.info 'wphcLoader controller loaded', $scope.promiseLoad
        if !$scope.promiseLoad
            return
        onLoad = $scope.onLoad()
        $scope.attempt = 0
        $scope.attemptMax = $WPHCConfig.api.maxAttempt
        $scope.isAttemptMaxReached = false
        success = ->
            $log.info 'wphcLoader loaded'
            $scope.isLoaded = true
            $scope.attempt = 0
        error = ->
            $log.info 'wphcLoader not loaded'
            $scope.isLoaded = false

        $scope.load = (reInit = false) ->
            $log.info 'reinit load', reInit
            if reInit
                $scope.attempt = 0
                $scope.isAttemptMaxReached = false
            $log.info 'wphcLoader attempt: ' + $scope.attempt
            onLoad().then success
            .catch ->
                error()
                if $scope.attempt < $WPHCConfig.api.maxAttempt
                    # needed to see that we attempt, otherwise it is too quick
                    $timeout ->
                        $scope.attempt++;
                        $scope.load()
                    , 500
                else
                    $scope.isAttemptMaxReached = true

        $timeout ->
            $scope.load()
        , 500
