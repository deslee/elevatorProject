'use strict';

angular.module('elevatorproject-main', ['ngRoute', 'es_module'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main/main.html',
                controller: 'MainCtrl'
            });
    })
    .controller('MainCtrl', function ($scope, es_models) {
        angular.extend($scope, es_models);

        $scope.selectedElevator = es_models.elevators[0];

        $scope.floorStyle = {
            height: '-webkit-calc(' + 100 / es_models.floors.length + '%' + ' - 1px)'
        };

        $scope.getElevatorStyle = function (elevator) {
            return {
                bottom: 100 / es_models.floors.length * elevator.floor + '%',
                height: 100 / es_models.floors.length + '%',
                left: '-webkit-calc(' + 100 / es_models.elevators.length * elevator.id + '% + ' + (25 / es_models.elevators.length) + '%)'
            }
        };

        $scope.clicked = function (elevator) {
            $scope.selectedElevator = elevator;
        };

        $scope.controlFloor = function (form) {
            var elevator = $scope.selectedElevator;
            elevator.floor += .1;
            console.log(elevator);
        };

    });
