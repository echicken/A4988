# A4988
Use an A4988 stepper motor controller on a Raspberry Pi with node.js

```javascript
const A4988 = require('A4988');
const a4988 = new A4988(6, 5);
a4988.turn(5000).then(steps => console.log(`Turned ${steps} steps`));
```

### Constructor

```javascript
new A4988(step, direction_[, ms1, ms2, ms3]_);
```

All parameters are BCM GPIO pin numbers wired to the corresponding A4988 pins.

The _ms1_, _ms2_, and _ms3_ parameters are optional, but required if you want microstepping (_step_size_ below).

### Properties

* **direction** - _boolean_ - Clockwise or counterclockwise, depending on wiring
* **delay** - _number_ - Milliseconds between steps (pulses)
* **step_size** - _string_ - 'full', 'half', 'quarter', 'eighth', or 'sixteenth' (ms1, ms2, and ms3 must be wired up and provided to constructor)

### Methods

* **turn(steps _[, callback]_)** - Will fire _callback_ when turn is complete (or aborted).  If _callback_ not given, returns a Promise
* **stop()** - Abort a turn in progress
