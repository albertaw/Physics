/********************************************************************
 * PHYSICS.PARTICLE
 ********************************************************************
 * Provides the blueprint for creating objects that will be used in the world. Object 
 * is modeled after a point particle of uniform density.  Uses the 4th order Runge Kutta 
 * scheme to calculate the trajectory of the particle given an initial position and velocity.
 * Other numerical integration schemes can be implemented in the move functionality.
 * Initial velocity is input by the user which may be derived from a specified force at a
 * specified angle. Also handles collision detection. 
 * Example use: 
 * 1. instantiation: var p = new Particle(1, 2, 3, 4) or Physics.particle.createParticle();
 * 2. creating a timer: var mover = new Physics.timer(this) particle.start()
 *
 */

 var Physics = {};
 
 Physics.particle = (function () {
 
	var x, y, vx, vy;
	var mass = 1;		//default to 1 for easy computation.  Should be initialized in constructor.
	var energy;			//kinetic energy at any time interval
	var radius = 80;
	var circle = document.getElementById("circle");
	
	
	var getX = function () {
		return Math.round(x);
	};
	
	var setX = function (xi) {
		this.x = xi;	//update variable for calculations
		circle.setAttribute("cx", xi);	//update objects position on the screen
	};
	
	var getY = function () {
		return Math.round(y);
	};
	
	var setY = function (yi) {
		this.y = yi;
		circle.setAttribute("cy", yi);/********************************/
	};
	
	var getVx = function () {
		return Math.round(this.vx);
	};
	
	var setVx = function(vxi) {
		this.vx = vxi;
	};
	
	var getVy = function () {
		return Math.round(this.vy); //have to state this so the computer knows what vy is
	};
	
	var setVy = function (vyi) {
		this.vy = vyi;
	};
	
	var getRadius = function () {
		return radius;
	};
	
	var getEnergy = function () {
		return Math.round(energy);
	};
	
	
	/**
	 * calculates total mechanical energy at any given time interval using 1/2 m v^2 + mgh 
	 * where m = mass, v = velocity, g = gravity, and h = height or the y value.
	 */
	var calcEnergy = function () {
		//find the magnitude of the velocity 
		var v = Math.sqrt(vx * vx + vy * vy);
		
		//E = K + U
		energy = (.5 * mass * Math.pow(v, 2)) + (mass * Physics.world.getG() * -1 * y); //multiply by -1 because gravity and height are opposites
	};
	 
	
	/**
	 * Detects if a particle is in contact or outside the boundaries of the "world".
	 * Sets particle's positin to the floor, ceiling, or wall position if in contact.
	 */
	var checkBoundaries = function () {
		
		if(y >= Physics.world.getHeight() - radius) {	//if in collision with bottom edge
			y = Physics.world.getHeight() - radius;		//reposition to edge of floor
			vy *= -.8;		//reverse the particle's velocity
        } else if(y <= radius) {	//if in collision with ceiling
			y = radius;		//reposition to top edge
			vy *= -.8;		//reverse the particle's velocity
		}
		if(x >= Physics.world.getWidth() - radius) { //if in collision with right edge of wall
			x = Physics.world.getWidth() - radius;	//reposition to right edge of wall
			vx *= -.8;		//reverse the particle's velocity
		} else if(x <= radius) {		//if in collision with left edge
			x = radius;		//reposition to left edge
			vx *= -.8;		//reverse particle's velocity
		}
		
		//stopping condition
		//when energy is below n stop the animation.
		if(getEnergy() < 50) {
			stopAnimation();
		}
	};
	 
	var energyXPos = 0;
	var graphEnergy = function () {
		
		//plot the energy
		/*
		var energyYPos = 100 + .001 * energy; //plot the energy from a baseline of 150 or  n px
		var rect = document.createElementNS(svgns, 'rect');
		rect.setAttribute("class", "temp");
		rect.setAttribute("width", 20);
		rect.setAttribute("height", 20);
		rect.setAttribute("x", energyXPos);
		rect.setAttribute("y", energyYPos);
		$('#energy-graph').append(rect);
		energyXPos += 10;
		*/
		
	};
	
	
	
	return {
		getX: getX,
		setX: setX,
		getY: getY,
		setY: setY,
		getVx: getVx,
		setVx: setVx,
		getVy: getVy,
		setVy: setVy,
		getRadius: getRadius,
		getEnergy: getEnergy,
		calcEnergy: calcEnergy,
		checkBoundaries: checkBoundaries
	}
	
})();	

