
radioApp.directive('stream', (playService) => {
    return {
        restrict: 'A',
        link: ($scope, elem, attrs )=>{
            elem.bind('click', function () {
                playService.stationClicked(attrs.id)
                $('.currentStation').removeClass('currentStation');
                $(this).parent('div').addClass('currentStation');
            });

        }
    }
});
