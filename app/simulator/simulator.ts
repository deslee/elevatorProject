/**
 * Created by desmond on 8/24/2014.
 */
module Simulator {
    declare var angular;

    var options = {
        numElevators: 4,
        numFloors: 20
    };

    class SimulatedObject {
        public id: number;
        constructor(id: number) {
            this.id = id;
        }
    }

    class Floor extends SimulatedObject {
        constructor(id: number) {
            super(id);
        }
    }

    class Elevator extends SimulatedObject {
        public floor: number;
        constructor(id: number) {
            super(id);
            this.floor = 0;
        }
    }

    var floors : Floor[] = [];
    for (var i = 0; i < options.numFloors; i++) {
        floors[i] = new Floor(i);
    }

    var elevators : Elevator[] = [];
    for (var i = 0; i < options.numElevators; i++) {
        elevators[i] = new Elevator(i);
    }

    angular.module('es_module', []).constant('es_models', {
        floors: floors,
        elevators: elevators
    });
}