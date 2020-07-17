/**
 * Pretty-prints a .bbmodel
 */
const fs = require('fs');
const _ = require('lodash');
const uuid = require('uuid');

const FILE_BASENAME = 'tests/tweentest1';
const model = JSON.parse(fs.readFileSync(`${FILE_BASENAME}.bbmodel`));

fs.writeFileSync(`${FILE_BASENAME}.pretty.bbmodel`, JSON.stringify(model, null, 2));
