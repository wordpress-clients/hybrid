module.exports = angular.module('masonry').directive 'masonry', ($log, $timeout) ->
    restrict: 'A'
    link: (scope, elem, attrs) ->
        $log.debug scope, attrs, 'masonry scope attr'
        container = elem[0];
        options = angular.extend
            itemSelector: container.querySelector('.card')
            , angular.fromJson(attrs.masonry)

        masonry = scope.masonry = new Masonry(container, options) ;

        debounceTimeout = 0
        scope.update = () ->
            $timeout.cancel debounceTimeout if debounceTimeout
            debounceTimeout = $timeout () ->
                debounceTimeout = 0;
                masonry.reloadItems()
                masonry.layout()
                elem.children(options.itemSelector).css 'visibility', 'visible'
            , 120

        scope.removeBrick = () ->
            $timeout () ->
                masonry.reloadItems()
                masonry.layout()
            , 500

        scope.appendBricks = (ele) ->
            masonry.appended ele

        scope.$on 'masonry.layout', () ->
            masonry.layout()

        scope.update()

        scope.$watch 'isOn', (value, oldValue) ->
            $log.debug value, 'masonryBindResize'
            if (value is true) then masonry.bindResize() else masonry.unbindResize()
