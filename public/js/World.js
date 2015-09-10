/********************************************************************
 * PHYSICS.WORLD
 *******************************************************************
 * Provides services to the screen to render the world and its objects.  
 * Manages object creation, deletion, initializtion, and event listeners.
 * Manages the timer to handle animating objects.???  Example use: 
 * 1. adding objects to the world: Physics.world.add(new Particle())
 */

 var Physics = Physics || {};

Physics.World = (function () {

	var height;	//ground level of screen with origin at top left corner 
	var width;
	var g;			//force of gravity, downward is positive relative to computer screen
	var world = document.getElementById("world");
	
	
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
		return this.g;
	};

	var	setG = function (g) {
		this.g = g;
	};

	var init = function () {
		this.g = 0;
		this.friction = 0;
		this.draw();

	};
		
	var	draw = function () {
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
		
	}
})();


