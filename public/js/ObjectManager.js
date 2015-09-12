/**
 * Manages object creation, deletion, initializtion
 * Example: Physics.objectManager.add(circle);
 */


Physics.objectManager = (function () {
	
	var particles = {};		 //maps IDs to game objects
	var maxLength = 10;		//maximum number of objects that can be stored in particles dictionary
	//assign object an ID, increment nextObjectID, append the object to new objects, 
	//call the object�s initialize 
	var add = function (particle) {
		particle.draw();
		particles[particle.getId()] = particle;
		//console.log("ball " + particles[particle.getId()].getId() + " added");
		//nextID++;
	};
	
	//iterates through list of game objects, new objects, and destroyed objects 
	//and calls the cleanup method for each object
	var destroyAllObjects = function () {
		for (var id in particles) {
			particles[id].cleanup();	//destroy the object
			delete particles[id];		//remove object from dictionary
		}
	};
	
	//looks in the particles dictionary and calls the particle�s cleanup method
	var destroyObjectById = function (id) {
		if (objectExists(id)) {
			particles[id].cleanup();	//destroy the object
			delete particles[id];		//remove object from dictionary
		}
	};
	
	//returns true if object is in dictionary. helps with testing 
	var objectExists = function (id) {
		if (particles[id]) {
			return true;
		} else {
			return false;
		}
	};
	
	//returns an object in particles
	var getObjectById = function (id) {
		return particles[id];
	};
	
	//returns all objects in particles
	var getObjectList = function () {
		for (var id in particles) {
			console.log(particles[id]);
			//return particles[id];
			
		}
	};
	
	//returns the number of particles  
	var length = function () {
		var size = 0
		for (var id in particles) {
			if (particles.hasOwnProperty(id)) {
				size++;
			 }
		}
		return size
	};

	var getMaxLength = function () {
		return maxLength;
	};
	
	//initializes all properties to default values
	var init = function () {
		nextID = 0;
		//add(new Physics.Particle());
	};
	
	//iterates through particles dictionary and calls the draw method on each object
	//helper function for update
	var draw = function () {
		for (var id in particles) {
			particles[id].draw();
		}
	}; 
	
	//iterates through particles dictionary, and compares new position of each unique object pair
	//Then compares particle's new position to the world's boundaries. Example for 4 objects:
	//[0][1], [0][2], [0][3],[0][wall] 
	//[1][2], [1][3], [1][wall]
	//[2][3], [2][wall]
	//[3][wall]
	var update = function () {
		//updtate change in time 
		Physics.Timer.calcElapsedTime();
		//console.log(Physics.Timer.getDt());
		//calculate next position
		for (var id in particles) {
			particles[id].move();
			//Physics.RK4.calcRK4(particles[id]);	
		}	
		
		//detect collisions
		
		for (var i = 0; i < length(); i++) {
			//check each ball for wall collision
			Physics.CollisionManager.resolveBallFixedPointCollision(particles[i]);	
			//this.numChecks++;
			//check each ball pair for collision
			for (var j = i+1; j < length(); j++) {	
				//Physics.CollisionManager.resolveBallToBallCollision(particles[i], particles[j]);
				//this.numChecks++;
			}
		}
		
		//reposition objects on screen
		for (var id in particles) {
			particles[id].update();		
		}
		
		
		//calculate energy in system 
		
		//log data
		
	};
	
	
	var cleanup = function () {
		destroyAllObjects();
	};

	return {
		add: add,
		destroyObjectById: destroyObjectById,
		objectExists: objectExists,
		getObjectById: getObjectById,
		getObjectList: getObjectList,
		length: length,
		maxLength: maxLength,
		init: init,
		update: update,
		cleanup: cleanup,
		particles: particles
	}
	
})();

