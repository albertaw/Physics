/**
 * Class creates an object that can be modeled after a point particle of uniform 
 * density and uses the 4th order Runge Kutta scheme to calculate the trajectory 
 * of the particle given an initial x and y position and initial velocity x and 
 * velocity y. Prints values of these points at each time step to a file.
 * 
 * @author Alberta Williams
 * last modified 4/22/2014
 */

 var Physics = {};

	
	/********************************************
	 * 			PARTICLE PROPERTIES
	 *******************************************/
	var x;		//current/initial positions 
	var y;
	var x2;		//value used in 2nd step of integrators calculations
	var y2;
	var x3;		//value used in 3rd step of integrators calculations
	var y3;
	var x4;		//value used in 4th step of integrators calculations
	var y4;
	var vx;		//current/initial velocities
	var vy;
	var vx2;		//value used in 2nd step of integrators calculations
	var vy2;
	var vx3;		//value used in 3rd step of integrators calculations
	var vy3;
	var vx4;		//value used in 4th step of integrators calculations
	var vy4;
	var ax;		//acceleration calculated from initial position and velocity
	var ay;
	var ax2;		//value used in 2nd step of integrators calculations
	var ay2;
	var ax3;		//value used in 3rd step of integrators calculations
	var ay3;
	var ax4;		//value used in 4th step of integrators calculations
	var ay4;
	var mass = 1;	//default to 1 for easy computation.  Should be initialized in constructor.
	var g = 0;		//force of gravity, downward is positive relative to computer screen
	var currentTime = 0;	//the time in seconds at the start of the execution of the interval
	var dt = .2;		//the change in time. Should be the value used for calling the timing function.
	var energy;		//kinetic energy at any time interval
	var minHeight = 400;	//ground level of screen with origin at top left corner
	var millisecondsPerFrame = 20;
	var radius = 80;
	var circle = document.getElementById("circle");
	
	/*******************************************
	 * 			GETTERS AND SETTERS
	 ******************************************/
	
	//Big Decimal class used to format numbers to 2 decimal places for consistency
	function getX() {
		return Math.round(x);
	}
	
	function setX(xi) {
		this.x = xi;
		circle.setAttribute("cx", xi);
	}
	
	function getY() {
		return Math.round(y);
	}
	
	function setY(yi) {
		this.y = yi;
		circle.setAttribute("cy", yi);
	}
	
	function getVx() {
		return Math.round(vx);
	}
	
	function setVx(vxi) {
		this.vx = vxi;
	}
	
	function getVy() {
		return Math.round(vy);
	}
	
	function setVy(vyi) {
		this.vy = vyi;
	}
	
	function getTime() {
		return Math.round(currentTime);
	}
	
	function getEnergy() {
		return Math.round(energy);
	}
	
	/********************************************
	 *				PHYSICS
	 *******************************************/
	 
	/**
	 * Calculates the sum of forces acting on the particle during a given time
	 * interval in the x direction and computes acceleration using Newton's Second
	 * law Fnet = ma. Forces could include friction, spring, drag, thrust.  
	 * 
	 * @param x position
	 * @param vx velocity
	 * @return x component of acceleration
	 */
	function getAx(x, vx) {
		 return 0;	//default to zero since I am not accounting for any other force
	}
	
	/**
	 * Calculates sum of forces acting on the particle in the y direction using Fnet = ma
	 * Forces could include weight, lift, Buoyant force.
	 * 
	 * @param y position
	 * @param vy velocity
	 * @return y component of acceleration
	 */
	function getAy(y, vy){
		
		return g;	//for now I am only accounting for gravity
	}
	
	/**
	 * The fourth order Runge Kutta scheme calculates the new position by using the 
	 * initial position and the velocity found from the previous iteration of calculations.  
	 * The velocity is found by using the initial velocity plus the acceleration calculated 
	 * from the previous iteration. Acceleration is a function of the position and velocity. 
	 * It is calculated with new values of x, y vx and vy at each iteration.  
	 */
	function calcRK4() {
		
		//a1 = a(p1, v1)
		ax = getAx(x, vx);	//equals 0
		ay = getAy(y, vy);	//equals g
				
		//p2 = p1 + v1 * dt/2  	
		x2 = x + vx * .5 * dt;  
		y2 = y + vy * .5 * dt;
					
		//v2 = v1 + a1 * dt/2		
		vx2 = vx + ax * .5 * dt;
		vy2 = vy + ay * .5 * dt;
			
		//a2 = a(p2, v2)
		ax2 = getAx(x2, vx2);	
		ay2 = getAy(y2, vy2);				
		
		//p3 = p1 + v2 * dt/2		
		x3 = x + vx2 * .5 * dt; 
		y3 = y + vy2 * .5 * dt;
				
		//v3 = v1 + a2 * dt/2		
		vx3 = vx + ax2 * .5 * dt;
		vy3 = vy + ay2 * .5 * dt;
					
		//a3 = a(p3, v3)
		ax3 = getAx(x3, vx3);
		ay3 = getAy(y3, vy3);
		
		//p4 = p1 + v3 * dt	
		x4 = x + vx3 * dt;
		y4 = y + vy3 * dt;
				
		//v4 = v1 + a3 * dt	
		vx4 = vx + ax3 * dt;
		vy4 = vy + ay3 * dt;
					
		//a4 = a(p4, v4)
		ax4 = getAx(x4, vx4);
		ay4 = getAy(y4, vy4);
				
		//take the average value of all the computed velocities multiplied by dt 
		//and add this to the current position.
		//x(n + 1) = x(n) + (v1 + 2v2 + 2v3 + v4) dt / 6
		x += (vx + 2 * vx2 + 2 * vx3 + vx4) * dt / 6;
		y += (vy + 2 * vy2 + 2 * vy3 + vy4) * dt / 6;
		
		//take the average value of all the computed accelerations multiplied by dt 
		//and add this to the current velocity.
		//v(n + 1) = v(n) + (a1 + 2a2 + 2a3 + a4) dt / 6
		vx += (ax + 2 * ax2 + 2 * ax3 + ax4) * dt / 6;		 		
		vy += (ay + 2 * ay2 + 2 * ay3 + ay4) * dt / 6;
		
	}
	
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
		
		
	};
	
	/**
	 * calculates total mechanical energy at any given time interval using 1/2 m v^2 + mgh 
	 * where m = mass, v = velocity, g = gravity, and h = height or the y value.
	 */
	function calcEnergy() {
		//find the magnitude of the velocity 
		var v = Math.sqrt(vx * vx + vy * vy);
		
		//E = K + U
		energy = (.5 * mass * Math.pow(v, 2)) + (mass * g * -1 * y); //multiply by -1 because gravity and height are opposites
	}
	
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
			height = $(window).height() - $('#header').height();	//set height
			document.getElementById("graph").setAttribute("height", height); //resize canvas
		},

		getWidth: function () {
			return width;
		},

		setWidth: function () {
			width = $(window).width();  //find out how to get rid of scroll bar and get the dimensions based on compter window size
			document.getElementById("graph").setAttribute("width", width);
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
			//make sure velocity fields have nothing in them
			$("#vx").val(null);
			$("#vy").val(null);
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
			
			setX(this.getWidth() / 2);
			setY(this.getHeight() / 2); 
			//make sure velocity is 0
			setVx(0);   
			setVy(0);
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
				setVx(num);
				console.log("vx:" + getVx());
			} else if (num < minVelocity) {	
				//set to the min value
				$("#vx").val(minVelocity);
				setVx(minVelocity);
				console.log("vx:" + getVx());
			} else if (num > maxVelocity) {
				//set to max value
				$("#vx").val(maxVelocity);
				setVx(maxVelocity);
				console.log("vx:" + getVx());
			}
		});
		
		$('#vy').blur(function (){
			//parse the number from field
			var num = $("#vy").val();
			//if its good set vy
			if (num <= maxVelocity && num >= minVelocity) {
				setVy(num);
				console.log("vy:" + getVy());
			} else if(num < minVelocity) {	
				//set to the min value
				$("#vy").val(minVelocity);
				setVy(minVelocity);
				console.log("vy:" + getVy());
			} else if(num > maxVelocity) {
				//set to max value
				$("#vy").val(maxVelocity);
				setVy(maxVelocity);
				console.log("vy:" + getVy());
			}
		});
	};
	
	//event listeners do not work inside function
	var initBtnPlusMinus = function () {	
		$('#btn-plus-vx').click(function (){
			modifyQty(10, $('#vx'));
			//set vx to new value
			setVx($('#vx').val());
			console.log("vx:" + getVx());
		});
		
		$('#btn-plus-vy').click(function (){
			modifyQty(10, $('#vy'));
			setVy($('#vy').val());
			console.log("vy:" + getVy());
		});
		
		$('#btn-minus-vx').click(function (){
			modifyQty(-10, $('#vx'));
			setVx($('#vx').val());
			console.log("vx:" + getVx());
		});
		
		$('#btn-minus-vy').click(function (){
			modifyQty(-10, $('#vy'));
			setVy($('#vy').val());
			console.log("vy:" + getVy());
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
		//var circle = document.getElementById("circle");
		$(document).keydown(function(key){
			var newPos;
			//get height and width
			var maxWidth = Physics.world.getWidth() - radius;		//width = screen width - ball radius
			var maxHeight = Physics.world.getHeight() - radius;	//height = screen height - ball radius
			
			switch(parseInt(key.which,10)){
				case 37:	//left arrow
					newPos = getX() - radius;		//new x = x pos - ball radius
					if (newPos >= radius) {							//if new x greater than or equal to ball radius
						setX(newPos);								//slide left
						//circle.setAttribute("cx", newPos);
						console.log(getX());
					} else {
						setX(radius);				//reposition ball to the left edge of screen
						//circle.setAttribute("cx", Physics.particle.getRadius());
					}
					break;
				case 38:	//up arrow
					newPos = getY() - radius;	//new y = y pos - ball radius
					if(newPos >= radius) {							//if new y 	is greater than or equal to ball radius
						setY(newPos);								//slide up
						//circle.setAttribute("cy", newPos);
					} else {
						setY(radius);				//else repositon ball to top edge of screen
						//circle.setAttribute("cy", Physics.particle.getRadius());
					}
					break;
				case 39:	//right arrow
					newPos = getX() + radius;		//new x = x pos + radius
					if(newPos <= maxWidth) {										//if new x is less than or equal to screen width
						setX(newPos);								//slide right
						//circle.setAttribute("cx", newPos);
					} else {
						setX(maxWidth);							//else reposition to right edge of screen
						//circle.setAttribute("cx", maxWidth);
					}
					break;
				case 40:	//down arrow
					newPos = getY() + radius;		//new y = y pos + radius
					if(newPos <= maxHeight) {										//if new y less than or equal to screen height
						setY(newPos);								//slide down
						//circle.setAttribute("cy", newPos);
					} else {
						setY(maxHeight);							//else reposition ball to bottom edge of screen
						//circle.setAttribute("cy", maxHeight);
					}
					break;
				
				default:
					break;
			}
		
		});
	};
	
	var printData = function () {
		//$('#time').text(getDt());
		//$('#x-pos').text(getX());
		//$('#y-pos').text(380 - getY());	//subtract current y position from starting y position
		$('#vx').text(getVx());
		$('#vy').text(getVy());
		//$('#energy').text(getEnergy());
	
	};
	
	var init =  function () {
			//initVelocityFields();
			//initBtnPlusMinus();
			$('#vx').val(0);
			$('#vy').val(0);
			handleWindowResize();
			initKeyboard();
		};
	
	return {
	
		init: init,
		printData: printData,
		modifyQty: modifyQty
	}
	
})();
	
	/********************************************
	 *			ANIMATION FUNCTIONS
	 *******************************************/
	 
	/**
	 * Calculations to run every frame/interval to update the position of the particle,
	 * update the game world and do timekeeping.
	 */
	function move() {
		
		//TODO calculate actual time elapsed to get an accurate dt when executing this function in a time interval
		currentTime += dt;		//better to use currentTime = getTimer() then dt = current time - old time
		oldTime = currentTime;
		calcEnergy();		
		calcRK4();
		if(getEnergy() < 25) {	//stopping condition
			stopAnimation();
		}
		checkBoundaries();
		plotTrajectory();
		printData();
		
	}
	
	
	/**
	 * Places a new svg element in the position of the particle and appends
	 * an element for the energy values
	 */
	function plotTrajectory() {
		var circle = document.getElementById("circle");
		circle.setAttribute("cx", getX());
		circle.setAttribute("cy", getY());
	}
	
	function printData() {
		$('#time').text(getTime());
		$('#x-pos').text(getX());
		$('#y-pos').text(380 - getY());	//subtract current y position from starting y position
		$('#vx').text(getVx());
		$('#vy').text(getVy());
		//$('#energy').text(getEnergy());
	}
	
	var timer = null;
	
	function startAnimation() {
		timer = setInterval(move, millisecondsPerFrame);
		$('#btnStartStop').text('Stop Animation');
	}
	
	function stopAnimation() {
		clearInterval(timer);
		$('#btnStartStop').text('Start Animation');
        timer = null;
	}
	
	function handleStartStop () {
		if(timer == null) {
			startAnimation();
			console.log("animation started");
		} else {
            stopAnimation();
			console.log("animation stopped");
        }
	}
	
	/** Set initial position and velocity to default or input value.  Set graph of energy 
	 * to default values.  Set all integrators values to null. Set time and energy to zero.
	  * Clear all intervals and remove plotted points. Update data points in table.  
	 */
	function handleReset() {
		stopAnimation();
		
		setX(Physics.world.getWidth() / 2);
		setY(Physics.world.getHeight() / 2);
		setVx(parseInt($('#vx').val()));   //this isn't calculating correctly when stopping then resetting
		setVy(parseInt($('#vy').val()));
		x2, y2, x3, y3, y4, vx2, vy2, vx3, vy3, vx4, vy4 = null;
		ax, ay, ax2, ay2, ax3, ay3, ax4, ay4 = null;
		time = 0;
		energy = getEnergy();
		energyXPos = 0;
		printData();
		//$('.temp').fadeOut();
		//var temp = document.getElementsByClassName("temp")
		$('.temp').fadeOut(1000);
		//ensure buttons are enabled
		document.getElementById('btnStartStop').disabled = false;
	}
	
	
	/********************************************
	*					MAIN
	********************************************/
$(document).ready(function () {

	Physics.world.init();
	Physics.screen.init();
	
	$('#btnStartStop').click(function () {
		handleStartStop();
	});
		
	$('#btnReset').click(function () {
		console.log("reset");
		handleReset();
	});
	
	$('#btn-plus-vx').click(function (){
		Physics.screen.modifyQty(10, $('#vx'));
		//set vx to new value
		setVx(parseInt($('#vx').val()));	//must be parsed in order to get value
		console.log("vx:" + getVx());
	});
		
	$('#btn-plus-vy').click(function (){
		Physics.screen.modifyQty(10, $('#vy'));
		setVy(parseInt($('#vy').val()));
		console.log("vy:" + getVy());
	});
		
	$('#btn-minus-vx').click(function (){
		Physics.screen.modifyQty(-10, $('#vx'));
		setVx(parseInt($('#vx').val()));
		console.log("vx:" + getVx());
	});
		
	$('#btn-minus-vy').click(function (){
		Physics.screen.modifyQty(-10, $('#vy'));
		setVy(parseInt($('#vy').val()));
		console.log("vy:" + getVy());
	});	
	
	
});		