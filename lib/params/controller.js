export default function($log, $scope, $WPHCAccessibility, $WPHCLanguage) {
    'ngInject';

    let vm = this;
    vm.fontSize = $WPHCAccessibility.getFontSizeList();
    vm.changeFontSize = changeFontSize;
    vm.changeLanguage = changeLanguage;
    vm.languages = $WPHCLanguage.getLanguagesList();
    vm.selected = {
        fontSize: $WPHCAccessibility.getFontSize(),
        language: $WPHCLanguage.getLocale()
    };

    function changeFontSize() {
        $log.info('changing fontSize to: ' + vm.selected.fontSize);
        $WPHCAccessibility.setFontSize(vm.selected.fontSize);
    };

    function changeLanguage() {
        $log.info('changing language to: ' + vm.selected.language);
        $WPHCLanguage.setLocale(vm.selected.language);
    };
}
