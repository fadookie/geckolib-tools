/**
 * Makes reversed copies of given animations inside a .bbmodel file
 */
const fs = require('fs');
const _ = require('lodash');
const uuid = require('uuid');

const FILE_BASENAME = 'tests/tweentest1'; // Set this to relative path to your .bbmodel file without the extension
const ANIM_NAMES = ['animation.easingtest.new']; // Add names of any animations you want to change to this array seperated by commas
const origModel = JSON.parse(fs.readFileSync(`${FILE_BASENAME}.bbmodel`));

function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
};

function map(n, start1, stop1, start2, stop2, withinBounds) {
  const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
};

const newModel = _.cloneDeep(origModel)
newModel.animations.forEach(animation => {
  if(!ANIM_NAMES.includes(animation.name)) return;
  const reversedAnimation = _.cloneDeep(animation);
  newModel.animations.push(reversedAnimation);
  reversedAnimation.name = `${animation.name}.reversed`;
  reversedAnimation.uuid = uuid.v4();
  Object.keys(reversedAnimation.animators).forEach(animatorKey => {
    const animator = reversedAnimation.animators[animatorKey];
    animator.forEach(kf => {
      kf.uuid = uuid.v4();
      kf.time = map(kf.time, 0, reversedAnimation.length, reversedAnimation.length, 0);
      return kf;
    });
    reversedAnimation.animators[animatorKey] = _.sortBy(animator, 'time');
  });
});

fs.writeFileSync(`${FILE_BASENAME}.reversed.bbmodel`, JSON.stringify(newModel, null, 2));
