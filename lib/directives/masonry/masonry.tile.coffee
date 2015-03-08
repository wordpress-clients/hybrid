imagesLoaded = require 'imagesloaded'

module.exports = angular.module('masonry').directive 'masonryTile', ($log) ->
    restrict: 'AC'
    require: '^masonry'
    link: (scope, element, attrs, parentCtrl) ->
        element.css 'visibility', 'hidden'

        masonry = parentCtrl.getMasonryInstance()
        update = parentCtrl.update
        appendBricks = parentCtrl.appendBricks

        element.ready () ->
            # if scope.post.featured_image and scope.post.featured_image.is_image
            #     img = element[0].querySelector('.item-image > img')
            #     imgLoad = imagesLoaded img
            #     imgLoad.on 'done', () ->
            #         $log.info 'masonryTile img done'
            #         masonry.appended element[0]
            #         update()
            # else
            $log.info 'masonryTile el ready'
            masonry.appended element[0]
            update()

        scope.$on '$destroy', () ->
            $log.info 'masonryTile destroy'
            masonry.remove element[0]
            update()
