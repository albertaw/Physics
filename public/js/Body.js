/**
 * Factory class for creating objects
 * Example: var p = new Physics.body(1, 2, 0, 0)
 */

 var Physics = Physics || {};
 
 Physics.body = (function () {

	//private static attribute
	var nextId = 0;
	
	//constructor
	return function (options) {

		//private attributes
		var x = options.x || 0;
		var y = options.y || 0;
		var vx = options.vx || 0;
		var vy = options.vy || 0;
		var mass = options.mass || 1;
		var radius = options.radius || 80;
		var id;
		var circleId;
		var energy;			//kinetic energy at any time interval
		var skipUpdate;		//used if the particle is stationary 
		var skipDraw;
		var svgns = "http://www.w3.org/2000/svg";	//svg namespace for initializing circles

			
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

		this.getMass = function () {
			return mass;
		};

		this.setMass = function (massi) {
			mass = massi;
		};

		this.getEnergy = function () {
			return Math.round(energy);
		};

		this.setEnergy = function (e) {
			energy = e;
		}
		
		this.getId = function () {
			return id;
		}
		
		this.setId = function (idNum) {
			id = idNum;
		};
		
		this.getCircleId = function () {
			return circleId;
		};

		this.setCircleId = function (id) {
			circleId = id;
		}
		
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
		

		this.draw = function () {
			//set the circle's attributes to the particle's attributes
			var circle = document.createElementNS(svgns, 'circle');
			circle.setAttribute('cx', x);
			circle.setAttribute('cy', y);
			circle.setAttribute('r', radius);
			circle.setAttribute('stroke', 'black');
			circle.setAttribute('stroke-width', 2);
			circle.style.fill = "white";
			circle.setAttribute('id', circleId);
			document.getElementById("world").appendChild(circle);
			//console.log('circle drawn');
		}

		// draws object, updates momentum and energy on every keyframe or when 
		//setting object prior to animating, or when refreshing.  
		this.update = function () {
			
			document.getElementById(circleId).setAttribute('cx', x);
			document.getElementById(circleId).setAttribute('cy', y);
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
			var elem = document.getElementById(this.getCircleId());
			var parent = elem.parentNode;
			parent.removeChild(elem);
		};

		this.setId(nextId);
		this.setCircleId('circle' + id);
		nextId++;
		//console.log("particle initialized");
		
	};//end function
	
	
})();	
