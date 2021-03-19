var Physics = Physics || {};

Physics.util = (function () {

	var radius = 80;

	var randomX = function () {
		var maxX = Physics.world.getWidth() - radius;
		var x = Math.floor(Math.random() * maxX);	//find a number between the length of the radius and wall
		if(x < radius) {		//if in collision with left edge
			x = radius;				//reposition to left edge
		}
		return x;
	};

	var randomY = function () {
		var maxY = Physics.world.getHeight() - radius;
		var y = Math.floor(Math.random() * maxY);
		if(y < radius) {	//if in collision with ceiling
			y = radius;
		}
		return y;
	};

	return {
		randomX: randomX,
		randomY: randomY
	}
	
})();


/**
 * Physical properties of the environment
 */

Physics.world = (function () {

	var height;	//ground level of screen with origin at top left corner 
	var width;
	var g = 0;			//force of gravity, downward is positive relative to computer screen
	var friction;

	var	getHeight = function () {
		this.height = $(window).height();
		return this.height;
	};
	
	//should always be 100%
	var	getWidth = function () {
		this.width = $(window).width();
		return this.width;
	};

	var	getG = function () {
		return g;
	};

	var	setG = function (g) {
		this.g = g;
	};

	var init = function (options) {
		this.g = 0;
		this.friction = 0;
		this.draw();

	};
		
	var	draw = function () {
		var world = document.getElementById("world");

		//set style elements
		world.setAttribute("width", "100%");
		world.setAttribute("height", getHeight());
	};
		
	var	update = function () {
		this.draw();
	};
		
	var	cleanup = function () {
		
	};
	
	return {

		getHeight: getHeight,
		getWidth: getWidth,
		getG: getG,
		setG: setG,
		init: init,
		draw: draw,
		update: update,
		cleanup: cleanup
		
	};

})();


/**
 * Detects if a particle is in contact or outside the boundaries of the "world".
 * Sets particle's position to the floor, ceiling, or wall position if in contact.
 * Ex. resolveBallFixedPointCollision(Physics.ParticleManager.particles[i]);
 */

Physics.behaviors = (function () {

	//factor between 0 and 1 to account for energy loss in collision.
	//0 for completely inelastic collision, 1 for elastic collision.
	var elasticity;

	var resolveBallWallCollision = function (ball) {

		if (ball.getX() >= Physics.world.getWidth() - ball.getRadius()) {	//if in collision with right edge of wall
			var x = Physics.world.getWidth() - ball.getRadius();	//reposition to right edge of wall
			ball.setX(x);
			var vx = ball.getVx() * -1;		//reverse the particle's direction and reduce speed
			ball.setVx(vx);
		} else if (ball.getX() <= ball.getRadius()) {		//if in collision with left edge
			var x = ball.getRadius();		//reposition to left edge
			ball.setX(x);
			var vx = ball.getVx() * -1;		//reverse the particle's direction and reduce speed
			ball.setVx(vx);
		}

		if(ball.getY() >= Physics.world.getHeight() - ball.getRadius()) {	//if in collision with bottom edge
			var y = Physics.world.getHeight() - ball.getRadius();		//reposition to edge of floor
			ball.setY(y);
			var vy = ball.getVy() * -1;		//reverse the particle's direction and reduce speed
			ball.setVy(vy);

        } else if(ball.getY() <= ball.getRadius()) {	//if in collision with ceiling
			var y = ball.getRadius();		//reposition to top edge
			ball.setY(y);
			var vy = ball.getVy() * -1;		//reverse the particle's direction and reduce speed
			ball.setVy(vy);
		}
		
		//console.log("wall checked");
	};
	
	//detect collision: the centers of 2 circles are r1 + r2 units apart at point of collision
	//distance between the objects is obj.pos1 - obj.pos2
	//if distance <= r then there is a collision swap the velocities
	var resolveBallToBallCollision = function (ball1, ball2) {
		//console.log(ball1.getId() + " " + ball2.getId() + " checked");
		var r = ball1.getRadius() + ball2.getRadius(),
			x1 = ball1.getX(),
			x2 = ball2.getX(),
			y1 = ball1.getY(),
			y2 = ball2.getY(),
			//distance between both balls
			d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
			//overlap of both balls
			l = r - d,
			ux1 = ball1.getVx(),
			ux2 = ball2.getVx(),
			uy1 = ball1.getVy(),
			uy2 = ball2.getVy(),
			//amount to move ball 1
			//! does not work when both vy or both vx are the same
			sx1 = - ux1 / Math.abs(ux1 - ux2) * l,
			sy1 = - uy1 / Math.abs(uy1 - uy2) * l,
			//amount to move ball 2
			sx2 = - ux2 / Math.abs(ux1 - ux2) * l,
			sy2 = - uy2 / Math.abs(uy1 - uy2) * l;

			if (d <= r) {
				//reposition balls
				ball1.setX(x1 + sx1);
				ball1.setY(y1 + sy1);
				ball2.setX(x2 + sx2);
				ball2.setY(y2 + sy2);
				//exchange velocities
				ball1.setVx(ux2);
				ball1.setVy(uy2);
				ball2.setVx(ux1);
				ball2.setVy(uy1);
				/*console.log('x1: ' + sx1 + ' y1:' + sy1 + ' x2:' + sx2 + ' y2:' + sy2);
				Clock.stop();
				console.log('embedded');
				setTimeout(function () {
					Clock.start(Physics.objectManager.update);
				}, 1000);
				*/
		}
	};
	
	return {
		resolveBallFixedPointCollision: resolveBallWallCollision,
		resolveBallToBallCollision: resolveBallToBallCollision
	}
	
})();

