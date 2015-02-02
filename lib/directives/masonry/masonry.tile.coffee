imagesLoaded = require 'imagesloaded'

module.exports = angular.module('masonry').directive 'masonryTile', ($log) ->
    restrict: 'A'
    # require: '^masonry',
    link: (scope, elem) ->
        elem.css 'visibility', 'hidden'
        master = elem.parent('*[masonry]:first').scope()
        update = master.update
        removeBrick = master.removeBrick
        appendBricks = master.appendBricks

        $log.debug elem.get(0), 'elem.get(0)'

        imgLoad = imagesLoaded elem.get(0)
        # if update
        #     imgLoad.on 'done', update
        #     # imagesLoaded elem.get(0), update
        #     elem.ready update
        # if appendBricks
        #     imgLoad.on 'done', () ->
        #         appendBricks(elem)
            # imagesLoaded elem.get(0), appendBricks(elem)

        scope.$on '$destroy', () ->
            removeBrick() if (typeof removeBrick is 'function')
