export default function() {
    return {
        bindToController: true,
        replace: false,
        controller: Controller,
        controllerAs: 'pageCtrl',
        restrict: 'E',
        scope: {
            page: '='
        },
        template: `
            <div ng-include="'directive/page.html'"></div>
        `
    };

    function Controller($log, $scope, $WPHCPost) {
        'ngInject';

        var vm = this;
        vm.featured_image = undefined;
        $WPHCPost.getFeatureImage(vm.page.featured_image).then((image) => {
            if (image) {
                vm.featured_image = image.media_details.sizes.medium.source_url;
            }
        });
    }
}
