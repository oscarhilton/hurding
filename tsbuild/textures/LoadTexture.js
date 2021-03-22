"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
function LoadTexture(textureFile) {
    var textureLoader = new three_1.TextureLoader();
    return textureLoader.load(textureFile);
}
exports.default = LoadTexture;
