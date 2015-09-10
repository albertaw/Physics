/********************************************************************
 * PARTICLE
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

 var Physics = Physics || {};
 
 Physics.Body = (function () {
	var radius = 80;	
	//private static attribute initialized to -1 so that the first id will be 0 
	var nextID = 0;	
	
	//private static helper method to generate random numbers for setting x and y position
	var randomX = function () {
		var maxX = Physics.World.getWidth() - radius;
		var x = Math.floor(Math.random() * maxX);	//find a number between the length of the radius and wall
		if(x < radius) {		//if in collision with left edge
			x = radius;				//reposition to left edge
		}
		return x;
	};

	var randomY = function () {
		var maxY = Physics.World.getHeight() - radius;
		var y = Math.floor(Math.random() * maxY);
		if(y < radius) {	//if in collision with ceiling
			y = radius;
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
		var skipUpdate;		//used if the particle is stationary 
		var skipDraw;
		var id;
		var svgns = "http://www.w3.org/2000/svg";	//svg namespace for initializing circles
		var circleID;
			
		this.getX = function () {
			return x;
		};
		
		this.setX = function (xi) {
			x = xi;	//update variable for calculations
		};
		
		this.getY = function () {
			return y;
		};
		
		this.setY = function (yi) {
			y = yi;
		};
		
		this.getVx = function () {
			return vx;
		};
		
		this.setVx = function(vxi) {
			vx = vxi;
		};
		
		this.getVy = function () {
			return vy;
		};
		
		this.setVy = function (vyi) {
			vy = vyi;
		};
		
		this.getRadius = function () {
			return radius;
		};
		
		this.setRadius = function (r) {
			radius = r;
		};
		
		this.getEnergy = function () {
			return Math.round(energy);
		};

		this.setEnergy = function (e) {
			energy = e;
		}
		
		this.getID = function () {
			return id;
		}
		
		this.setID = function (idNum) {
			id = idNum;
		};
		
		this.getCircleID = function () {
			return circleID;
		};
		
		//calculates total mechanical energy at any given time interval using 1/2 m v^2 + mgh 
		//where m = mass, v = velocity, g = gravity, and h = height or the y value.
		this.calcEnergy = function () {
			//find the magnitude of the velocity 
			var v = Math.sqrt(vx * vx + vy * vy);
			
			//Energy = Kinetic Energy + Potential Energy
			var e = (.5 * Math.pow(v, 2)) + (Physics.World.getG() * -1 * y); //multiply by -1 because gravity and height are opposites
			this.setEnergy(e);
		};
		
		//deallocates particle from memory, removes element from world
		this.destroy = function () {
			var circle = document.getElementById(this.circleID);
			document.getElementById('world').removeChild(circle);
		};
		
		//takes a particle object and updates position and velocity using specified scheme, 
		this.move = function () {
			Physics.RK4.calcRK4(this);
			//this.update();
			//console.log("I moved");
		};
		
		//initializes particle properties and draws it
		this.init = function () {
			this.setX(randomX());
			this.setY(randomY());
			this.setVx(Math.random() * 1000);
			this.setVy(Math.random() * 1000);
			this.setID(nextID);
			this.setEnergy(0);
			nextID++;
			this.drawSVG();
			console.log("particle initialized");
		};
		
		this.drawSVG = function () {
			//set the circle's attributes to the particle's attributes
			var circle = document.createElementNS(svgns, 'circle');
			circle.setAttribute('cx', x);
			circle.setAttribute('cy', y);
			circle.setAttribute('r', radius);
			circle.setAttribute('stroke', 'black');
			circle.setAttribute('stroke-width', 2);
			circle.style.fill = "white";
			//add an id to the circle so that it can be called by id
			circleID = "circle" + id;
			circle.setAttribute('id', circleID);
			document.getElementById("world").appendChild(circle);
		}
		//visualizes particle as a circle on the screen
		this.draw = function () {
			//set the circle's attributes to the particle's attributes
			var circle = document.createElement('DIV');
			circle.style.left = this.x;
			circle.style.top = this.y;
			circleID = "circle" + id;
			circle.setAttribute('id', circleID);
			circle.setAttribute('class', "circle");
			//add the circle to the svg canvas
			document.getElementById("world").appendChild(circle);
		};
		
		// draws object, updates momentum and energy on every keyframe or when 
		//setting object prior to animating, or when refreshing.  
		this.update = function () {
			
			document.getElementById(circleID).setAttribute('cx', x);
			document.getElementById(circleID).setAttribute('cy', y);
			this.calcEnergy();
			//stopping condition
			//when energy is below n stop the animation.
			if(this.getEnergy() < 50) {
				this.setVx(0);
				this.setVy(0);
			}
			//console.log(this.getEnergy());
			
		};
		
		//calls particle’s destroy method. Term “cleanup” used for convenience and consistency
		//in order to iterate over the cleanup method of all objects and managers
		this.cleanup = function () {
			this.destroy();
		};
		
		
	};//end function
	
	
	
})();	
/*
var p = new Physics.Body(); 
p.init();
p.setX(80);
p.setY(80);
console.log("x:" + p.getX() + " y:" + p.getY() + " vx:" + p.getVx() + " vy:" + p.getVy());
//var p = new Physics.Body(); 
//console.log("x:" + p.getX() + " y:" + p.getY() + " vx:" + p.getVx() + " vy:" + p.getVy());

//p.init();
//p.init();
//p.init();
//p.init();
*/
