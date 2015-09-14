/**
 * Manages object creation and deletion
 * Example: Physics.objectManager.add(circle);
 */

var Physics = Physics || {};
Physics.objectManager = (function () {
	
	var particles = [];		 //maps IDs to game objects
	//assign object an ID, increment nextObjectID, append the object to new objects, 
	//call the object�s initialize 
	var add = function (particle) {
		particle.draw();
		particles.push(particle);
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
	var getLength = function () {
		var size = 0
		for (var id in particles) {
			if (particles.hasOwnProperty(id)) {
				size++;
			 }
		}
		return size
	};

	//initializes all properties to default values
	var init = function () {
		//update();

	};
	
	//iterates through particles dictionary and calls the draw method on each object
	//helper function for update
	var draw = function () {

		for (var id in particles) {
			particles[id].draw();
		}
	}; 
	

	var update = function () {
		//updtate change in time
		Clock.calcElapsedTime();
		//console.log(Physics.Clock.getDt());
		//calculate next position
		for (var id in particles) {
			particles[id].move();
			Physics.behaviors.resolveBallFixedPointCollision(particles[id]);
			//Physics.integrators.calcRK4(particles[id]);
		}

		//iterates through particles dictionary, and compares new position of each unique object pair
		//Then compares particle's new position to the world's boundaries. Example for 4 objects:
		//[0][1], [0][2], [0][3],[0][wall]
		//[1][2], [1][3], [1][wall]
		//[2][3], [2][wall]
		//[3][wall]
		for (var i = 0; i < getLength() - 1; i++) {
			//check each ball pair for collision
			for (var j = i+1; j < getLength(); j++) {
				Physics.behaviors.resolveBallToBallCollision(particles[i], particles[j]);
			}
			//check each ball for wall collision

		}

		//reposition objects on screen
		for (var i = 0; i < getLength(); i++) {
			particles[i].update();
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
		getLength: getLength,
		init: init,
		update: update,
		cleanup: cleanup
	}
	
})();
