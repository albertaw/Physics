/********************************************************************
 * PHYSICS.TIMER
 ********************************************************************
 * Handles timekeeping for world and objects.   Whatever is calculating 
 * the move would use Physics.timer.getDt to get change in time 
 */

 Physics.Timer = (function () {
	
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
	
	var start = function () {
		var date = new Date();
		currentTime = date.getTime();
		oldTime = currentTime;
		if (timer == null) {
			timer = setInterval(Physics.objectManager.update, millisecondsPerFrame);
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

