/**
 * Created by desmond on 8/25/2014.
 */

/// <reference path="models.ts" />

module Services {
    declare var angular;

    Models.initialize({
        numElevators: 2,
        numFloors: 10,
        numPeople: 20
    });

    export class Simulator {
        public models:Models.Models;
        public $interval:any;

        constructor(private floors:Models.Floor[], private elevators:Models.Elevator[], private people: Models.Person[], $injector) {
            this.models = {
                floors: floors,
                elevators: elevators,
                people: people
            };

            this.$interval = $injector.get('$interval');
            this.$interval(() => {
                this.tick();
            }, 1);
        }

        public dispatchElevatorToFloor(elevator:Models.Elevator, floor:Models.Floor) {
            elevator.queue.push(floor);
        }

        public elevatorArrived(elevator:Models.Elevator, floor:Models.Floor) {
            console.log('arrived!');
        }

        public tick() {
            this.handleElevators();
            this.handlePeople();
        }

        public handleElevators() {
            this.elevators.forEach((e:Models.Elevator) => {
                if (e.queue.length > 0) {
                    e.queue.sort((f1:Models.Floor, f2:Models.Floor) => {
                        var mag1 = Math.abs(e.floor.id - f1.id);
                        var mag2 = Math.abs(e.floor.id - f2.id);

                        var min = Math.min(mag1, mag2);
                        return mag1 < mag2 ? -min : min;
                    });

                    // determine direction
                    var floor:Models.Floor = e.queue[0];
                    e.direction = floor.id - e.floor.id < 0 ? Models.Direction.down : Models.Direction.up;

                    // next, go go go
                    e.transition += e.direction == Models.Direction.down ? -1 : 1;

                    if (Math.abs(e.transition) == 100) {
                        // move floor
                        e.transition = 0;

                        e.floor = this.floors[e.floor.id + (e.direction == Models.Direction.down ? -1 : 1)];
                        console.log(e.floor.id);
                        console.log(e.queue[0].id);

                        if (e.floor.id == e.queue[0].id) {
                            e.direction = Models.Direction.stopped;
                            e.queue.shift();
                            // do special callback
                        }

                    }
                }
                else {
                    e.transition = 0;
                    e.direction = Models.Direction.stopped;
                }
            });
        }

        public handlePeople() {
            this.people.forEach((person: Models.Person) => {
                person.transition = person.transition + (0.01 * person.walkingDirection);
                if (person.transition >= 100 || person.transition <= 0) {
                    console.log("EDGE");
                    person.walkingDirection = person.walkingDirection * -1;
                }
            })
        }
    }

    angular.module('es_services', ['es_models']).factory('Simulator', ($injector) => {
        return new Simulator(Models.models.floors, Models.models.elevators, Models.models.people, $injector);
    });
}