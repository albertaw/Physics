var util = require('./public/js/Util.js');
var clock = require('./public/js/Clock.js');
var world = require('./public/js/World.js');
var body = require('./public/js/Body.js');
var objectManager = require('./public/js/ObjectManager.js');
var behaviors = require('./public/js/Behaviors.js');
var integrators = require('./public/js/Integrators.js');

module.exports = {
    util: util,
    clock: clock,
    world: world,
    body: body,
    objectManager: objectManager,
    behaviors: behaviors,
    integrators: integrators
}