/********************************************************************
 * FOURTH ORDER RUNGE KUTTA
 ********************************************************************
 * calculates the new position by using the initial position and the 
 * velocity found from the previous iteration of calculations. The 
 * velocity is found by using the initial velocity plus the acceleration 
 * calculated from the previous iteration. Acceleration is a function of 
 * the position and velocity. It is calculated with new values of x, y vx 
 * and vy at each iteration.  
 */

	Physics.RK4 = (function () {
		
		var p = Physics.particle;		//to abbreviate namespace
		var x2, x3, x4, y2, y3, y4;  	//value used in 2nd step of RK4 calculations
		var vx2, vx3, vx4, vy2, vy3, vy4;		//velocities used in 2nd step of RK4 calculations
		var ax, ax2, ax3, ax4, ay, ay2, ay3, ay4;		//acceleration used for steps 1-4 in RK4
		
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
			
			return 0;
		};
		
		var calcRK4 = function () {
	
			//a1 = a(p1, v1)
			ax = getAx(p.getX(), p.getVx());	//equals 0
			ay = getAy(p.getY(), p.getVy());	//equals g
					
			//p2 = p1 + v1 * dt/2  	
			x2 = p.getX() + p.getVx() * .5 * dt;  
			y2 = p.getY() + p.getVy() * .5 * dt;
						
			//v2 = v1 + a1 * dt/2		
			vx2 = p.getVx() + ax * .5 * dt;
			vy2 = p.getVy() + ay * .5 * dt;
				
			//a2 = a(p2, v2)
			ax2 = getAx(x2, vx2);	
			ay2 = getAy(y2, vy2);				
			
			//p3 = p1 + v2 * dt/2		
			x3 = p.getX() + vx2 * .5 * dt; 
			y3 = p.getY() + vy2 * .5 * dt;
					
			//v3 = v1 + a2 * dt/2		
			vx3 = p.getVx() + ax2 * .5 * dt;
			vy3 = p.getVy() + ay2 * .5 * dt;
						
			//a3 = a(p3, v3)
			ax3 = getAx(x3, vx3);
			ay3 = getAy(y3, vy3);
			
			//p4 = p1 + v3 * dt	
			x4 = p.getX() + vx3 * dt;
			y4 = p.getY() + vy3 * dt;
					
			//v4 = v1 + a3 * dt	
			vx4 = p.getVx() + ax3 * dt;
			vy4 = p.getVy() + ay3 * dt;
						
			//a4 = a(p4, v4)
			ax4 = getAx(x4, vx4);
			ay4 = getAy(y4, vy4);
					
			//take the average value of all the computed velocities multiplied by dt 
			//and add this to the current position.
			//x(n + 1) = x(n) + (v1 + 2v2 + 2v3 + v4) dt / 6
			var newX = p.getX() + (p.getVx() + 2 * vx2 + 2 * vx3 + vx4) * dt / 6;
			p.setX(newX);
			var newY = (p.getVy() + 2 * vy2 + 2 * vy3 + vy4) * dt / 6;
			p.setY(newY);
			
			//take the average value of all the computed accelerations multiplied by dt 
			//and add this to the current velocity.
			//v(n + 1) = v(n) + (a1 + 2a2 + 2a3 + a4) dt / 6
			var newVx = (ax + 2 * ax2 + 2 * ax3 + ax4) * dt / 6;
			p.setVx(newVx);
			var newVy = (ay + 2 * ay2 + 2 * ay3 + ay4) * dt / 6;
			p.setVy(newVy);
		};
		
		return {
			calcRK4: calcRK4
		}
		
	})();
	

/********************************************************************
 * PHYSICS.WORLD
 *******************************************************************
 * Provides services to the screen to render the world and its objects.  
 * Manages object creation, deletion, initializtion, and event listeners.
 * Manages the timer to handle animating objects.???  Example use: 
 * 1. adding objects to the world: Physics.world.add(new Particle())
 */

 
