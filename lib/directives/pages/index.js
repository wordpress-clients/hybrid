export default function() {
    return {
        bindToController: true,
        replace: false,
        controller: Controller,
        controllerAs: 'pagesCtrl',
        restrict: 'E',
        scope: {
            pages: '='
        },
        template: `
            <div ng-include="'directive/pages.html'"></div>
        `
    };

    function Controller($log, $scope, $WPHCPost) {
        'ngInject';

        var vm = this;
        vm.featureImages = [];

        $scope.$watchCollection('pagesCtrl.pages', function(newValue, oldValue) {
            if (!newValue) {
                return;
            }
            _.each(newValue, function(page) {
                if (vm.featureImages[page.id]) {
                    return;
                }
                $WPHCPost.getFeatureImage(page.featured_image).then(function(image) {
                    if (!image) {
                        return;
                    }
                    return vm.featureImages[page.id] = image.media_details.sizes.medium.source_url;
                });
            });
        });

    }
}
