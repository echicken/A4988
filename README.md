# A4988
Use an A4988 stepper motor controller on a Raspberry Pi with node.js

```javascript
const A4988 = require('A4988');
const a4988 = new A4988({ step: 6, direction: 5 });
a4988.turn(5000).then(steps => console.log(`Turned ${steps} steps`));
```

### Constructor

```javascript
new A4988({ step: 26, direction: 19, ms1: 13, ms2: 6, ms3: 5, enable: 22 }); // ms1, ms2, ms3, and enable are optional
```

All parameters are BCM GPIO pin numbers wired to the corresponding A4988 pins.

The _ms1_, _ms2_, and _ms3_ parameters are optional, but required if you want microstepping (_step_size_ below).

### Properties

* **direction** - _boolean_ - Clockwise or counterclockwise, depending on wiring (I think)
* **delay** - _number_ - Milliseconds between steps (pulses) (default is 1, which works for me)
* **step_size** - _string_ - 'full', 'half', 'quarter', 'eighth', or 'sixteenth'
    * ms1, ms2, and ms3 must be wired up and provided to constructor
* **enabled** - _boolean_ - Enable or disable the controller. Set 'true' to enable (default), 'false' to disable. This is at odds with how the pin actually works (active-low) but is clearer.

### Methods

* **turn(steps _[, callback]_)** - Will fire _callback_ when turn is complete (or aborted).  If _callback_ not given, returns a Promise
    * Return value (or callback param) is the number of steps actually taken, which may vary from _steps_ if _stop()_ was called and the turn was aborted prematurely.
* **stop()** - Abort a turn in progress
