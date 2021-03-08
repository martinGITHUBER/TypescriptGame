"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = exports.ClockTick = exports.ClockType = void 0;
var ClockType;
(function (ClockType) {
    ClockType[ClockType["TIMED"] = 0] = "TIMED";
    ClockType[ClockType["INFINITE"] = 1] = "INFINITE";
})(ClockType = exports.ClockType || (exports.ClockType = {}));
;
var ClockTick;
(function (ClockTick) {
    ClockTick[ClockTick["ODD"] = 0] = "ODD";
    ClockTick[ClockTick["EVEN"] = 1] = "EVEN";
})(ClockTick = exports.ClockTick || (exports.ClockTick = {}));
;
class Timer {
    constructor(interval, duration, handler) {
        this.handler = () => {
            console.log("No clock event");
        };
        this.on_elapsed = () => {
            if (this.is_paused)
                return;
            this.tick = this.tick === ClockTick.EVEN ? ClockTick.ODD : ClockTick.EVEN;
            this.handler();
            if (this.type == ClockType.TIMED)
                this.stop();
        };
        this.interval = interval;
        this.handler = handler;
        this.type = duration == 0 ? ClockType.INFINITE : ClockType.TIMED;
    }
    start() {
        this.is_running = true;
        this.handle = this.type == ClockType.INFINITE
            ? window.setInterval(this.on_elapsed.bind(this), this.interval)
            : window.setTimeout(this.on_elapsed.bind(this), this.interval);
    }
    stop() {
        this.is_running = false;
        return this.type === ClockType.INFINITE
            ? window.clearInterval(this.handle)
            : window.clearTimeout(this.handle);
    }
    pause() { this.is_paused == true; }
    ;
    resume() { this.is_paused == false; }
    ;
}
exports.Timer = Timer;
//# sourceMappingURL=timer.js.map