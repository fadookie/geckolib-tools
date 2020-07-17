/* The MIT License (MIT)

Copyright (c) 2015 Boris Chumichev

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/**
 *
 * Utilizes bisection method to search an interval to which
 * point belongs to, then returns an index of left or right
 * border of the interval
 *
 * @param {Number} point
 * @param {Array} intervals
 * @param {Boolean} useRightBorder
 * @returns {Number}
 */

function findIntervalBorderIndex(point, intervals, useRightBorder) {
  //If point is beyond given intervals
  if (point < intervals[0])
    return 0
  if (point > intervals[intervals.length - 1] || intervals.length === 1)
    return intervals.length - 1
  //If point is inside interval
  //Start searching on a full range of intervals
  var indexOfNumberToCompare = 0;
  var leftBorderIndex = 0;
  var rightBorderIndex = intervals.length - 1
  //Reduce searching range till it find an interval point belongs to using binary search
  while (rightBorderIndex - leftBorderIndex !== 1) {
    indexOfNumberToCompare = leftBorderIndex + Math.floor((rightBorderIndex - leftBorderIndex) / 2)
    point >= intervals[indexOfNumberToCompare] ?
      leftBorderIndex = indexOfNumberToCompare :
      rightBorderIndex = indexOfNumberToCompare
  }
  return useRightBorder ? rightBorderIndex : leftBorderIndex
}

function stepRange(steps) {
  if (steps < 1) throw new Error("steps must be > 0, got:" + steps);
  const stepLength = 1 / steps;
  return Array.from({
    length: steps + 1
  }, (_, i) => i * stepLength);
};

// The MIT license notice below applies to the Easing class
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
class Easing {
  /**
   * A stepping function, returns 1 for any positive value of `n`.
   */
  static step0(n) {
    return n > 0 ? 1 : 0;
  }
  /**
   * A stepping function, returns 1 if `n` is greater than or equal to 1.
   */
  static step1(n) {
    return n >= 1 ? 1 : 0;
  }
  /**
   * A linear function, `f(t) = t`. Position correlates to elapsed time one to
   * one.
   *
   * http://cubic-bezier.com/#0,0,1,1
   */
  static linear(t) {
    return t;
  }
  /**
   * A simple inertial interaction, similar to an object slowly accelerating to
   * speed.
   *
   * http://cubic-bezier.com/#.42,0,1,1
   */
  // static ease(t) {
  // 		if (!ease) {
  // 				ease = Easing.bezier(0.42, 0, 1, 1);
  // 		}
  // 		return ease(t);
  // }
  /**
   * A quadratic function, `f(t) = t * t`. Position equals the square of elapsed
   * time.
   *
   * http://easings.net/#easeInQuad
   */
  static quad(t) {
    return t * t;
  }
  /**
   * A cubic function, `f(t) = t * t * t`. Position equals the cube of elapsed
   * time.
   *
   * http://easings.net/#easeInCubic
   */
  static cubic(t) {
    return t * t * t;
  }
  /**
   * A power function. Position is equal to the Nth power of elapsed time.
   *
   * n = 4: http://easings.net/#easeInQuart
   * n = 5: http://easings.net/#easeInQuint
   */
  static poly(n) {
    return (t) => Math.pow(t, n);
  }
  /**
   * A sinusoidal function.
   *
   * http://easings.net/#easeInSine
   */
  static sin(t) {
    return 1 - Math.cos((t * Math.PI) / 2);
  }
  /**
   * A circular function.
   *
   * http://easings.net/#easeInCirc
   */
  static circle(t) {
    return 1 - Math.sqrt(1 - t * t);
  }
  /**
   * An exponential function.
   *
   * http://easings.net/#easeInExpo
   */
  static exp(t) {
    return Math.pow(2, 10 * (t - 1));
  }
  /**
   * A simple elastic interaction, similar to a spring oscillating back and
   * forth.
   *
   * Default bounciness is 1, which overshoots a little bit once. 0 bounciness
   * doesn't overshoot at all, and bounciness of N > 1 will overshoot about N
   * times.
   *
   * http://easings.net/#easeInElastic
   */
  static elastic(bounciness = 1) {
    const p = bounciness * Math.PI;
    return t => 1 - Math.pow(Math.cos((t * Math.PI) / 2), 3) * Math.cos(t * p);
  }
  /**
   * Use with `Animated.parallel()` to create a simple effect where the object
   * animates back slightly as the animation starts.
   *
   * Wolfram Plot:
   *
   * - http://tiny.cc/back_default (s = 1.70158, default)
   */
  static back(s = 1.70158) {
    return t => t * t * ((s + 1) * t - s);
  }
  /**
   * Provides a simple bouncing effect.
   *
   * http://easings.net/#easeInBounce
   */
  static bounce(k = 0.5) {
    const q = x => (121 / 16) * x * x;
    const w = x => ((121 / 4) * k) * Math.pow(x - (6 / 11), 2) + 1 - k;
    const r = x => 121 * k * k * Math.pow(x - (9 / 11), 2) + 1 - k * k;
    const t = x => 484 * k * k * k * Math.pow(x - (10.5 / 11), 2) + 1 - k * k * k;
    return x => Math.min(q(x), w(x), r(x), t(x));
  }
  /**
   * Provides a cubic bezier curve, equivalent to CSS Transitions'
   * `transition-timing-function`.
   *
   * A useful tool to visualize cubic bezier curves can be found at
   * http://cubic-bezier.com/
   */
  // static bezier(x1, y1, x2, y2) {
  // 		const _bezier = require('./bezier');
  // 		return _bezier(x1, y1, x2, y2);
  // }
  /**
   * Runs an easing function forwards.
   */
  static in (easing) {
    return easing;
  }
  /**
   * Runs an easing function backwards.
   */
  static out(easing) {
    return t => 1 - easing(1 - t);
  }
  /**
   * Makes any easing function symmetrical. The easing function will run
   * forwards for half of the duration, then backwards for the rest of the
   * duration.
   */
  static inOut(easing) {
    return t => {
      if (t < 0.5) {
        return easing(t * 2) / 2;
      }
      return 1 - easing((1 - t) * 2) / 2;
    };
  }
}

