export default function($stateProvider) {
    'ngInject';

    $stateProvider.state('public.pages', {
        url: "/pages",
        views: {
            'content': {
                template: require("./index.html"),
                controller: "WPHCPagesController as pagesCtrl"
            }
        }
    });
}
