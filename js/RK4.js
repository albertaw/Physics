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
	
	
	