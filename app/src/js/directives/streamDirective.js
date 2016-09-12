
radioApp.directive('stream', (playService, $rootScope) => {
    return {
        restrict: 'A',
        link: ($scope, elem, attrs )=>{
            elem.bind('click', function () {
                playService.stationClicked(attrs.id)
                $rootScope.buttonStatus = 'pause';
                $('.currentStation').removeClass('currentStation');
                $(this).parent('div').addClass('currentStation');
            });

        }
    }
});
