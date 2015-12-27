export default function() {
    return {
        bindToController: true,
        replace: false,
        controller: Controller,
        controllerAs: 'customPostsCtrl',
        restrict: 'E',
        scope: {
            list: '=customPosts',
            type: '@'
        },
        template: `
            <div ng-include="customPostsCtrl.templateUrl" ng-if="customPostsCtrl.type"></div>
        `
    };

    function Controller($scope, $templateCache) {
        'ngInject';

        var vm = this;
        vm.templateUrl = `customPosts/${vm.type}.html`;

        if (!$templateCache.get(vm.templateUrl)) {
            throw new Error(`Template ${vm.templateUrl} does not exist`);
        }
    }
}
