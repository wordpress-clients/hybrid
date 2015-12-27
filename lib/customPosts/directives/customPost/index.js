export default function() {
    return {
        bindToController: true,
        replace: false,
        controller: Controller,
        controllerAs: 'customPostCtrl',
        restrict: 'E',
        scope: {
            item: '=customPost',
            type: '@'
        },
        template: `
            <div ng-include="customPostCtrl.templateUrl" ng-if="customPostCtrl.type"></div>
        `
    };

    function Controller($scope, $templateCache) {
        'ngInject';

        var vm = this;
        vm.templateUrl = `customPost/${vm.type}.html`;

        if (!$templateCache.get(vm.templateUrl)) {
            throw new Error(`Template ${vm.templateUrl} does not exist`);
        }
    }
}
