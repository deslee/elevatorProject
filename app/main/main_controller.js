'use strict';

angular.module('elevatorproject-main', ['ngRoute', 'es_services'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main/main.html',
                controller: 'MainCtrl'
            });
    })
    .controller('MainCtrl', function ($scope, Simulator, $interval) {
        var models = Simulator.models;
        angular.extend($scope, models);

        $scope.selectedElevator = models.elevators[0];
        $scope.floorStyle = {
            height: '-webkit-calc(' + 100 / models.floors.length + '%' + ' - 1px)'
        };
        $scope.getElevatorStyle = function (elevator) {
            return {
                //bottom: 100 / models.floors.length * (elevator.floor.id + elevator.transition/100) + '%',
                height: 100 / models.floors.length + 100 / models.floors.length * (elevator.floor.id + elevator.transition/100) + '%',
                //height: 100 / models.floors.length + '%',
                left: '-webkit-calc(' + 100 / models.elevators.length * elevator.id + '% + ' + (25 / models.elevators.length) + '%)'
            }
        };
        $scope.getPersonStyle = function(person) {
            var leftStyle = function() {
                if (person.state == 0) {
                    return person.transition + '%'
                }
            };
            return {
                bottom: 100 / models.floors.length * (person.floor.id) + '%',
                left: leftStyle()
            }
        };
        $scope.getPersonClass = function(person) {
          return ['state'+(Math.floor(person.transition) % 2 + 1), person.walkingDirection == -1 ? 'backwards' : 'forwards'];
        };

        $scope.clicked = function (elevator) {
            $scope.selectedElevator = elevator;
        };

        $scope.controlFloor = function (floor) {
            Simulator.dispatchElevatorToFloor($scope.selectedElevator, floor);
        };
    });
