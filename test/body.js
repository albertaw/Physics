QUnit.module("Physics.particle");

var options = {
	x: 100,
	y: 500,
	vx: 10,
	vy: 50
};

var p = new Physics.body(options);

test('object instantiation', function (assert) {
	assert.ok(p, "creates an object");
});

test('x position', function () {
	equal(p.getX(), 100, 'Expect x to equal 100');
	p.setX(50);
	equal(p.getX(), 50, 'Expect x to equal 50');
});

test('y position', function () {
	equal(p.getY(), 500, 'Expect y to equal 500');
	p.setY(100);
	equal(p.getY(), 100, 'Expect y to equal 100');
});

test('vx', function () {
	equal(p.getVx(), 10, 'Expect vx to equal 10');
	p.setVx(100);
	equal(p.getVx(), 100, 'Expect vx to equal 100');
});

test('vy', function () {
	equal(p.getVy(), 50, 'Expect vy to equal 50');
	p.setVy(100);
	equal(p.getVy(), 100, 'Expect vy to equal 100');
});

test('radius', function () {
	equal(p.getRadius(), 80, 'Expect radius to equal 80');
	p.setRadius(50);
	equal(p.getRadius(), 50, 'Expect radius to equal 50');
});

test('mass', function () {
	equal(p.getMass(), 1,'Expect mass to equal 1');
	p.setMass(10);
	equal(p.getMass(), 10,'Expect mass to equal 10');
});

test('id', function () {
	equal(p.getId(), 0, 'Expect id to equal 0');
	p.setId(1);
	equal(p.getId(), 1, 'Expect id to equal 1');
});

test('circleId', function () {
	equal(p.getCircleId(), 'circle0', 'Expect circle id to equal circle0');
	p.setCircleId('circle');
	equal(p.getCircleId(), 'circle', 'Expect circle id to equal circle');
});

