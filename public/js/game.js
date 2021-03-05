"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
/* tslint:disable */
const index_js_1 = require("./ux/index.js");
/* tslint:enable */
class Game {
    static init() {
        index_js_1.Canvas.init(document.querySelector("#canvas"));
        index_js_1.Canvas.fill("black");
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map