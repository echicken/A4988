# A4988
Use an A4988 stepper motor controller on a Raspberry Pi with node.js

```javascript
const A4988 = require('A4988');
const a4988 = new A4988(6, 5);
a4988.turn(5000).then(steps => console.log(`Turned ${steps} steps`));
```

### Constructor

* new A4988(step, direction, ms1, ms2, ms3)

All parameters are BCM GPIO pin numbers wired to the corresponding A4988 pins.

ms1, ms2, ms3 are optional, but required if you want microstepping (step_size below)

### Properties

* *direction* - _boolean_ - Clockwise or counterclockwise, depending on wiring
* *delay* - _number_ - Milliseconds between steps (pulses)
* *step_size* - _string_ - full, half, quarter, eighth, or sixteenth

### Methods

* *turn(steps[, callback])* - Will fire _callback_ when turn is complete.  If _callback_ not given, returns a promise
* *stop()* - Abort a turn in progress
