/**
 * Detects if a particle is in contact or outside the boundaries of the "world".
 * Sets particle's positin to the floor, ceiling, or wall position if in contact.
 * Ex. resolveBallFixedPointCollision(Physics.ParticleManager.particles[i]);
 */
	 
Physics.CollisionManager = (function () {

	var resolveBallFixedPointCollision = function (ball) {
		
		if(ball.getY() >= Physics.World.getHeight() - ball.getRadius()) {	//if in collision with bottom edge
			var y = Physics.World.getHeight() - ball.getRadius();		//reposition to edge of floor
			ball.setY(y);
			var vy = ball.getVy() * -.8;		//reverse the particle's direction and reduce speed
			ball.setVy(vy);
        } else if(ball.getY() <= ball.getRadius()) {	//if in collision with ceiling
			var y = ball.getRadius();		//reposition to top edge
			ball.setY(y);
			var vy = ball.getVy() * -.8;		//reverse the particle's direction and reduce speed
			ball.setVy(vy);
		}
		if(ball.getX() >= Physics.World.getWidth() - ball.getRadius()) {	//if in collision with right edge of wall
			var x = Physics.World.getWidth() - ball.getRadius();	//reposition to right edge of wall
			var vx = ball.getVx() * -.8;		//reverse the particle's direction and reduce speed
			ball.setVx(vx);
		} else if(ball.getX() <= ball.getRadius()) {		//if in collision with left edge
			var x = ball.getRadius();		//reposition to left edge
			var vx = ball.getVx() * -.8;		//reverse the particle's direction and reduce speed
		}
		
		//console.log("wall checked");
	};
	
	var resolveBallToBallCollision = function (ball1, ball2) {
		console.log(ball1.getID() + " " + ball2.getID() + " checked");
		
	};
	
	return {
		resolveBallFixedPointCollision: resolveBallFixedPointCollision,
		resolveBallToBallCollision: resolveBallToBallCollision
	}
	
})();