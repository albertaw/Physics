/**
 * Class creates an object that can be modeled after a point particle of uniform 
 * density and uses the 4th order Runge Kutta scheme to calculate the trajectory 
 * of the particle given an initial x and y position and initial velocity x and 
 * velocity y. Prints values of these points at each time step to a file.
 * 
 * @author Alberta Williams
 * last modified 4/16/2014
 */

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.io.FileNotFoundException;
import java.io.PrintStream;

public class Particle2 {
	
	/****************************************
	 * PROPERTIES
	 ****************************************/
	private double x;		//current/initial positions 
	private double y;
	private double x2;		//value used in 2nd step of RK4 calculations
	private double y2;
	private double x3;		//value used in 3rd step of RK4 calculations
	private double y3;
	private double x4;		//value used in 4th step of RK4 calculations
	private double y4;
	private double vx;		//current/initial velocities
	private double vy;
	private double vx2;		//value used in 2nd step of RK4 calculations
	private double vy2;
	private double vx3;		//value used in 3rd step of RK4 calculations
	private double vy3;
	private double vx4;		//value used in 4th step of RK4 calculations
	private double vy4;
	private double ax;		//acceleration calculated from initial position and velocity
	private double ay;
	private double ax2;		//value used in 2nd step of RK4 calculations
	private double ay2;
	private double ax3;		//value used in 3rd step of RK4 calculations
	private double ay3;
	private double ax4;		//value used in 4th step of RK4 calculations
	private double ay4;
	private int mass = 1;	//default to 1 for easy computation.  Should be initialized in constructor.
	private double g = -10;	
	private double oldTime;		//the time in seconds when the interval was last executed
	private double currentTime;	//the time in seconds at the start of the execution of the interval
	private static double dt = .01;		//the change in time. Should be the value used for calling the timing function.
	private double energy;		//kinetic energy at any time interval
	private int minHeight = 0;
	
	/**
	 * Constructor to create new particle objects with the specified parameters
	 * 
	 * @param x position
	 * @param y position
	 * @param vx initial velocity x 
	 * @param vy initial velocity y
	 */
	public Particle2(int x, int y, int vx, int vy)  {
		
		//initialize position to input value
		 this.x = x; 
		 this.y = y;
		//initialize velocity  to input value
		 this.vx = vx;
		 this.vy = vy;
		 
		//TODO code for drawing graphic
	
	}
	
	
	/*********************************************
	 * GETTERS
	 *********************************************/
	
	//Big Decimal class used to format numbers to 2 decimal places for consistency
	public BigDecimal getX() {
		return new BigDecimal(x).setScale(2, RoundingMode.HALF_UP);
	}
	
	public BigDecimal getY() {
		return new BigDecimal(y).setScale(2, RoundingMode.HALF_UP);
	}
	
	public BigDecimal getVx() {
		return new BigDecimal(vx).setScale(2, RoundingMode.HALF_UP);
	}
	
	public BigDecimal getVy() {
		return new BigDecimal(vy).setScale(2, RoundingMode.HALF_UP);
	}
	
	public BigDecimal getTime() {
		return new BigDecimal(currentTime).setScale(2, RoundingMode.HALF_UP);
	}
	
	public BigDecimal getEnergy() {
		return new BigDecimal(energy).setScale(2, RoundingMode.HALF_UP);
	}
	
	/**
	 * Calculates the sum of forces acting on the particle during a given time
	 * interval in the x direction and computes acceleration using Newton's Second
	 * law Fnet = ma. Forces could include friction, spring, drag, thrust.  
	 * 
	 * @param x position
	 * @param vx velocity
	 * @return x component of acceleration
	 */
	private double getAx(double x, double vx) {
		 return 0;	//default to zero since I am not accounting for any other force
	}
	
	/**
	 * Calculates sum of forces acting on the particle in the y direction using Fnet = ma
	 * Forces could include weight, lift, Buoyant force.
	 * 
	 * @param y position
	 * @param vy velocity
	 * @return y component of acceleration
	 */
	private double getAy(double y, double vy){
		
		return g;	//for now I am only accounting for gravity
	}
	
	/**
	 * Calculations to run every frame/interval to update the position of the particle.
	 */
	public void move() {
		
		//TODO calculate actual time elapsed to get an accurate dt when executing this function in a time interval
		currentTime += dt;		//better to use currentTime = getTimer() then dt = current time - old time
		oldTime = currentTime;
				
		calcRK4();
		checkBoundaries();
		//plotTrajectory();
		
	}
	
	/**
	 * The fourth order Runge Kutta scheme calculates the new position by using the 
	 * initial position and the velocity found from the previous iteration of calculations.  
	 * The velocity is found by using the initial velocity plus the acceleration calculated 
	 * from the previous iteration. Acceleration is a function of the position and velocity. 
	 * It is calculated with new values of x, y vx and vy at each iteration.  
	 */
	public void calcRK4() {
		
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
	
	
	/**
	 * Detects if a particle is in contact or outside the boundaries of the "world"
	 */
	public void checkBoundaries() {
		
		if(y < minHeight) {
			y = minHeight;
            vy = 0;
        }
		
		//TODO write code to handle max height and max and min x values
	}
	
	/**
	 * calculates total mechanical energy at any given time interval using 
	 * 1/2 m v^2 + mgh where m = mass, v = velocity, g = gravity, and h = height or the y value.
	 */
	public void calcEnergy() {
		//find the magnitude of the velocity 
		double v = Math.sqrt(vx * vx + vy * vy);
		
		//E = K + U
		energy = (.5 * mass * Math.pow(v, 2)) + (mass * g * -1 * y); //multiply by -1 to get the magnitude of g
		
	}
	

	public static void main(String[] args) throws FileNotFoundException{
		
		//create file to write data to
		PrintStream diskWriter = new PrintStream("output.csv");
		diskWriter.println("Time" + "\tXPos" + "\tYPos" + "\tVX" + "\t\tVY" + "\t\tEnergy");
		
		//instantiate a new particle to test
		Particle2 p = new Particle2(0, 0, 1, 1);
		
		//test energy, position and velocity every .01s up to .1s
		for (double i = 0; i <= 1; i+=dt) {
			//put this first to print out initial values at zero
			p.calcEnergy();
			
			//print values to file
			diskWriter.println(p.getTime() + "\t" + p.getX() + "\t" +p.getY() + 
					"\t" + p.getVx() + "\t" + p.getVy() + "\t" + p.getEnergy());
			
			p.move();
			
			//quit the loop when y = 0
			if (p.y == 0) {
				break;
			}
		}
		diskWriter.close();
		
	}
		
}