/**
 * Factory class for creating objects
 * Example: var p = new Physics.body(1, 2, 0, 0)
 */

 Physics.body = (function () {

	//private static attribute
	var nextId = 0;
	
	//constructor
	return function (options) {

		//private attributes
		var x = options.x || 0;
		var y = options.y || 0;
		var vx = options.vx || 0;
		var vy = options.vy || 0;
		var mass = options.mass || 1;
		var radius = options.radius || 80;
		var id;
		var circleId;
		var energy;			//kinetic energy at any time interval
		var skipUpdate;		//used if the particle is stationary 
		var skipDraw;
		var svgns = "http://www.w3.org/2000/svg";	//svg namespace for initializing circles

			
		this.getX = function () {
			return x;
		};
		
		this.setX = function (xi) {
			x = xi;	//update variable for calculations
		};
		
		this.getY = function () {
			return y;
		};
		
		this.setY = function (yi) {
			y = yi;
		};
		
		this.getVx = function () {
			return vx;
		};
		
		this.setVx = function(vxi) {
			vx = vxi;
		};
		
		this.getVy = function () {
			return vy;
		};
		
		this.setVy = function (vyi) {
			vy = vyi;
		};

		this.getV = function () {
			return Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
		};
		
		this.getRadius = function () {
			return radius;
		};
		
		this.setRadius = function (r) {
			radius = r;
		};

		this.getMass = function () {
			return mass;
		};

		this.setMass = function (massi) {
			mass = massi;
		};

		this.getEnergy = function () {
			return Math.round(energy);
		};

		this.setEnergy = function (e) {
			energy = e;
		}
		
		this.getId = function () {
			return id;
		}
		
		this.setId = function (idNum) {
			id = idNum;
		};
		
		this.getCircleId = function () {
			return circleId;
		};

		this.setCircleId = function (id) {
			circleId = id;
		}
		
		//calculates total mechanical energy at any given time interval using 1/2 m v^2 + mgh 
		//where m = mass, v = velocity, g = gravity, and h = height or the y value.
		this.calcEnergy = function () {
			//find the magnitude of the velocity 
			var v = Math.sqrt(vx * vx + vy * vy);
			
			//Energy = Kinetic Energy + Potential Energy
			var e = (.5 * Math.pow(v, 2)) + (Physics.world.getG() * -1 * y); //multiply by -1 because gravity and height are opposites
			this.setEnergy(e);
		};
		
		//deallocates particle from memory, removes element from world
		this.destroy = function () {
			var circle = document.getElementById(this.circleID);
			document.getElementById('world').removeChild(circle);
		};
		
		//takes a particle object and updates position and velocity using specified scheme, 
		this.move = function () {
			Physics.integrators.calcRK4(this);
			//this.update();
			//console.log("I moved");
		};

		function drawSvg () {
			//set the circle's attributes to the particle's attributes
			var circle = document.createElementNS(svgns, 'circle');

			circle.setAttribute('cx', x);
			circle.setAttribute('cy', y);
			circle.setAttribute('r', radius);
			circle.setAttribute('stroke', 'black');
			circle.setAttribute('stroke-width', 2);
			circle.style.fill = "white";
			circle.setAttribute('id', circleId);

			document.getElementById("world").appendChild(circle);
			//console.log('circle drawn');
		}

		function drawDom () {
			var circle = document.createElement('div');
			circle.id = circleId;
			circle.className = 'circle';
			circle.style.left = x + 'px';
			circle.style.top = y + 'px';
			circle.style.width = 2 * radius + 'px';
			circle.style.height = 2 * radius + 'px';
			document.getElementById("world").appendChild(circle);
		}

		this.draw = function () {
			drawSvg();
		}



		// draws object, updates momentum and energy on every keyframe or when 
		//setting object prior to animating, or when refreshing.  
		this.update = function () {
			
			document.getElementById(circleId).setAttribute('cx', x);
			document.getElementById(circleId).setAttribute('cy', y);
			//document.getElementById(circleId).style.left = x + 'px';
			//document.getElementById(circleId).style.top = y + 'px';

			this.calcEnergy();
			//stopping condition
			//when energy is below n stop the animation.
			//if(this.getEnergy() < 30) {
			//	this.setVx(0);
			//	this.setVy(0);
			//}
			//console.log(this.getEnergy());
			
		};
		
		//calls particle’s destroy method. Term “cleanup” used for convenience and consistency
		//in order to iterate over the cleanup method of all objects and managers
		this.cleanup = function () {
			var elem = document.getElementById(this.getCircleId());
			var parent = elem.parentNode;
			parent.removeChild(elem);
		};

		this.setId(nextId);
		this.setCircleId('circle' + id);
		nextId++;
		//console.log("particle initialized");
		
	};//end function
	
	
})();


