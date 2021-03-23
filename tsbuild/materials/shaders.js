"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRAGMENT_SHADER = exports.VERTEX_SHADER = void 0;
window.onload = function () {
    var _a, _b;
    exports.VERTEX_SHADER = ((_a = document.getElementById('vertexShader')) === null || _a === void 0 ? void 0 : _a.textContent) || undefined;
    exports.FRAGMENT_SHADER = ((_b = document.getElementById('fragmentShader')) === null || _b === void 0 ? void 0 : _b.textContent) || undefined;
    console.log("LOAD!", exports.VERTEX_SHADER, exports.FRAGMENT_SHADER);
};
