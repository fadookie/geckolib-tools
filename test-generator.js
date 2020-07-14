const fs = require('fs');
/**
 * Makes a .bbmodel with a giant animation clip with every easing curve based on the template we just loaded
 * This was needed for testing that no bugs were introduced during easing curve refactor effort
 */
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

const FILE_BASENAME = 'tests/tweentest-oldFormat';
const origModel = JSON.parse(fs.readFileSync(`${FILE_BASENAME}.bbmodel`));

const newModel = _.cloneDeep(origModel);

// Make a giant animation clip with every easing curve based on the template we just loaded
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