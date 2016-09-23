
radioApp.directive('stream', (playService,
                              $rootScope,
                              mediaService) => {
    return {
        restrict: 'A',
        link: ($scope, elem, attrs )=>{
          // ele is the element the directive applied to
          // attrs are the attributes the element has
            elem.bind('click', function () {
                playService.stationClicked(attrs);
                $rootScope.buttonStatus = 'pause';
                $('.currentStation').removeClass('currentStation');
                $(this).parent('div').addClass('currentStation');
            });
            // when routing, activate the playing station
            mediaService.updateActiveStation(elem, attrs.id);
        }
    }
});
