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
        template: require('./index.html')
    };

    function Controller($log, $scope, $WPHCPost) {
        'ngInject';

        var vm = this;
    }
}
