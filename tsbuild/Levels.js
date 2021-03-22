"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Level_1 = __importStar(require("./Level"));
var LevelOne = new Level_1.default([
    new Level_1.Segment("\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n      WWWWWWWWWWWWWWWWWWWW,\n    "),
    new Level_1.Segment("\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXFFFFXXXXXX,\n      XXXXXXXXXXFFFFXXXXXX,\n      XXXXXXXXXXXXFFXXXXXX,\n      XXXXXXXXXXXXX=XXXXXX,\n      XXXXXXXXXXXXX=XXXXXX,\n      XXXXXXXXFFFFFFXXXXXX,\n      XXXXXXXXFFFFFFXXXXXX,\n      XXXXXXXXFFFFFFXXXXXX,\n      XXXXXXXXFFFFFFXXXXXX,\n      XXXXXXXX=XXXXXXXXXXX,\n      XXXXXXXX=XXXXXXXXXXX,\n      XXXXXXXXFFXXXXXXXXXX,\n      XXXXXFFFFFFFFXXXXXXX,\n      XXXXXXXFFFF@FFFXXXXX,\n      XXXXXXXFFFFFFFFXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n    "),
    new Level_1.Segment("\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXDXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n      XXXXXXXXXXXXXXXXXXXX,\n    "),
]);
exports.default = [LevelOne];
