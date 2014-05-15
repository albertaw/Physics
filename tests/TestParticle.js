module("Physics", {
	setup: function () {
		//code to help run tests
	}
});

test("Particle", function () {
	expect(11);
	
	var p1 = new Physics.Particle();
	p1.setID(0);	//id must be explicitely set since we are not using the particle manager
	p1.init();
	var p2 = new Physics.Particle();
	p2.setID(1);
	p2.init();
	
	
	//1. test that x has been set
	ok(p1.getX() != null); 
	
	//2. test y has been set
	ok(p1.getY() != undefined); 
	
	//3. test vx initialized correctly
	equal(p1.getVx(), 0, "Expect values to match");
	
	//4. test that particle's x value is changed
	p1.setX(80);
	equal(p1.getX(), 80, "Expect the values to match");
	
	//5. test vx is updated 
	p1.setX(-100);
	equal(p1.getX(), -100, "Expect values to match");
	
	//6. test that particle's id 
	equal(p1.getID(), 0, "Expect the values to match");
	
	//7. test the circleId for p1
	equal(p1.getCircleID(), "circle0", "Expect values to match");
	
	//8. test second particle's id
	equal(p2.getID(), 1, "Expect values to match");
	
	//9. test second particle's circleId
	equal(p2.getCircleID(), "circle1", "Expect values to match");
	
	//10. call destroy and see if object is in document
	p1.destroy();
	equal(document.getElementById('circle0'), null, "Expect values to match");
	
	//11. test if cleanup destroys object
	p2.cleanup();
	equal(document.getElementById('circle1'), null, "Expect values to match");
	
	
});

test("ParticleManager", function () {
	expect(9);
	//create 4 objects and add them to the manager
	Physics.ParticleManager.init() 
	var p1 = Physics.ParticleManager.getObjectById(0);
	//Physics.ParticleManager.add(p1);
	var p2 = new Physics.Particle();
	Physics.ParticleManager.add(p2);
	var p3 = new Physics.Particle();
	Physics.ParticleManager.add(p3);
	var p4 = new Physics.Particle();
	Physics.ParticleManager.add(p4);
	var length = Physics.ParticleManager.length();
	
	//print object list to console
	Physics.ParticleManager.getObjectList();
	
	//1. test that there are four objects in the dicitonary
	equal(length, 4, "Extect values to match");
	
	//2. test if there is an object in the first index
	equal(Physics.ParticleManager.objectExists(0), true, "Expect true");
	
	//3. test if there is an object in the last index
	equal(Physics.ParticleManager.objectExists(3), true, "Expect true");
	
	//4. test the values of one of the objects
	var vx = Physics.ParticleManager.getObjectById(1).getVx();
	equal(vx, 0, "Expect values to match");
	var id = Physics.ParticleManager.getObjectById(2).getID();
	//5.
	equal(id, 2, "Expect values to match");
	
	//6. test that there are 10 collision calculations for 4 objects
	Physics.ParticleManager.update();
	equal(Physics.ParticleManager.numChecks, 10, "Expect values to match"); 
	
	//7. test that object is not in dictionary once destroyed
	Physics.ParticleManager.destroyObjectById(3);
	equal(Physics.ParticleManager.objectExists(3), false, "Expect values to match");
	
	//8. test that the lenght of the dictionary is updated once an object is destroyed
	equal(Physics.ParticleManager.length(), 3, "Expect values to match");
	
	//9. test that all objects are deleted from dictionary on cleanup
	Physics.ParticleManager.cleanup();
	equal(Physics.ParticleManager.length(), 0, "Expect values to match");
});

test("World", function () {
	
	expect(3);
	Physics.World.setG(10);
	//1. test that gravity is set correctly
	equal(Physics.World.getG(), 10, "Expect values to match");
	$('#dom-test').show();
	world = $("#world");
	world.css("width",Physics.World.getWidth());
	world.css("height", Physics.World.getHeight());
	
	//2. test width of svg element is the width of the window
	equal(world.css("width"), Physics.World.getWidth() + "px", "Expect values to match");
	console.log("height:" + Physics.World.getHeight());
	//3. test that the height of the svg is set to height of the window
	equal(world.css("height"), Physics.World.getHeight() + "px", "Expect values to match");
});

test("InputManager", function () {
	expect(10);
	//must be initialzed so that that there is an object to attach listeners to
	Physics.ParticleManager.init();	
	Physics.InputManager.init();
	//1. test that the vx field value = 0
	equal($('#vx').val(), 0, "Expect values to match");
	
	//2. test that the vy field value = 0
	equal($('#vy').val(), 0, "Expect values to match");
	
	//3. test clicking btn-vx-plus 
	$('#btn-plus-vx').trigger('click');
	equal($('#vx').val(), 10, "Expect values to match");
	
	//4. test clikcing btn-vx-minus
	$('#vx').val(0);
	$('#btn-minus-vx').trigger('click');
	equal($('#vx').val(), -10, "Expect values to match");
	
	//5. test clicking btn-vy-plus 
	$('#btn-plus-vy').trigger('click');
	equal($('#vy').val(), 10, "Expect values to match");
	
	//6. test clikcing btn-vy-minus
	$('#vy').val(0);
	$('#btn-minus-vy').trigger('click');
	equal($('#vy').val(), -10, "Expect values to match");
	
	//7. test clicking btn-vx-plus when value = 100
	$('#vx').val(100);
	$('#btn-plus-vx').trigger('click');
	equal($('#vx').val(), 100, "Expect values to match");
	
	//8. test clikcing btn-vx-minus when value = -100
	$('#vx').val(-100);
	$('#btn-minus-vx').trigger('click');
	equal($('#vx').val(), -100, "Expect values to match");
	
	//9. test clicking btn-vy-plus when value = 100
	$('#vy').val(100);
	$('#btn-plus-vy').trigger('click');
	equal($('#vy').val(), 100, "Expect values to match");
	
	//10. test clikcing btn-vy-minus when value = -100
	$('#vy').val(-100);
	$('#btn-minus-vy').trigger('click');
	equal($('#vy').val(), -100, "Expect values to match");
	
	//teardown
	Physics.ParticleManager.cleanup();
	
});
