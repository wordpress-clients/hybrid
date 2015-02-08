require 'masonry/masonry'

module.exports = angular.module('masonry').directive 'masonry', ($log, $timeout) ->
    restrict: 'A'
    scope:
        options: '@'
        bindResize: '='
    controller: ($scope, $element) ->
        $log.info 'masonry controller'
        options = angular.extend
            itemSelector: $element[0].querySelector('.card')
            , angular.fromJson($scope.options)

        $scope.masonry = new Masonry $element[0], options

        @getMasonryInstance = ->
            $scope.masonry

        update = () ->
            $log.info 'masonry update'
            $element.css 'height', 0
            $scope.masonry.reloadItems()
            $scope.masonry.layout()
            $element.children(options.itemSelector).css 'visibility', 'visible'

        @update = ionic.debounce update, 250

        $scope.$on '$destroy', () ->
            $scope.masonry.destroy()

        $scope.$watch 'bindResize', (value, oldValue) ->
            if value is true
                update() if oldValue is false
                $scope.masonry.bindResize()
            else
                $scope.masonry.unbindResize()
