"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = __importDefault(require("./Tile"));
var three_1 = require("three");
var MaterialTile = /** @class */ (function (_super) {
    __extends(MaterialTile, _super);
    function MaterialTile(textures, killsDucks, x, y, z) {
        var _this = this;
        var material = textures.map(function (t) {
            if (t === three_1.Texture) {
                new three_1.MeshPhongMaterial({ map: t, transparent: true, visible: true });
            }
        });
        _this = _super.call(this, killsDucks, x, y, z, material) || this;
        return _this;
    }
    return MaterialTile;
}(Tile_1.default));
exports.default = MaterialTile;