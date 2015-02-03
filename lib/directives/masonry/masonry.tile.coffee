imagesLoaded = require 'imagesloaded'

module.exports = angular.module('masonry').directive 'masonryTile', ($log) ->
    restrict: 'AC'
    require: '^masonry'
    link: (scope, element, attrs, parentCtrl) ->
        $log.debug scope, 'masonryTile scope'
        element.css 'visibility', 'masonryTile hidden'

        masonry = parentCtrl.getMasonryInstance()
        update = parentCtrl.update
        appendBricks = parentCtrl.appendBricks

        if scope.post.featured_image.is_image
            img = element[0].querySelector('.item-image > img')
            imgLoad = imagesLoaded img
            imgLoad.on 'done', update
        else
            element.ready update

        scope.$on '$destroy', () ->
            removeBrick() if (typeof removeBrick is 'function')
