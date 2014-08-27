var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by desmond on 8/24/2014.
*/
var Models;
(function (Models) {
    (function (Direction) {
        Direction[Direction["up"] = 0] = "up";
        Direction[Direction["down"] = 1] = "down";
        Direction[Direction["stopped"] = 2] = "stopped";
    })(Models.Direction || (Models.Direction = {}));
    var Direction = Models.Direction;
    (function (PersonState) {
        PersonState[PersonState["onFloor"] = 0] = "onFloor";
        PersonState[PersonState["goingToElevator"] = 1] = "goingToElevator";
        PersonState[PersonState["onElevator"] = 2] = "onElevator";
    })(Models.PersonState || (Models.PersonState = {}));
    var PersonState = Models.PersonState;

    var SimulatedObject = (function () {
        function SimulatedObject(id) {
            this.id = id;
        }
        return SimulatedObject;
    })();
    Models.SimulatedObject = SimulatedObject;

    var Floor = (function (_super) {
        __extends(Floor, _super);
        function Floor(id) {
            _super.call(this, id);
        }
        Floor.prototype.elevatorsOnFloor = function () {
            var _this = this;
            return Models.models.elevators.filter(function (elevator) {
                return elevator.floor.id == _this.id;
            });
        };
        return Floor;
    })(SimulatedObject);
    Models.Floor = Floor;
    var floors = [];

    var Elevator = (function (_super) {
        __extends(Elevator, _super);
        function Elevator(id, floor) {
            _super.call(this, id);
            this.floor = floor;
            this.direction = 2 /* stopped */;
            this.queue = [];
        }
        return Elevator;
    })(SimulatedObject);
    Models.Elevator = Elevator;
    var elevators = [];

    var Person = (function (_super) {
        __extends(Person, _super);
        function Person(id, floor) {
            _super.call(this, id);
            this.floor = floor;
            this.state = 0 /* onFloor */;
            this.transition = Math.floor(101 * Math.random());
            this.walkingDirection = Math.floor(Math.random() * 2) == 0 ? -1 : 1;
        }
        return Person;
    })(SimulatedObject);
    Models.Person = Person;
    var people = [];

    Models.models = {
        floors: floors,
        elevators: elevators,
        people: people
    };

    function initialize(options) {
        if (typeof options === "undefined") { options = {
            numElevators: 4,
            numFloors: 20,
            numPeople: 100
        }; }
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
    Models.initialize = initialize;

    angular.module('es_models', []).constant('es_models', Models.models);
})(Models || (Models = {}));
//# sourceMappingURL=models.js.map
