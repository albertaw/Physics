/********************************************************************
 * PHYSICS.WORLD
 *******************************************************************
 * Provides services to the screen to render the world and its objects.  
 * Manages object creation, deletion, initializtion, and event listeners.
 * Manages the timer to handle animating objects.???  Example use: 
 * 1. adding objects to the world: Physics.world.add(new Particle())
 */

var Physics = {};

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
			width = $(window).width() - 16;  //find out how to get rid of scroll bar and get the dimensions based on compter window size
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
			this.setHeight();
			this.setWidth();
			var canvas = document.getElementById("graph");
			graph.setAttribute("width", "100%");
			graph.setAttribute("height", this.getHeight());
			//particle
			setX(this.getWidth() / 2);
			setY(this.getHeight() / 2);
		}
	}
})();