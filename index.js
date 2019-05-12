const EventEmitter = require('events');
const Gpio = require('pigpio').Gpio;

class A4988 extends EventEmitter {

    constructor({ step = 6, dir = 5, ms1 = 0, ms2 = 0, ms3 = 0 } = {}) {

        super();

        this._abort = false;
        this._delay = 1;
        this._direction = false;
        this._steps = 0;
        this._step_size = 'FULL';

        this._step = new Gpio(step, { mode: Gpio.OUTPUT });
        this._dir = new Gpio(dir, { mode: Gpio.OUTPUT });;
        this._step.digitalWrite(false);
        this._dir.digitalWrite(false);

        if (ms1 && ms2 && ms3) {

            this._ms1 = new Gpio(ms1, { mode: Gpio.OUTPUT });
            this._ms2 = new Gpio(ms2, { mode: Gpio.OUTPUT });
            this._ms3 = new Gpio(ms3, { mode: Gpio.OUTPUT });

            this._ms1.digitalWrite(false);
            this._ms2.digitalWrite(false);
            this._ms3.digitalWrite(false);

        }

    }

    get delay() {
        return this._delay;
    }

    set delay(d) {
        if (typeof d != 'number') throw `'delay' must be a number (${d})`;
        if (d <= 0) throw `'delay' must be >= 0 (${d})`;
        this._delay = d;
    }

    get direction() {
        return this._direction;
    }

    set direction(d) {
        if (typeof d != 'boolean') throw `'direction' must be boolean (${d})`;
        this._direction = d;
    }

    get step_size() {
        return this._step_size;
    }

    set step_size(ss) {
        if (!this._ms1) return;
        if (typeof ss != 'string') throw `'step_size' must be a string (${ss})`;
        switch (ss.toUpperCase()) {
            case 'FULL':
                this._ms1.digitalWrite(false);
                this._ms2.digitalWrite(false);
                this._ms3.digitalWrite(false);
                this._step_size = 'FULL';
                break;
            case 'HALF':
                this._ms1.digitalWrite(true);
                this._ms2.digitalWrite(false);
                this._ms3.digitalWrite(false);
                this._step_size = 'HALF';
                break;
            case 'QUARTER':
                this._ms1.digitalWrite(false);
                this._ms2.digitalWrite(true);
                this._ms3.digitalWrite(false);
                this._step_size = 'QUARTER';
                break;
            case 'EIGHTH':
                this._ms1.digitalWrite(true);
                this._ms2.digitalWrite(true);
                this._ms3.digitalWrite(false);
                this._step_size = 'EIGHTH';
                break;
            case 'SIXTEENTH':
                this._ms1.digitalWrite(true);
                this._ms2.digitalWrite(true);
                this._ms3.digitalWrite(true);
                this._step_size = 'SIXTEENTH';
                break;
            default:
                break;
        }
    }

    _turn(steps, res) {
        if (this._abort) {
            this.emit('stop', steps);
            res(this._steps);
            return;
        }
        this._steps++;
        this._step.digitalWrite(true);
        this._step.digitalWrite(false);
        if (this._steps == steps) {
            this.emit('stop', this._steps);
            res(steps);
            return;
        }
        setTimeout(() => this._turn(steps, res), this._delay);
    }

    turn(steps = 1, direction, delay) {
        return new Promise((res, rej) => {
            this._steps = 0;
            this._abort = false;
            if (typeof direction != 'undefined' && this._direction != direction) {
                this.direction = direction;
                this._dir.digitalWrite(direction);
            }
            if (typeof delay != 'undefined' && this._delay != delay) {
                this.delay = delay;
            }
            this._turn(steps, res);
        });
    }

    stop() {
        this._abort = true;
    }

}

module.exports = A4988;
