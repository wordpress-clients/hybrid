
module.exports = angular.module('wordpress-hybrid-client').directive 'bindAndCompileHtml', ($compile) ->
    restrict: 'A'
    link: (scope, element, attrs) ->
        scope.$watch attrs.bindAndCompileHtml, (newValue, oldValue) ->
            element.html newValue
            $compile(element.contents())(scope)
