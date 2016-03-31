export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.authors', {
            url: "/authors",
            class: 'module-authors',
            views: {
                'content': {
                    template: require("./authors.html"),
                    controller: "WPHCAuthorsController as authorsCtrl"
                }
            }
        }).state('public.authors.id', {
            url: "/:id",
            class: 'module-authors-<%=id%>',
            views: {
                'content@public': {
                    template: require("./author.html"),
                    controller: "WPHCAuthorController as postsCtrl"
                }
            }
        });
}