const quart = Easing.poly(4);
const quint = Easing.poly(5);
const back = (direction, scalar, t) =>
  direction(Easing.back(1.70158 * scalar))(t);
const elastic = (direction, bounciness, t) =>
  direction(Easing.elastic(bounciness))(t);
const bounce = (direction, bounciness, t) =>
  direction(Easing.bounce(bounciness))(t);

const easingFunctions = {
  linear: Easing.linear,
  step(steps, x) {
    const intervals = stepRange(steps);
    return intervals[findIntervalBorderIndex(x, intervals, false)];
  },
  easeInQuad: Easing.in(Easing.quad),
  easeOutQuad: Easing.out(Easing.quad),
  easeInOutQuad: Easing.inOut(Easing.quad),
  easeInCubic: Easing.in(Easing.cubic),
  easeOutCubic: Easing.out(Easing.cubic),
  easeInOutCubic: Easing.inOut(Easing.cubic),
  easeInQuart: Easing.in(quart),
  easeOutQuart: Easing.out(quart),
  easeInOutQuart: Easing.inOut(quart),
  easeInQuint: Easing.in(quint),
  easeOutQuint: Easing.out(quint),
  easeInOutQuint: Easing.inOut(quint),
  easeInSine: Easing.in(Easing.sin),
  easeOutSine: Easing.out(Easing.sin),
  easeInOutSine: Easing.inOut(Easing.sin),
  easeInExpo: Easing.in(Easing.exp),
  easeOutExpo: Easing.out(Easing.exp),
  easeInOutExpo: Easing.inOut(Easing.exp),
  easeInCirc: Easing.in(Easing.circle),
  easeOutCirc: Easing.out(Easing.circle),
  easeInOutCirc: Easing.inOut(Easing.circle),
  easeInBack: back.bind(null, Easing.in),
  easeOutBack: back.bind(null, Easing.out),
  easeInOutBack: back.bind(null, Easing.inOut),
  easeInElastic: elastic.bind(null, Easing.in),
  easeOutElastic: elastic.bind(null, Easing.out),
  easeInOutElastic: elastic.bind(null, Easing.inOut),
  easeInBounce: bounce.bind(null, Easing.in),
  easeOutBounce: bounce.bind(null, Easing.out),
  easeInOutBounce: bounce.bind(null, Easing.inOut),
};

const EASING_OPTIONS = Object.fromEntries(Object.entries(easingFunctions).map(entry => ([entry[0], entry[0]])));

const hasArgs = (easing = "") =>
  easing.includes("Back") ||
  easing.includes("Elastic") ||
  easing.includes("Bounce") ||
  easing === EASING_OPTIONS.step;

const getEasingArgDefault = easing => {
  switch (easing) {
    case EASING_OPTIONS.easeInBack:
    case EASING_OPTIONS.easeOutBack:
    case EASING_OPTIONS.easeInOutBack:
    case EASING_OPTIONS.easeInElastic:
    case EASING_OPTIONS.easeOutElastic:
    case EASING_OPTIONS.easeInOutElastic:
      return 1;
    case EASING_OPTIONS.easeInBounce:
    case EASING_OPTIONS.easeOutBounce:
    case EASING_OPTIONS.easeInOutBounce:
      return 0.5;
    case EASING_OPTIONS.step:
      return 5;
    default:
      return null;
  }
};

const getEasingArgRange = easing => {
  switch (easing) {
    case EASING_OPTIONS.easeInBack:
    case EASING_OPTIONS.easeOutBack:
    case EASING_OPTIONS.easeInOutBack:
    case EASING_OPTIONS.easeInElastic:
    case EASING_OPTIONS.easeOutElastic:
    case EASING_OPTIONS.easeInOutElastic:
      return [-10, 10];
    case EASING_OPTIONS.easeInBounce:
    case EASING_OPTIONS.easeOutBounce:
    case EASING_OPTIONS.easeInOutBounce:
      return [0, 1];
    case EASING_OPTIONS.step:
      return [2, 20];
    default:
      return null;
  }
};