Physics.world = (function () {

	var height;	//ground level of screen with origin at top left corner 
	var width;
	var g = 0;			//force of gravity, downward is positive relative to computer screen
	var friction;
	var objects;

	return {
		getHeight: function () {
			return height;
		},

		setHeight: function () {
			height = $(window).height();
		},

		getWidth: function () {
			return width;
		},

		setWidth: function () {
			width = $(window).width();  //find out how to get rid of scroll bar and get the dimensions based on compter window size
		},

		getG: function () {
			return g;
		},

		setG: function (g) {
			this.g = g;
		},

		getFriction: function () {
			return friction;
		},

		setFriction: function (f) {
			this.friciton = f;
		},

		add: function () {},
		remove: function () {},
		getObject: function () {},

		init: function () {
			//render the canvas
			
			var canvas = document.getElementById("graph");
			this.setHeight();
			this.setWidth();
			canvas.setAttribute("width", this.getWidth());
			canvas.setAttribute("height", this.getHeight());
			//draw ball particle and add event listeners
			var svgns = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			//var circle = document.createElementNS(svgns, "circle");
			var circle = document.getElementById("circle");
			//circle.setAttribute("cx", this.getWidth() / 2);
			//circle.setAttribute("cy", this.getHeight() / 2);
			//circle.setAttribute("r", Physics.particle.getRadius());
			//circle.setAttribute("stroke", "black");
			//circle.setAttribute("stroke-width", 4);
			//circle.setAttribute("id", "circle");
			//canvas.appendChild(circle);
			Physics.particle.setX(this.getWidth() / 2);
			Physics.particle.setY(this.getHeight() / 2); /************************************/
			Physics.particle.setVx(50);   
			Physics.particle.setVy(-50);
			//$("#vx").val(null);
			//$("#vy").val(null);
		}
	}
})();

