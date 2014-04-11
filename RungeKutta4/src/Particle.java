//TODO: format numbers 2 decimal places, calculate time, create thread to run code, create graphics to plot points

import java.awt.*;

public class Particle {
	
	private Point position;
	private Point position2;
	private Point position3;
	private Point position4;
	private Point velocity;
	private Point velocity2;
	private Point velocity3;
	private Point velocity4;
	private int mass = 1;
	private int g = -10;
	private double oldTime;;
	private static double dt = 1;
	private double energy;
	
	public Particle(int x, int y, int vx, int vy)  {
		//draw graphic
		//initialize position 	p1 = x(n)
		 position = new Point(x, y);
		 position2 = new Point();
		 position3 = new Point();
		 position4 = new Point();
		//initialize velocity  v1 = v(n)
		 velocity = new Point(vx, vy);
		 velocity2 = new Point();
		 velocity3 = new Point();
		 velocity4 = new Point();
		 
	}
	
	public double getX() {
		return position.x;
	}
	
	
	public double getY() {
		return position.y;
	}
	
	
	public double getVx() {
		return velocity.x;
	}
	
	
	public double getVy() {
		return velocity.y;
	}
	

	public double getDt() {
		return dt;
	}
	
	public double getEnergy() {
		return energy;
	}
	
	private Point getAcceleration(Point p, Point v) {
		//calculate acceleration in the x and y direction using f = ma
		//forces in y:
		return new Point(0, g);		//only accounting for the force of gravity
	}
	
	//RK4 calculations to run every frame/timestep
	public void move() {
		
		calcRK4();
		//checkBoundaries();
		//calcEnergy();
		//draw graph of trajectory and energy
		
	}
	
	public void calcRK4() {
		
		//set time = current time (getTimer())
		//set dt = current time - old time / 1000 to get milliseconds
		//set old time to new time
		//test value
		//dt = .01;
		
		//a1 = a(p1, v1)
		Point acceleration = getAcceleration(position, velocity);	
				
		//p2 = p1 + v1 * dt/2  (average t)	
				
		position2.x = (int) (position.x + velocity.x * .5 * dt);  
		position2.y = (int) (position.y + velocity.y * .5 * dt);
					
		//v2 = v1 + a1 * dt/2
				
		velocity2.x = (int) (velocity.x + acceleration.x * .5 * dt);
		velocity2.y = (int) (velocity.y + acceleration.y * .5 * dt);
					
		//a2 = a(p2, v2)
		Point acceleration2 = getAcceleration(position2, velocity2);	
					
		//p3 = p1 + v2 * dt/2
				
		position3.x = (int) (position.x + velocity2.x * .5 * dt); 
		position3.y = (int) (position.y + velocity2.y * .5 * dt);
				
		//v3 = v1 + a2 * dt/2
				
		velocity3.x = (int) (velocity.x + acceleration2.x * .5 * dt);
		velocity3.y = (int) (velocity.y + acceleration2.y * .5 * dt);
					
		//a3 = a(p3, v3)
		Point acceleration3 = getAcceleration(position3, velocity3);
				
		//p4 = p1 + v3 * dt
				
		position4.x = (int) (position.x + velocity3.x * dt);
		position4.y = (int) (position.y + velocity3.y * dt);
				
		//v4 = v1 + a3 * dt
				
		velocity4.x = (int) (velocity.x + acceleration3.x * dt);
		velocity4.y = (int) (velocity.y + acceleration3.y * dt);
					
		//a4 = a(p4, v4)
		Point acceleration4 = getAcceleration(position4, velocity4);
				
		//update current position and velocity vectors with the previously calculated values 
		//x(n + 1) = x(n) + (v1 + 2v2 + 2v3 + v4) dt / 6
		position.x += (velocity.x + 2 * velocity2.x + 2 * velocity3.x + velocity4.x) * dt / 6;
		position.y += (velocity.y + 2 * velocity2.y + 2 * velocity3.y + velocity4.y) * dt / 6;
				
		//v(n + 1) = v(n) + (a1 + 2a2 + 2a3 + a4) dt / 6
		velocity.x += (acceleration.x + 2 * acceleration2.x + 2 * acceleration3.x + acceleration4.x) * dt / 6;				
		velocity.y += (acceleration.y + 2 * acceleration2.y + 2 * acceleration3.y + acceleration4.y) * dt / 6;
		
		
	}
	
	public void checkBoundaries() {

			
	}
	
	public void calcEnergy() {
		double v = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
		
		//E = K + U
		energy = Math.round((.5 * mass * Math.pow(v, 2)) + (mass * g * -1 * position.y));
		
	}
	
	
	public static void main(String[] args) {
		
		Particle p = new Particle(0, 10, 10, 0);
		
		for (double i = 0; i < 10; i+=dt) {
			//put this first to print out initial values at zero
			p.calcEnergy();
			
			System.out.println("t:" + i + "\tx:" + p.getX() + "\ty:" +p.getY() + 
					"\tvx:" + p.getVx() + "\tvy:" + p.getVy() + "\tenergy:" + p.getEnergy());
			
			p.move();
		}
		
	}
	
}
