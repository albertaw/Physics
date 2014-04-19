/**
 * Class creates an object that can be modeled after a point particle of uniform 
 * density and uses the 4th order Runge Kutta scheme to calculate the trajectory 
 * of the particle given an initial x and y position and initial velocity x and 
 * velocity y. Prints values of these points at each time step to a file.
 * 
 * @author Alberta Williams
 * last modified 4/17/2014
 */

//Particle = (function () {
	
	/********************************************
	 * 				PROPERTIES
	 *******************************************/
	var x = 20;		//current/initial positions 
	var y = 380;
	var x2;		//value used in 2nd step of RK4 calculations
	var y2;
	var x3;		//value used in 3rd step of RK4 calculations
	var y3;
	var x4;		//value used in 4th step of RK4 calculations
	var y4;
	var vx = 150;		//current/initial velocities
	var vy = -150;
	var vx2;		//value used in 2nd step of RK4 calculations
	var vy2;
	var vx3;		//value used in 3rd step of RK4 calculations
	var vy3;
	var vx4;		//value used in 4th step of RK4 calculations
	var vy4;
	var ax;		//acceleration calculated from initial position and velocity
	var ay;
	var ax2;		//value used in 2nd step of RK4 calculations
	var ay2;
	var ax3;		//value used in 3rd step of RK4 calculations
	var ay3;
	var ax4;		//value used in 4th step of RK4 calculations
	var ay4;
	var mass = 1;	//default to 1 for easy computation.  Should be initialized in constructor.
	var g = 50;		//force of gravity, downward is positive relative to computer screen
	var oldTime;		//the time in milliseconds before the execution of the interval
	var currentTime;	//the time in milliseconds once the interval executes its command
	var dt;;		//the change in time. Should be the value used for calling the timing function.
	var energy;		//kinetic energy at any time interval
	var minHeight = 400;	//ground level of screen with origin at top left corner
	var millisecondsPerFrame = 40;
	var radius = 20;
	
	
	/*******************************************
	 * 			GETTERS AND SETTERS
	 ******************************************/
	
	//Big Decimal class used to format numbers to 2 decimal places for consistency
	function getX() {
		return Math.round(x);
	}
	
	function setX(xi) {
		this.x = xi;
	}
	
	function getY() {
		return Math.round(y);
	}
	
	function setY(yi) {
		this.y = yi;
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
	 * calculates total mechanical energy at any given time interval using 1/2 m v^2 + mgh 
	 * where m = mass, v = velocity, g = gravity, and h = height or the y value.
	 */
	function calcEnergy() {
		//find the magnitude of the velocity 
		var v = Math.sqrt(vx * vx + vy * vy);
		
		//E = K + U
		energy = (.5 * mass * Math.pow(v, 2)) + (mass * g * -1 * y); //multiply by -1 because gravity and height are opposites
	}
	
	/********************************************
	 *			ANIMATION FUNCTIONS
	 *******************************************/
	 
	/**
	 * Calculations to run every frame/interval to update the position of the particle,
	 * update the game world and do timekeeping.
	 */
	function move() {
		calcElapsedTime();
		//TODO calculate actual time elapsed to get an accurate dt when executing this function in a time interval
		//currentTime += dt;		//better to use currentTime = getTimer() then dt = current time - old time
		//oldTime = currentTime;
		calcEnergy();		
		calcRK4();
		checkBoundaries();
		plotTrajectory();
		printData();
		
	}
	
	/**
	 * Detects if a particle is in contact or outside the boundaries of the "world".
	 * Sets particle's positin to the floor, ceiling, or wall position if in contact.
	 */
	function checkBoundaries() {
		
		if(y >= minHeight - radius) {
			y = minHeight - radius;
            vy = 0;
			vx = 0;
			stopAnimation();
			//disable button
			document.getElementById('btnStartStop').disabled = true;
        }
		
		//TODO write code to handle max height and max and min x values
	}
	 
	var energyXPos = 0;
	//var oldEnergy;	//initialize to current energy readings
	/**
	 * Places a new svg element in the position of the particle and appends
	 * an element for the energy values
	 */
	function plotTrajectory() {
		//$('#main').append('<div>' + getX() + " " + getY() + " " + getVx() + " " + getVy() + '</div>');
		var svgns = "http://www.w3.org/2000/svg"
		var circle = document.createElementNS(svgns, 'circle');
		circle.setAttribute("class", "temp");
		circle.setAttribute("r", radius);
		circle.setAttribute("cx", getX());
		circle.setAttribute("cy", getY());
		$('#graph').append(circle);
		
		//plot the energy
		
		var energyYPos = 100 + .001 * energy; //plot the energy from a baseline of 150 or  n px
		var rect = document.createElementNS(svgns, 'rect');
		rect.setAttribute("class", "temp");
		rect.setAttribute("width", 20);
		rect.setAttribute("height", 20);
		rect.setAttribute("x", energyXPos);
		rect.setAttribute("y", energyYPos);
		$('#energy-graph').append(rect);
		energyXPos += 10;
		
	}
	
	function printData() {
		$('#time').text(getDt());
		$('#x-pos').text(getX());
		$('#y-pos').text(380 - getY());	//subtract current y position from starting y position
		$('#vx').text(getVx());
		$('#vy').text(getVy());
		$('#energy').text(getEnergy());
		//create a row
		//var row = document.createElement('tr');
		//$('#data-points').append('<tr class="row"></tr>');
		//create table data to add to row
		//$('.row').append('<td>' + getTime() + '</td>' + '<td>' + getX() + '</td>' + '<td>' + getY() + '</td>' +
			//'<td>' + getVx() + '</td>' + '<td>' + getVy() + '</td>' + '<td>' + getEnergy() + '</td>');
		//append the row to the table
		//$('#data-points').append(row);
	}
	
	var timer = null;
	
	//initializes time
	function setTime() {
		var date = new Date();
		oldTime = date.getTime();
	}
	
	function calcElapsedTime() {
		var date = new Date();
		currentTime = date.getTime();
		dt = (currentTime - oldTime) / 1000;	//divide by 1000 to convert millliseconds into secondd
		oldTime = currentTime;
	}
		
	function startAnimation() {
		//initialize time
		setTime();
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
	 * to default values.  Set all RK4 values to null. Set time and energy to zero.  
	  * Clear all intervals and remove plotted points. Update data points in table.  
	 */
	function handleReset() {
		stopAnimation();
		//TODO set to input value
		x = radius;		
		y = minHeight - radius;
		vx = 150;	
		vy = -150;
		x2, y2, x3, y3, y4, vx2, vy2, vx3, vy3, vx4, vy4 = null;
		ax, ay, ax2, ay2, ax3, ay3, ax4, ay4 = null;
		//time = 0;
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
	document.getElementById('btnStartStop').disabled = false;
	$('#btnStartStop').click(function () {
		handleStartStop();
	});
		
	$('#btnReset').click(function () {
		console.log("reset");
		handleReset();
	});
	
});		