/********************************************************************
 * PHYSICS.SCREEN
 ********************************************************************
 * Initializes the world using Physics.world.init().  Draws UI elements and
 * and event listeners to them.  Provides Physics.world with data parsed from UI
 * elements to set any object properties that are taken from them.???
 * Keyboard controlls to manipulate object on screen.  Access objects through
 * Physics.world.getObject()
 */
 
 Physics.screen = (function () {
	
	var maxVelocity = 100;  	//this is a particle's attribute
	var minVelocity = -100;
	//privatic static: Adds the amount specified to the quantity related to the given element
	//TODO make this a plugin that can set min and max value so I can call selector.modifyQty(amt)
	var modifyQty = function (val, selector){
		var qty = selector.val();  //get the current value in the input field
		var newQty = parseInt(qty, 10) + val;	//qty += val, qty-=val
		if (newQty < minVelocity){
			selector.val(minVelocity);
		} else if (newQty > maxVelocity){
			selector.val(maxVelocity);
		//} else if (qty == null){	//TODO check for NAN
			//selector.val(val);
		} else {
			selector.val(newQty); 	//set the value in the input equal to the newQty
		}
		
	};
	
	//functions to put in timer:
	//enable velocitybuttons/field 
	
	//disable velocity buttons when animation starts
	
	//enable disable key controls
 
	
	var initVelocityFields = function () {
		$('#vx').blur(function (){ //hoping this will take care of clicking the + - button and entering text into field
			//parse the number from field
			var num = $("#vx").val();
		
			//if number is outside of our constraintes
			if (num <= maxVelocity && num >= minVelocity) {
				Physics.particle.setVx(num);
				console.log("vx:" + Physics.particle.getVx());
			} else if (num < minVelocity) {	
				//set to the min value
				$("#vx").val(minVelocity);
				Physics.particle.setVx(minVelocity);
				console.log("vx:" + Physics.particle.getVx());
			} else if (num > maxVelocity) {
				//set to max value
				$("#vx").val(maxVelocity);
				Physics.particle.setVx(maxVelocity);
				console.log("vx:" + Physics.particle.getVx());
			}
		});
		
		$('#vy').blur(function (){
			//parse the number from field
			var num = $("#vy").val();
			//if its good set vy
			if (num <= maxVelocity && num >= minVelocity) {
				Physics.particle.setVy(num);
				console.log("vy:" + Physics.particle.getVy());
			} else if(num < minVelocity) {	
				//set to the min value
				$("#vy").val(minVelocity);
				Physics.particle.setVy(minVelocity);
				console.log("vy:" + Physics.particle.getVy());
			} else if(num > maxVelocity) {
				//set to max value
				$("#vy").val(maxVelocity);
				Physics.particle.setVy(maxVelocity);
				console.log("vy:" + Physics.particle.getVy());
			}
		});
	};
		
	var initBtnPlusMinus = function () {	
		$('#btn-plus-vx').click(function (){
			modifyQty(10, $('#vx'));
			//set vx to new value
			Physics.particle.setVx($('#vx').val());
			console.log("vx:" + Physics.particle.getVx());
		});
		
		$('#btn-plus-vy').click(function (){
			modifyQty(10, $('#vy'));
			Physics.particle.setVy($('#vy').val());
			console.log("vy:" + Physics.particle.getVy());
		});
		
		$('#btn-minus-vx').click(function (){
			modifyQty(-10, $('#vx'));
			Physics.particle.setVx($('#vx').val());
			console.log("vx:" + Physics.particle.getVx());
		});
		
		$('#btn-minus-vy').click(function (){
			modifyQty(-10, $('#vy'));
			Physics.particle.setVy($('#vy').val());
			console.log("vy:" + Physics.particle.getVy());
		});
		
		$('#btnStartStop').click(function () {
			handleStartStop();
		});
			
		$('#btnReset').click(function () {
			console.log("reset");
			handleReset();
		});
	};
	
	var handleWindowResize = function () {
		$(window).resize(function () {
			Physics.world.setWidth();
			Physics.world.setHeight();
		});
	};
	
	var initKeyboard = function () {
		var circle = document.getElementById("circle");
		$(document).keydown(function(key){
			var newPos;
			//get height and width
			var maxWidth = Physics.world.getWidth() - Physics.particle.getRadius();		//width = screen width - ball radius
			var maxHeight = Physics.world.getHeight() - Physics.particle.getRadius();	//height = screen height - ball radius
			
			switch(parseInt(key.which,10)){
				case 37:	//left arrow
					newPos = Physics.particle.getX() - Physics.particle.getRadius();		//new x = x pos - ball radius
					if (newPos >= Physics.particle.getRadius()) {							//if new x greater than or equal to ball radius
						Physics.particle.setX(newPos);								//slide left
						//circle.setAttribute("cx", newPos);
						console.log(Physics.particle.getX());
					} else {
						Physics.particle.setX(Physics.particle.getRadius());				//reposition ball to the left edge of screen
						//circle.setAttribute("cx", Physics.particle.getRadius());
					}
					break;
				case 38:	//up arrow
					newPos = Physics.particle.getY() - Physics.particle.getRadius();		//new y = y pos - ball radius
					if(newPos >= Physics.particle.getRadius()) {							//if new y 	is greater than or equal to ball radius
						Physics.particle.setY(newPos);								//slide up
						//circle.setAttribute("cy", newPos);
					} else {
						Physics.particle.setY(Physics.particle.getRadius());				//else repositon ball to top edge of screen
						//circle.setAttribute("cy", Physics.particle.getRadius());
					}
					break;
				case 39:	//right arrow
					newPos = Physics.particle.getX() + Physics.particle.getRadius();		//new x = x pos + radius
					if(newPos <= maxWidth) {										//if new x is less than or equal to screen width
						Physics.particle.setX(newPos);								//slide right
						//circle.setAttribute("cx", newPos);
					} else {
						Physics.particle.setX(maxWidth);							//else reposition to right edge of screen
						//circle.setAttribute("cx", maxWidth);
					}
					break;
				case 40:	//down arrow
					newPos = Physics.particle.getY() + Physics.particle.getRadius();		//new y = y pos + radius
					if(newPos <= maxHeight) {										//if new y less than or equal to screen height
						Physics.particle.setY(newPos);								//slide down
						//circle.setAttribute("cy", newPos);
					} else {
						Physics.particle.setY(maxHeight);							//else reposition ball to bottom edge of screen
						//circle.setAttribute("cy", maxHeight);
					}
					break;
				
				default:
					break;
			}
		
		});
	};
	/*********************************************/
	var printData = function () {
		//$('#time').text(getDt());
		//$('#x-pos').text(getX());
		//$('#y-pos').text(380 - getY());	//subtract current y position from starting y position
		$('#vx').text(Physics.particle.getVx());
		$('#vy').text(Physics.particle.getVy());
		//$('#energy').text(getEnergy());
	
	};
	
	var init =  function () {
			initVelocityFields();
			//initBtnPlusMinus();
			handleWindowResize();
			initKeyboard();
		};
	
	return {
	
		init: init,
		printData: printData,
		modifyQty: modifyQty
	}
	
})();

