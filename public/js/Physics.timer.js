/********************************************************************
 * PHYSICS.TIMER
 ********************************************************************
 * Handles timekeeping for world and objects.   Whatever is calculating 
 * the move would use Physics.timer.getDt to get change in time 
 */
 Physics.Timer = (function () {
	
	var oldTime;		//the time in milliseconds before the execution of the interval
	var currentTime;	//the time in milliseconds once the interval executes its command
	var dt;				//the change in time. Should be the value used for calling the timing function.
	var timer = null;
	var millisecondsPerFrame = 20;
	var date = new Date();
	
	//to initialize time 
	var setTime = function () {
		oldTime = date.getTime();
	};
	
	var calcElapsedTime = function () {
		currentTime = date.getTime();
		dt = (currentTime - oldTime) / 1000;	//divide by 1000 to convert millliseconds into seconds
		oldTime = currentTime;
	};
		
	var getDt = function () {
		calcElapsedTime();
		return dt;
	};
	
	var start = function () {
		if (timer == null) {
			timer = setInterval(Physics.ParticleManager.update, millisecondsPerFrame);
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
		setTime();
		start();
	};
	
	var update = function () {
		setTime();
		start();
	};
	
	var draw = function () {
	
	};
	
	var cleanup = function () {
		stop();
	};
	
	return {
		setTime: setTime,
		calcElapsedTime: calcElapsedTime,
		start: start,
		stop: stop,
		getDt: getDt,
		init: init,
		update: update,
		cleanup: cleanup
		
	}
	
})();	
	