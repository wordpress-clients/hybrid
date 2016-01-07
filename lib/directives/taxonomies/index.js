export default function() {
    return {
        restrict: 'E',
        replace: true,
        bindToController: true,
        controller: Controller,
        controllerAs: 'taxonomiesDirCtrl',
        scope: {
            taxonomies: "=",
            term: '=',
            postType: '=',
            onClick: "&"
        },
        template: `
            <div ng-include="'directive/taxonomies.html'"></div>
        `
    };

    function Controller($scope, $element, $attrs, $stateParams) {
        'ngInject';

        var vm = this;
        vm.isCurrentState = (slug) => ($stateParams.term === $scope.term && $stateParams.slug === slug);
        vm.triggerOnClick = (taxonomy) => {
            console.log('click', taxonomy, vm.onClick)
            if (_.isFunction(vm.onClick) && !vm.isCurrentState(taxonomy.slug)) {
                return vm.onClick();
            }
        }
    }
}
