QUnit.module('Physics.objectManager');

for (var i = 0; i < 4; i++) {
    Physics.objectManager.add(new Physics.body({}));
}

test('add objects', function () {
    equal(Physics.objectManager.getLength(), 4, 'Expect 4 objects');
});

test('destroy object by id', function (assert) {
    Physics.objectManager.destroyObjectById(1);
    equal(Physics.objectManager.getLength(), 3, 'Expect 3 objects');
    assert.notOk(Physics.objectManager.objectExists(1), 'object 1 removed');
});

test('destroy all objects', function () {
    Physics.objectManager.cleanup();
    equal(Physics.objectManager.getLength(), 0, 'Expect 0 objects');
});
