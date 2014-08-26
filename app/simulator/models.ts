/**
 * Created by desmond on 8/24/2014.
 */
module Models {
    export enum Direction {
        up, down, stopped
    }
    export enum PersonState {
        onFloor, goingToElevator, onElevator
    }
    export interface Options {
        numElevators : number;
        numFloors : number;
        numPeople: number;
    }

    export interface Models {
        elevators: Elevator[];
        floors: Floor[];
        people: Person[];
    }

    declare var angular;

    export class SimulatedObject {
        public id:number;

        constructor(id:number) {
            this.id = id;
        }
    }

    export class Floor extends SimulatedObject {
        constructor(id:number) {
            super(id);
        }
    }
    var floors:Floor[] = [];

    export class Elevator extends SimulatedObject {
        public transition:number;
        public direction:Direction;
        public queue:Floor[];

        constructor(id:number, public floor: Floor) {
            super(id);
            this.direction = Direction.stopped;
            this.queue = [];
        }
    }
    var elevators:Elevator[] = [];

    export class Person extends SimulatedObject {
        public transition:Number;
        public elevator:Elevator;
        public state:PersonState;
        public walkingDirection:Number;

        constructor(id:number, public floor:Floor) {
            super(id);
            this.state = PersonState.onFloor;
            this.transition = Math.floor(101 * Math.random());
            this.walkingDirection = Math.floor(Math.random()*2) == 0 ? -1 : 1;
        }
    }
    var people:Person[] = [];

    export var models:Models = {
        floors: floors,
        elevators: elevators,
        people: people
    };

    export function initialize(options:Options = {
        numElevators: 4,
        numFloors: 20,
        numPeople: 100
    }) {
        for (var i = 0; i < options.numFloors; i++) {
            floors[i] = new Floor(i);
        }
        for (var i = 0; i < options.numElevators; i++) {
            var randomFloor = floors[Math.floor(options.numFloors * Math.random())];
            elevators[i] = new Elevator(i, randomFloor);
        }
        for (var i = 0; i < options.numPeople; ++i) {
            var randomFloor = floors[Math.floor(options.numFloors * Math.random())];
            people[i] = new Person(i, randomFloor);
        }
    }

    angular.module('es_models', []).constant('es_models', models);
}