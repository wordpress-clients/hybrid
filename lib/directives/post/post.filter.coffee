module.exports = angular.module 'wordpress-hybrid-client.directives'
    .filter 'prepLink', ->
        return (text) ->
            element = angular.element '<div></div>'
            element.append text
            all = angular.element(element[0].querySelectorAll 'a[href]')
            # anchors = angular.element(element[0].querySelectorAll 'a[href^="#"]')
            # notAnchors = angular.element(element[0].querySelectorAll 'a[href]:not([href^="#"])')
            all.attr 'wphc-href', ''
            element.html()