const getEasingArgStep = easing => {
  switch (easing) {
    case EASING_OPTIONS.easeInBack:
    case EASING_OPTIONS.easeOutBack:
    case EASING_OPTIONS.easeInOutBack:
    case EASING_OPTIONS.easeInElastic:
    case EASING_OPTIONS.easeOutElastic:
    case EASING_OPTIONS.easeInOutElastic:
    case EASING_OPTIONS.easeInBounce:
    case EASING_OPTIONS.easeOutBounce:
    case EASING_OPTIONS.easeInOutBounce:
      return 'any';
    case EASING_OPTIONS.step:
      return 1;
    default:
      return null;
  }
};

let sel;
const constSliders = [];
const constLabels = [];
var arg1Slider;
let easing = EASING_OPTIONS.easeOutBack;
let animStartTime = 0;
const animDuration = 2 * 1000;

function setup() {
  createCanvas(420, 800);
  // createCanvas(800, 800);
  // textAlign(CENTER);
  sel = createSelect();
  sel.position(10, 10);
  Object.keys(easingFunctions).forEach(key => sel.option(key));
  sel.changed(mySelectEvent);

  const constantsLabel = createP('Args');
  constantsLabel.position(10, 30);

  for (let i = 0; i < 1; ++i) {
    constSliders[i] = createSlider(0, 1, 1, 0);
    console.log(constSliders[i]);
    constSliders[i].position(10, 60 + (i * 30));
    constSliders[i].style('width', '100px');
    constSliders[i].changed(() => constLabels[i].value(constSliders[i].value()));

    constLabels[i] = createInput(String(getEasingArgDefault(easing)), 'number');
    constLabels[i].position(120, 45 + (i * 30));
    constLabels[i].changed(() => constSliders[i].value(constLabels[i].value()));
    // constSliders[i].style('width', '100px');
    console.log(constLabels[i]);
  }

  mySelectEvent();
}


function mySelectEvent() {
  const value = sel.value();
  easing = value;
  const defaultVal = getEasingArgDefault(value);
  const range = getEasingArgRange(value);
  const step = getEasingArgStep(value);
  const enabledConstSliders = hasArgs(value) ? [0] : [];
  for (let i = 0; i < constSliders.length; ++i) {
    constSliders[i].attribute('disabled', true);
  }
  enabledConstSliders.forEach(i => {
    constSliders[i].elt.disabled = false;
    constSliders[i].attribute('step', step);
    constSliders[i].attribute('min', range[0]);
    constSliders[i].attribute('max', range[1]);
    constLabels[i].attribute('step', step);
    constLabels[i].attribute('min', range[0]);
    constLabels[i].attribute('max', range[1]);
    constSliders[i].value(defaultVal);
    constLabels[i].value(defaultVal);
    console.log(`mySelectEvent easing:${easing} constSliders[${i}]:`, constSliders[i]);
  });
}

function getEasingFunction() {
  const easingFunc = easingFunctions[easing];
  if (!hasArgs(easing)) return easingFunc;
  return easingFunc.bind(null, constSliders[0].value());
}

function draw() {
  for (let i = 0; i < constSliders.length; ++i) {
    constLabels[i].elt.textContent = constSliders[i].value();
  }

  background(220);
  // draw from bottom left origin
  scale(1, -1);
  translate(0, -(height));
  const yTop = height - 200;
  const yBottom = 0 + 200;
  const xEnd = width - 20;
  // Draw graph bounds on for axis values 0 - 1
  push();
  stroke('blue');
  noFill();
  rectMode(CORNERS);
  rect(0, yBottom, xEnd, yTop);
  pop();

  const easingFunction = getEasingFunction();

  const lerpedValue = value => {
    const amount = easingFunction(value);
    // console.log(`lerpIn:`, value, 'lerpOut:', amount, 'easingFunc', easingFunction);
    return lerp(yBottom, yTop, amount);
  }

  noFill();
  const curveDrawing = true; //!easing.includes("Bounce");
  if (curveDrawing) beginShape();
  beginShape();
  for (let x = 0; x < xEnd; ++x) {
    let value = x / xEnd;
    const y = lerpedValue(value);
    if (curveDrawing) {
      curveVertex(x, y);
    } else {
      point(x, y);
    }
  }
  if (curveDrawing) endShape();

  const amount = constrain((millis() - animStartTime) / animDuration, 0, 1);
  const y = lerpedValue(amount);
  fill('white');
  ellipse(xEnd, y, 10, 10);
}

function mousePressed() {
  animStartTime = millis();
  const easingFunction = getEasingFunction();
  [0, 0.25, 0.5, 0.705, 0.729, 0.91, 1].forEach(x => {
    console.log({
      x,
      'm(x)': easingFunction(x)
    });
  });
}