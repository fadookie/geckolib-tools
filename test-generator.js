const fs = require('fs');
const _ = require('lodash');
const uuid = require('uuid');

const EASING_OPTIONS = [
   "Sine",
   "Quad",
   "Cubic",
   "Quart",
   "Quint",
   "Expo",
   "Circ",
   "Back",
   "Elastic",
   "Bounce"
];

// const origModel = JSON.parse(fs.readFileSync('tweentest1.bbmodel'));
const FILE_BASENAME = 'tweentest-oldFormat';
const origModel = JSON.parse(fs.readFileSync(`${FILE_BASENAME}.bbmodel`));

const newModel = _.cloneDeep(origModel);

// Option 1: one clip per curve type
// newModel.animations = EASING_OPTIONS.map(easingName => {
//   const animation = _.cloneDeep(origModel.animations[0]);
//   animation.uuid = uuid.v4();
//   animation.name = `animation.${easingName}.test`;
//   animation.animators.bone.forEach(kf => {
//     kf.uuid = uuid.v4();
//     if (kf.easing !== undefined) {
//       kf.easing = kf.easing.replace('Sine', easingName);
//     }
//   });
//   return animation;
// });

// Option 2: one giant clip
const animLength = origModel.animations[0].length;
newModel.animations[0].animators.bone = EASING_OPTIONS.flatMap((easingName, easingIndex) => {
  return origModel.animations[0].animators.bone.map(templateKf => {
    const kf = _.cloneDeep(templateKf);
    kf.uuid = uuid.v4();
    if (kf.easing !== undefined) {
      kf.easing = kf.easing.replace('Sine', easingName);
    }
    kf.time += animLength * easingIndex;
    return kf;
  });
});

fs.writeFileSync(`${FILE_BASENAME}.generated-single.bbmodel`, JSON.stringify(newModel, null, 2));