import java.util.*;
import java.io.*;

public class PhysicsTest {

	private double initialXPosition;		//starting horizontal position according to the screen
	private double initialYPosition;		//starting vertical position according to the screen
	private int initialVelocityX;			//velocity in x direction
	private int initialVelocityY;			//velocity in y direction 
	private double xPosition;				//current x position at time t
	private double yPosition;				//current y position at time t
	private double velocityX;				//current velocity in x direction at time t
	private double velocityY;				//current velocity in y direction at time t
	private double accelerationX;			//calculated acceleration based on component of force applied in x 
	private double accelerationY;			//calculated acceleration based on component of force applied in y
	private static double force;			//magnitude of force applied to object	
	private static double theta;			//angle the force is applied
	private static int mass = 1;			//mass of object in kg
	private static int time;				//time elapsed
	
	public double getXPosition() {
		return Math.round(xPosition);
	}
	
	public void setXPosition() {
		xPosition = initialXPosition + (initialVelocityX * time) + ((accelerationX / 2) * (time * time));
	}
	
	public double getYPosition() {
		return Math.round(yPosition);
	}
	
	public void setYPosition() {
		yPosition = initialYPosition + (initialVelocityX * time) + ((accelerationY /2) * (time * time));
	}
	
	public double getVX() {
		return Math.round(velocityX);
	}
	
	public void setVX() {
		velocityX = initialVelocityX + (accelerationX * time);
	}
	
	public double getVY() {
		return Math.round(velocityY);
	}
	
	public void setVY() {
		velocityY = initialVelocityY +(accelerationY * time);
	}
	
	public void setAccelerationX() {
		accelerationX = force * Math.cos(theta) / mass;
	}
	
	public void setAccelerationY() {
		accelerationY = force * Math.sin(theta) / mass;
	}


	public static void main(String[] args) throws IOException{
		
		Scanner sc = new Scanner(System.in);
		String answer = "yes";
		
		while(answer.equalsIgnoreCase("yes") || answer.equalsIgnoreCase("y")) {
			
			PhysicsTest test = new PhysicsTest();		//create a new object	
			//reset/initialize values
			test.initialXPosition = 0;
			test.initialYPosition = 0;
			test.initialVelocityX = 0;
			test.initialVelocityY = 0;
			test.velocityX = 0;
			test.velocityY = 0;
			force = 0;
			theta = 0;
			time = 0;
			System.out.println("Enter force:");
			force = sc.nextDouble();
			System.out.println("Enter angle in radians");
			theta = sc.nextDouble();
			//compute the acceleration from the given force and angle
			test.setAccelerationX();
			test.setAccelerationY();
			
			for(int i = 0; i <= 10; i++)  {
				//compute the position and velocity after every increment
				test.setXPosition();
				test.setYPosition();
				test.setVX();
				test.setVY();
				//print the results to console
				System.out.println("t:" + test.time + "\tx:" + test.getXPosition() + "\ty:" + 
					test.getYPosition() + "\tvx:" + test.getVX() + "\tvy:" + test.getVY());
				test.time++;
			}
		
			System.out.println("try again?");
			answer = sc.next();
		} //end while
	
	}
	

}