/**
 * Manages object creation and deletion
 * Example: Physics.objectManager.add(circle);
 */

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



Physics.integrators = (function () {
		/**
		 * Calculates the sum of forces acting on the particle during a given time
		 * interval in the x direction and computes acceleration using Newton's Second
		 * law Fnet = ma. Forces could include friction, spring, drag, thrust.  
		 * 
		 * @param x position
		 * @param vx velocity
		 * @return x component of acceleration
		 */
		var getAx = function (x, vx) {
			 return 0;	//default to zero since I am not accounting for any other force
		};
		
		/**
		 * Calculates sum of forces acting on the particle in the y direction using Fnet = ma
		 * Forces could include weight, lift, Buoyant force.
		 * 
		 * @param y position
		 * @param vy velocity
		 * @return y component of acceleration
		 */
		var getAy = function (y, vy){
			
			return Physics.world.getG();
		};

		/**
		 * FOURTH ORDER RUNGE KUTTA
		 *
		 * calculates the new position by using the initial position and the
		 * velocity found from the previous iteration of calculations. The
		 * velocity is found by using the initial velocity plus the acceleration
		 * calculated from the previous iteration. Acceleration is a function of
		 * the position and velocity. It is calculated with new values of x, y vx
		 * and vy at each iteration.
		 */
		var calcRK4 = function (particle) {
			var x = particle.getX();
			var y = particle.getY();
			var vx = particle.getVx();
			var vy = particle.getVy(); 
			//console.log(particle.getId() + ' x:' + x + ' y:' + y + ' vx:' + vx + ' vy:' + vy);
			var dt = Clock.getDt();
			
			//var dt = .02;
			//console.log('dt:' + dt);
			
			//a1 = a(p1, v1)
			var ax = getAx(x, vx);	//equals 0
			var ay = getAy(y, vy);	//equals g
					
			//p2 = p1 + v1 * dt/2  	
			var x2 = x + vx * .5 * dt;  
			var y2 = y + vy * .5 * dt;
						
			//v2 = v1 + a1 * dt/2		
			var vx2 = vx + ax * .5 * dt;
			var vy2 = vy + ay * .5 * dt;
				
			//a2 = a(p2, v2)
			var ax2 = getAx(x2, vx2);	
			var ay2 = getAy(y2, vy2);				
			
			//p3 = p1 + v2 * dt/2		
			var x3 = x + vx2 * .5 * dt; 
			var y3 = y + vy2 * .5 * dt;
					
			//v3 = v1 + a2 * dt/2		
			var vx3 = vx + ax2 * .5 * dt;
			var vy3 = vy + ay2 * .5 * dt;
						
			//a3 = a(p3, v3)
			var ax3 = getAx(x3, vx3);
			var ay3 = getAy(y3, vy3);
			
			//p4 = p1 + v3 * dt	
			var x4 = x + vx3 * dt;
			var y4 = y + vy3 * dt;
					
			//v4 = v1 + a3 * dt	
			var vx4 = vx + ax3 * dt;
			var vy4 = vy + ay3 * dt;
						
			//a4 = a(p4, v4)
			var ax4 = getAx(x4, vx4);
			var ay4 = getAy(y4, vy4);
					
			//take the average value of all the computed velocities multiplied by dt 
			//and add this to the current position.
			//x(n + 1) = x(n) + (v1 + 2v2 + 2v3 + v4) dt / 6
			var newX = x + ((vx + 2 * vx2 + 2 * vx3 + vx4) * dt / 6);
			//console.log('new x:' + newX);
			particle.setX(newX);
			var newY = y + ((vy + 2 * vy2 + 2 * vy3 + vy4) * dt / 6);
			particle.setY(newY);
			
			//take the average value of all the computed accelerations multiplied by dt 
			//and add this to the current velocity.
			//v(n + 1) = v(n) + (a1 + 2a2 + 2a3 + a4) dt / 6
			var newVx = vx + ((ax + 2 * ax2 + 2 * ax3 + ax4) * dt / 6);
			particle.setVx(newVx);
			var newVy = vy + ((ay + 2 * ay2 + 2 * ay3 + ay4) * dt / 6);
			particle.setVy(newVy);
			//console.log("vx:" + particle.getVx() + "vy:" + particle.getVy());
		};
		
		var init = function () {
			console.log("integrators initialized");
		};
		
		return {
			calcRK4: calcRK4,
			init: init
		}
		
})();

