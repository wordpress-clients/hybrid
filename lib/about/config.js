export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.about', {
            url: "/about",
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/about.html'),
                    controller: "WPHCAboutController as aboutCtrl"
                }
            }
        });
}