/********************************************************************
 * PHYSICS.TIMER
 ********************************************************************
 * Handles timekeeping for world and objects.  Particle class would use
 * Physics.timer.getDt to get change in time for physics calculations
 */
 
	var oldTime;		//the time in milliseconds before the execution of the interval
	var currentTime;	//the time in milliseconds once the interval executes its command
	var dt;				//the change in time. Should be the value used for calling the timing function.
	var timer = null;
	var millisecondsPerFrame = 20;
	
	//to initialize time 
	var setTime = function () {
		var date = new Date();
		oldTime = date.getTime();
	};
	
	var calcElapsedTime = function () {
		var date = new Date();
		currentTime = date.getTime();
		dt = (currentTime - oldTime) / 1000;	//divide by 1000 to convert millliseconds into secondd
		oldTime = currentTime;
	};
		
	var getDt = function () {
		return dt;
	};
	
	/*****************************************************
	 * Calculations to run every frame/interval to update the position of the particle,
	 * update the game world and do timekeeping.
	 */
	var move = function () {
		calcElapsedTime();
		Physics.particle.calcEnergy();		
		Physics.RK4.calcRK4();
		Physics.particle.checkBoundaries();
		Physics.particle.setX(Physics.particle.getX());
		Physics.particle.setY(Physics.particle.getY());
		//Physics.screen.printData();
		
	};
	
	var startAnimation = function () {
		//initialize time
		setTime();
		timer = setInterval(move, millisecondsPerFrame);
		$('#btnStartStop').text('Stop Animation');
	};
	
	var stopAnimation = function () {
		clearInterval(timer);
		$('#btnStartStop').text('Start Animation');
        timer = null;
	};
	
	var handleStartStop = function () {
		if(timer === null) {
			startAnimation();
			console.log("animation started");
		} else {
            stopAnimation();
			console.log("animation stopped");
        }
	};
	
	/** Set initial position and velocity to default or input value.  Set graph of energy 
	 * to default values.  Set all RK4 values to null. Set time and energy to zero.  
	 * Clear all intervals and remove plotted points. Update data points in table.  
	 */
	var handleReset = function () {
		stopAnimation();
		//TODO set to input value
		Physics.particle.setX(Physics.world.getWidth() / 2);
		Physics.particle.setY(Physics.world.getHeight() / 2);
		Physics.particle.setVx(0);
		Physics.particle.setVy(0);
		
		//x2, y2, x3, y3, y4, vx2, vy2, vx3, vy3, vx4, vy4 = 0;
		//ax, ay, ax2, ay2, ax3, ay3, ax4, ay4 = 0;
		oldTime = 0;
		currentTime = 0;
		Physics.particle.calcEnergy();  
		//energyXPos = 0;
		//Physics.particle.printData();
		
		//ensure buttons are enabled
		document.getElementById('btnStartStop').disabled = false;
	};
	
	

/********************************************************************
 * MAIN
 *******************************************************************/

$(document).ready(function () {
	//enable all buttons and fields
	//document.getElementById('btnStartStop').disabled = false;
	
	Physics.world.init();
	Physics.screen.init();
	console.log(Physics.particle.getVx());
	console.log(Physics.particle.getRadius());
	
		
		$('#btnStartStop').click(function () {
			handleStartStop();
		});
			
		$('#btnReset').click(function () {
			console.log("reset");
			handleReset();
		});
		/* still causing problems wit
		$('#btn-plus-vx').click(function (){
			Physics.screen.modifyQty(10, $('#vx'));
			//set vx to new value
			Physics.particle.setVx(parseInt($('#vx').val()));
			console.log("vx:" + Physics.particle.getVx());
		});
		
		$('#btn-plus-vy').click(function (){
			Physics.screen.modifyQty(10, $('#vy'));
			Physics.particle.setVy(parseInt($('#vy').val()));
			console.log("vy:" + Physics.particle.getVy());
		});
		
		$('#btn-minus-vx').click(function (){
			Physics.screen.modifyQty(-10, $('#vx'));
			Physics.particle.setVx(parseInt($('#vx').val()));
			console.log("vx:" + Physics.particle.getVx());
		});
		
		$('#btn-minus-vy').click(function (){
			Physics.screen.modifyQty(-10, $('#vy'));
			Physics.particle.setVy(parseInt($('#vy').val()));
			console.log("vy:" + Physics.particle.getVy());
		});
		
	*/
});		

