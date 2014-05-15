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
 * 1. instantiation: var p = new Physics.Particle(1, 2, 3, 4) 
 * 2. creating a timer: var mover = new Physics.timer(this) particle.start()
 *
 */

 var Physics = {};
 
 Physics.Particle = (function () {
	
	//private static attribute initialized to -1 so that the first id will be 0 
	//var nextID = -1;	
	
	//private static helper method to generate random numbers for setting x and y position
	var randomX = function () {
		var maxX = Physics.World.getWidth() - 80;
		var x = Math.floor(Math.random() * maxX);	//find a number between the length of the radius and wall
		if(x < 80) {		//if in collision with left edge
			x = 80;				//reposition to left edge
		}
		return x;
	};

	var randomY = function () {
		var maxY = Physics.World.getHeight() - 80;
		var y = Math.floor(Math.random() * maxY);
		if(y < 80) {	//if in collision with ceiling
			y = 80;
		}
		return y;
	};
	
	//constructor to create new particles
	return function () {
		//private attributes 
		var x, y, vx, vy;
		var mass = 1;		//default to 1 for easy computation.  Should be initialized in constructor.
		var radius = 80;	
		var energy;			//kinetic energy at any time interval
		var skipUpdate;		//used if the particle is stationary and not on path to a collision
		var skipDraw;
		var id;
		//create a circle svg element
		var svgns = "http://www.w3.org/2000/svg" ;
		//var circle = document.createElementNS(svgns, 'circle');
		var circleID;
			
		this.getX = function () {
			return Math.round(this.x);
		};
		
		this.setX = function (xi) {
			this.x = xi;	//update variable for calculations
			//circle.setAttribute("cx", xi);	//update location on screen
		};
		
		this.getY = function () {
			return Math.round(this.y);
		};
		
		this.setY = function (yi) {
			this.y = yi;
			//circle.setAttribute("cy", yi);
		};
		
		this.getVx = function () {
			return Math.round(this.vx);
		};
		
		this.setVx = function(vxi) {
			this.vx = vxi;
		};
		
		this.getVy = function () {
			return Math.round(this.vy);
		};
		
		this.setVy = function (vyi) {
			this.vy = vyi;
		};
		
		this.getRadius = function () {
			return radius;
		};
		
		this.setRadius = function (r) {
			this.radius = r;
		};
		
		this.getEnergy = function () {
			return Math.round(this.energy);
		};
		
		this.getID = function () {
			return this.id;
		}
		
		this.setID = function (idNum) {
			this.id = idNum;
		};
		
		this.getCircleID = function () {
			return this.circleID;
		};
		
		//calculates total mechanical energy at any given time interval using 1/2 m v^2 + mgh 
		//where m = mass, v = velocity, g = gravity, and h = height or the y value.
		this.calcEnergy = function () {
			//find the magnitude of the velocity 
			var v = Math.sqrt(vx * vx + vy * vy);
			
			//Energy = Kinetic Energy + Potential Energy
			energy = (.5 * mass * Math.pow(v, 2)) + (mass * Physics.World.getG() * -1 * y); //multiply by -1 because gravity and height are opposites
		};
		
		//deallocates particle from memory, removes element from world
		this.destroy = function () {
			var circle = document.getElementById(this.circleID);
			document.getElementById('world').removeChild(circle);
		};
		
		//takes a particle object and updates position and velocity using specified scheme, 
		this.move = function () {
			Physics.RK4.calcRK4(this);
			//console.log("I moved");
		};
		
		//initializes particle properties and draws it
		this.init = function () {
			this.x = randomX();
			this.y = randomY();
			this.vx = 0;
			this.vy = 0;
			//this.setID(nextID);
			this.draw();
			//console.log("particle initialized");
		};
		
		//visualizes particle as a circle on the screen
		this.draw = function () {
			//set the circle's attributes to the particle's attributes
			var circle = document.createElementNS(svgns, 'circle');
			circle.setAttribute('cx', this.getX());
			circle.setAttribute('cy', this.getY());
			circle.setAttribute('r', this.getRadius());
			circle.setAttribute('stroke', 'black');
			circle.setAttribute('stroke-width', 4);
			circle.style.fill = "white";
			//add an id to the circle so that it can be called by id
			this.circleID = "circle" + this.id;
			circle.setAttribute('id', this.circleID);
			circle.setAttribute('class', "circle");
			//add the circle to the svg canvas
			document.getElementById("world").appendChild(circle);
		};
		
		// draws object, updates momentum and energy on every keyframe or when 
		//setting object prior to animating, or when refreshing.  
		this.update = function () {
			
			document.getElementById(this.circleID).setAttribute('cx', this.getX());
			document.getElementById(this.circleID).setAttribute('cy', this.getY());
			this.calcEnergy();
			//stopping condition
			//when energy is below n stop the animation.
			//if(getEnergy() < 50) {
				//vx = 0, vy = 0
			//}
		};
		
		//calls particle’s destroy method. Term “cleanup” used for convenience and consistency
		//in order to iterate over the cleanup method of all objects and managers
		this.cleanup = function () {
			this.destroy();
		};
		
		//this.x = newX;
		//this.y = newY;
		//this.vx = newVx;
		//this.vy = newVy;
		//nextID++;	//will increment when object is instantiated.  
		
	};//end function
	
	
	
})();	

