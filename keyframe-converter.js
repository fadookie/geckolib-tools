/**
 * Converts a .bbmodel file from the old keyframe format (tween associated with left-hand keyframe)
 * to new format (tween associated with right-hand keyframe) 
 */
const fs = require('fs');
const _ = require('lodash');

const FILE_BASENAME = 'tests/tweentest-oldFormat';
const origModel = JSON.parse(fs.readFileSync(`${FILE_BASENAME}.bbmodel`));

const newModel = _.cloneDeep(origModel)
newModel.animations.forEach(animation => {
  Object.keys(animation.animators).forEach(animatorKey => {
    const animator = animation.animators[animatorKey];
    for (i = animator.length - 1; i >= 0; --i) {
      const rightKf = animator[i];
      const leftKf = animator[i - 1];
      // console.log('rightKf:', rightKf, 'leftKf:', leftKf);
      if (leftKf === undefined) continue;
      rightKf.easing = leftKf.easing
      rightKf.easingArgs = leftKf.easingArgs;
      delete leftKf.easing;
      delete leftKf.easingArgs;
    }
  });
});

fs.writeFileSync(`${FILE_BASENAME}.converted.bbmodel`, JSON.stringify(newModel, null, 2));