/**
 * Handles timekeeping for world and objects.   Whatever is calculating 
 * the move would use Physics.timer.getDt to get change in time 
 */

var Clock = (function () {
	
	var oldTime = 0;		//the time in milliseconds before the execution of the interval
	var currentTime = 0;	//the time in milliseconds once the interval executes its command
	var dt = 0;				//the change in time. Should be the value used for calling the timing function.
	var timer = null;
	var millisecondsPerFrame = 20;
	//var date = new Date();
	
	var calcElapsedTime = function () {
		var date = new Date();
		currentTime = date.getTime();
		dt = (currentTime - oldTime) / 1000;	//divide by 1000 to convert millliseconds into seconds
		oldTime = currentTime;

	};
		
	var getDt = function () {
		//calcElapsedTime();
		return dt;
	};
	
	var start = function (fn) {
		var date = new Date();
		currentTime = date.getTime();
		oldTime = currentTime;
		if (timer == null) {
			timer = setInterval(fn, millisecondsPerFrame);
			console.log('timer initialized');
		}
	};
	
	var stop = function () {
		if (timer != null) {
			clearInterval(timer);
			timer = null;
		}
	};
	
	var init = function () {
		//initialize time
		
		start();
	};
	
	
	var cleanup = function () {
		stop();
	};
	
	return {
		start: start,
		stop: stop,
		getDt: getDt,
		calcElapsedTime: calcElapsedTime,
		init: init,
		cleanup: cleanup
		
	}
	
})();


/** The input manager handles the detection of raw input from the device
  * and allows for the registration of objects to be notified of input events
  */

