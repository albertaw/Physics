/********************************************************************
 * FOURTH ORDER RUNGE KUTTA
 ********************************************************************
 * calculates the new position by using the initial position and the 
 * velocity found from the previous iteration of calculations. The 
 * velocity is found by using the initial velocity plus the acceleration 
 * calculated from the previous iteration. Acceleration is a function of 
 * the position and velocity. It is calculated with new values of x, y vx 
 * and vy at each iteration.  
 */

Physics.RK4 = (function () {
		
		
		/**
		 * Calculates the sum of forces acting on the particle during a given time
		 * interval in the x direction and computes acceleration using Newton's Second
		 * law Fnet = ma. Forces could include friction, spring, drag, thrust.  
		 * 
		 * @param x position
		 * @param vx velocity
		 * @return x component of acceleration
		 */
		var getAx = function (x, vx) {
			 return 0;	//default to zero since I am not accounting for any other force
		};
		
		/**
		 * Calculates sum of forces acting on the particle in the y direction using Fnet = ma
		 * Forces could include weight, lift, Buoyant force.
		 * 
		 * @param y position
		 * @param vy velocity
		 * @return y component of acceleration
		 */
		var getAy = function (y, vy){
			
			return 0;
		};
		
		
		var calcRK4 = function (particle) {
			var x = particle.getX();
			var y = particle.getY();
			var vx = particle.getVx();
			var vy = particle.getVy(); 
			//console.log(particle.getID() + ' x:' + x + ' y:' + y + ' vx:' + vx + ' vy:' + vy);
			var dt = Physics.Timer.getDt();
			
			//var dt = .02;
			//console.log('dt:' + dt);
			
			//a1 = a(p1, v1)
			var ax = getAx(x, vx);	//equals 0
			var ay = getAy(y, vy);	//equals g
					
			//p2 = p1 + v1 * dt/2  	
			var x2 = x + vx * .5 * dt;  
			var y2 = y + vy * .5 * dt;
						
			//v2 = v1 + a1 * dt/2		
			var vx2 = vx + ax * .5 * dt;
			var vy2 = vy + ay * .5 * dt;
				
			//a2 = a(p2, v2)
			var ax2 = getAx(x2, vx2);	
			var ay2 = getAy(y2, vy2);				
			
			//p3 = p1 + v2 * dt/2		
			var x3 = x + vx2 * .5 * dt; 
			var y3 = y + vy2 * .5 * dt;
					
			//v3 = v1 + a2 * dt/2		
			var vx3 = vx + ax2 * .5 * dt;
			var vy3 = vy + ay2 * .5 * dt;
						
			//a3 = a(p3, v3)
			var ax3 = getAx(x3, vx3);
			var ay3 = getAy(y3, vy3);
			
			//p4 = p1 + v3 * dt	
			var x4 = x + vx3 * dt;
			var y4 = y + vy3 * dt;
					
			//v4 = v1 + a3 * dt	
			var vx4 = vx + ax3 * dt;
			var vy4 = vy + ay3 * dt;
						
			//a4 = a(p4, v4)
			var ax4 = getAx(x4, vx4);
			var ay4 = getAy(y4, vy4);
					
			//take the average value of all the computed velocities multiplied by dt 
			//and add this to the current position.
			//x(n + 1) = x(n) + (v1 + 2v2 + 2v3 + v4) dt / 6
			var newX = x + ((vx + 2 * vx2 + 2 * vx3 + vx4) * dt / 6);
			//console.log('new x:' + newX);
			particle.setX(newX);
			var newY = y + ((vy + 2 * vy2 + 2 * vy3 + vy4) * dt / 6);
			particle.setY(newY);
			
			//take the average value of all the computed accelerations multiplied by dt 
			//and add this to the current velocity.
			//v(n + 1) = v(n) + (a1 + 2a2 + 2a3 + a4) dt / 6
			var newVx = vx + ((ax + 2 * ax2 + 2 * ax3 + ax4) * dt / 6);
			particle.setVx(newVx);
			var newVy = vy + ((ay + 2 * ay2 + 2 * ay3 + ay4) * dt / 6);
			particle.setVy(newVy);
			//console.log("vx:" + particle.getVx() + "vy:" + particle.getVy());
		};
		
		var init = function () {
			console.log("RK4 initialized");
		};
		
		return {
			calcRK4: calcRK4,
			init: init
		}
		
})();
	

	