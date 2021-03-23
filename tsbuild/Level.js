"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Segment = void 0;
var tiles_1 = __importDefault(require("./tiles"));
var Segment = /** @class */ (function () {
    function Segment(map) {
        this.rows = map.split(',').map(function (row) {
            return row.split('').filter(function (character) { return Object.values(tiles_1.default).includes(character); });
        }).filter(function (array) { return array.length > 0; });
    }
    return Segment;
}());
exports.Segment = Segment;
var Level = /** @class */ (function () {
    function Level(segments) {
        this.segmentsZ = segments;
    }
    return Level;
}());
exports.default = Level;
