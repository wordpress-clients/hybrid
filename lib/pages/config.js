export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.pages', {
            url: "/pages",
            views: {
                'content': {
                    template: require("./pages.html"),
                    controller: "WPHCPagesController as pagesCtrl"
                }
            }
        }).state('public.pages.id', {
            url: "/:id",
            views: {
                'content@public': {
                    template: require("./page.html"),
                    controller: "WPHCPageController as pageCtrl"
                }
            }
        });
}
