export default function($stateProvider) {
    'ngInject';

    $stateProvider.state('public.search', {
        url: "/search/:query",
        views: {
            'content': {
                template: require("./index.html"),
                controller: "WPHCSearchController as searchCtrl"
            }
        }
    });
}
