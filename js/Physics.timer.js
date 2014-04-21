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
	
	//to initialize time 
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
		setX(80);
		setY(312);
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
	