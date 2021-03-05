"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
class Canvas {
    static init(element) {
        element.height = Canvas.height;
        element.width = Canvas.width;
        Canvas.context = element.getContext("2d");
    }
    static fill(color) {
        Canvas.context.beginPath();
        Canvas.context.rect(0, 0, Canvas.width, Canvas.height);
        Canvas.context.fillStyle = color;
        Canvas.context.fill();
    }
    static fill_rect(x, y, w, h, color) {
        Canvas.context.beginPath();
        Canvas.context.fillStyle = color;
        Canvas.context.fillRect(x, y, w, h);
    }
    static draw_rect(x, y, w, h, color) {
        Canvas.context.beginPath();
        Canvas.context.lineWidth = 1;
        Canvas.context.strokeStyle = color;
        Canvas.context.rect(x, y, w, h);
        Canvas.context.stroke();
    }
}
exports.Canvas = Canvas;
Canvas.width = 640;
Canvas.height = 400;
//# sourceMappingURL=canvas.js.map