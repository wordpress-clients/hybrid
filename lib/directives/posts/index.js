export default function() {
    return {
        bindToController: true,
        transclude: true,
        replace: false,
        controller: Controller,
        controllerAs: 'postsCtrl',
        restrict: 'E',
        scope: {
            posts: "="
        },
        template: `
            <div ng-include="'directive/posts.html'"></div>
        `
    };

    function Controller($log, $scope, $WPHCPost, $attrs) {
        'ngInject';

        var vm = this;
        vm.featureImages = [];
        vm.showAuthor = typeof $attrs.showAuthor !== 'undefined';

        $scope.$watchCollection('postsCtrl.posts', function(newValue, oldValue) {
            if (!newValue) {
                return;
            }
            return _.each(newValue, function(post) {
                if (vm.featureImages[post.id]) {
                    return;
                }
                return $WPHCPost.getFeatureImage(post.featured_image).then(function(image) {
                    if (!image) {
                        return;
                    }
                    return vm.featureImages[post.id] = _.get(image, 'media_details.sizes.medium.source_url');
                });
            });
        });
    }
}
