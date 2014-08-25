var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by desmond on 8/24/2014.
*/
var Simulator;
(function (Simulator) {
    var options = {
        numElevators: 4,
        numFloors: 20
    };

    var SimulatedObject = (function () {
        function SimulatedObject(id) {
            this.id = id;
        }
        return SimulatedObject;
    })();

    var Floor = (function (_super) {
        __extends(Floor, _super);
        function Floor(id) {
            _super.call(this, id);
        }
        return Floor;
    })(SimulatedObject);

    var Elevator = (function (_super) {
        __extends(Elevator, _super);
        function Elevator(id) {
            _super.call(this, id);
            this.floor = 0;
        }
        return Elevator;
    })(SimulatedObject);

    var floors = [];
    for (var i = 0; i < options.numFloors; i++) {
        floors[i] = new Floor(i);
    }

    var elevators = [];
    for (var i = 0; i < options.numElevators; i++) {
        elevators[i] = new Elevator(i);
    }

    angular.module('es_module', []).constant('es_models', {
        floors: floors,
        elevators: elevators
    });
})(Simulator || (Simulator = {}));
//# sourceMappingURL=simulator.js.map