Physics.InputManager = (function () {
	var clicked = false;
	var clickX;
	var clickY;
	var dx;
	var dy;
	var minVelocity = -100;
	var maxVelocity = 100;
	
	var ondragstart = function (e) {
		//onmousedown get the position of the cursor
		e.preventDefault(); // Needed for Firefox to allow dragging correctly
        clicked = true;
		clickX = e.clientX; 
		clickY = e.clientY;
		//set clicked = true
		console.log("ondragstart triggered");
	};
	
	var ondrag = function (e) {
		//onmousemove update the position to
		//current position + the change in position 
		//which is the position of the cursor - the position at ondragstart
		e.preventDefault();
        if(clicked){
          //  dx = e.clientX - clickX;
           // dy = e.clientY - clickY;

            e.target.setAttribute("transform", "translate(" + moveX + "," + moveY + ")");
		}
	};
	var ondrop = function () {
		//onmouseup set clicked = false
		clicked = false;
	};
	
	//input field settings
	
	//Requires that the particles dictionary is not at its max capicity
	//inititalizes a new ball and draws it on the screen
	var addBall = function () {
		Physics.ParticleManager.add(new Physics.Particle());
	};
	
	//Requires that there are at least two balls on the screen
	//looks for the first existing ball to destroy
	var removeBall = function () {
		var id = Physics.ParticleManager.length() - 1;
		if (id !=0) {
			Physics.ParticleManager.destroyObjectById(id);
			console.log("ball " + id + "destroyed");
			Physics.ParticleManager.nextID--;	//must be updated to maintain uninterrupted sequence of numbers when adding back balls
		}
	};
	
	//Requires the fields to have an initial numeric value. Value of field cannnot
	//exceed set max or value. Inputs a number and adds its value to the value of the
	//element, then sets particle's velocity to value of field.
	var handleQuantityChanged = function (val, element) {
		var qty = parseInt(element.val(), 10);  //get the current value in the field
								//set initial value to 0 if null, undefined, or NAN
		var newQty = qty + val;	//qty += val
		if (newQty < minVelocity) {	//check that the the new number is not less than our min
			element.val(minVelocity);
		} else if (newQty > maxVelocity) {	//check that the new number is not greater than our max
			element.val(maxVelocity);
		} else {
			element.val(newQty); 	//set the value in the input equal to the newQty
		}
		
	};
	
	//toggles between play and pause
	var handleStartStop = function () {
		if ($('#btnStartStop').attr('src') == "img/play.png") {
			$('#btnStartStop').attr('src', "img/pause.png")	//change to pause button
			//start animation
			Physics.Clock.init();
		} else {
			$('#btnStartStop').attr('src', "img/play.png")	//change to play button
			//pause animation
			Physics.Clock.cleanup();
		}
	};
	
	var addKeyboardListener;
	var addMouseListener = function () {
		//ondragstart(event);
		//ondrag(event);
		//ondrop();
		$('#btn-plus-vx').click(function () {
			handleQuantityChanged(10, $('#vx'));
			//update particle vx
			Physics.ParticleManager.particles[0].setVx($('#vx').val());
			console.log(Physics.ParticleManager.particles[0].getVx());
		});
		
		$('#btn-plus-vy').click(function () {
			handleQuantityChanged(10, $('#vy'));
			Physics.ParticleManager.particles[0].setVy($('#vy').val());
			console.log(Physics.ParticleManager.particles[0].getVy());
		});
		
		$('#btn-minus-vx').click(function () {
			handleQuantityChanged(-10, $('#vx'));
			Physics.ParticleManager.particles[0].setVx($('#vx').val());
			console.log(Physics.ParticleManager.particles[0].getVx());
		});
		
		$('#btn-minus-vy').click(function () {
			handleQuantityChanged(-10, $('#vy'));
			Physics.ParticleManager.particles[0].setVy($('#vy').val());
			console.log(Physics.ParticleManager.particles[0].getVy());
		});
		
		$('#btnStartStop').click(function () {
			handleStartStop();
		});
		
		$(window).resize(function () {
			Physics.world.update();
		
		});

		$('#add').click(function () {
			addBall();
		});
		
		$('#remove').click(function () {
			removeBall();
		});
	};
	
	
	var removeKeyboardListener;
	var removeMouseListener;
	
	//the previous state for all input devices is saved then the input devices 
	//are polled and compared to their previous states. If there are any 
	//discrepancies between the two states of the device, then some kind of input 
	//event has taken place and the appropriate events will be triggered.
	var update;

	
	var init = function () {
		//initialize button and field values
		$('#vx').val(0);
		$('#vy').val(0);
		//addKeyboardListener();
		addMouseListener();
	};
	
	var cleanup = function () {
		//removeKeyboardListener
		//removeMouseListener
	};


	return {
		init: init
	}

})();

