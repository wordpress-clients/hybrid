export default function($stateProvider) {
    'ngInject';

    $stateProvider.state('public.authors', {
        url: "/authors",
        views: {
            'content': {
                template: require("./index.html"),
                controller: "WPHCAuthorsController as authorsCtrl"
            }
        }
    });
}
