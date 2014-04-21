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

//Particle = (function () {
	
	var x, x2, x3, x4, y, y2, y3, y4;  	//value used in 2nd step of RK4 calculations
	var vx, vx2, vx3, vx4, vy, vy2, vy3, vy4;		//velocities used in 2nd step of RK4 calculations
	var ax, ax2, ax3, ax4, ay, ay2, ay3, ay4;		//acceleration used for steps 1-4 in RK4
	var mass = 1;		//default to 1 for easy computation.  Should be initialized in constructor.
	var energy;			//kinetic energy at any time interval
	var millisecondsPerFrame = 40;
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
	
	function getDt() {
		return dt;
	}
	
	function getEnergy() {
		return Math.round(energy);
	}
	

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
		
		return 0;
	}
	
	
	/**
	 * calculates total mechanical energy at any given time interval using 1/2 m v^2 + mgh 
	 * where m = mass, v = velocity, g = gravity, and h = height or the y value.
	 */
	function calcEnergy() {
		//find the magnitude of the velocity 
		var v = Math.sqrt(vx * vx + vy * vy);
		
		//E = K + U
		energy = (.5 * mass * Math.pow(v, 2)) + (mass * Physics.world.getG() * -1 * y); //multiply by -1 because gravity and height are opposites
	}
	 
	
	/**
	 * Detects if a particle is in contact or outside the boundaries of the "world".
	 * Sets particle's positin to the floor, ceiling, or wall position if in contact.
	 */
	function checkBoundaries() {
		
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
		if(vx < 4 || vy < 4) {
			stopAnimation();
		}
		
	}
	 
	var energyXPos = 0;
	function graphEnergy() {
		
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
		
	}
	
	function printData() {
		//$('#time').text(getDt());
		//$('#x-pos').text(getX());
		//$('#y-pos').text(380 - getY());	//subtract current y position from starting y position
		$('#vx').text(getVx());
		$('#vy').text(getVy());
		//$('#energy').text(getEnergy());
	
	}
	
	/**
	 * Calculations to run every frame/interval to update the position of the particle,
	 * update the game world and do timekeeping.
	 */
	function move() {
		calcElapsedTime();
		calcEnergy();		
		calcRK4();
		checkBoundaries();
		setX(getX());
		setY(getY());
		printData();
		
	}
	
	
	