/**
 * Detects if a particle is in contact or outside the boundaries of the "world".
 * Sets particle's positin to the floor, ceiling, or wall position if in contact.
 * Ex. resolveBallFixedPointCollision(Physics.ParticleManager.particles[i]);
 */
	 
Physics.CollisionManager = (function () {

	var resolveBallFixedPointCollision = function (ball) {

		if (ball.getX() >= Physics.World.getWidth() - ball.getRadius()) {	//if in collision with right edge of wall
			var x = Physics.World.getWidth() - ball.getRadius();	//reposition to right edge of wall
			ball.setX(x);
			var vx = ball.getVx() * -1;		//reverse the particle's direction and reduce speed
			ball.setVx(vx);
		} else if (ball.getX() <= ball.getRadius()) {		//if in collision with left edge
			var x = ball.getRadius();		//reposition to left edge
			ball.setX(x);
			var vx = ball.getVx() * -1;		//reverse the particle's direction and reduce speed
			ball.setVx(x);
		}

		if(ball.getY() >= Physics.World.getHeight() - ball.getRadius()) {	//if in collision with bottom edge
			var y = Physics.World.getHeight() - ball.getRadius();		//reposition to edge of floor
			ball.setY(y);
			var vy = ball.getVy() * -1;		//reverse the particle's direction and reduce speed
			ball.setVy(vy);
        } else if(ball.getY() <= ball.getRadius()) {	//if in collision with ceiling
			var y = ball.getRadius();		//reposition to top edge
			ball.setY(y);
			var vy = ball.getVy() * -1;		//reverse the particle's direction and reduce speed
			ball.setVy(vy);
		}
		
		//console.log("wall checked");
	};
	
	//detect collision: the centers of 2 circles are r1 + r2 units apart at point of collision
	//distance between the objects is obj.pos1 - obj.pos2
	//if distance <= r then there is a collision swap the velocities
	var resolveBallToBallCollision = function (ball1, ball2) {
		//console.log(ball1.getId() + " " + ball2.getId() + " checked");
		var r = ball1.getRadius() * 2;
		var dx = Math.abs(ball1.getX() - ball2.getX());
		var dy = Math.abs(ball1.getY() - ball2.getY());
		if (dx < r) {
			var temp = ball1.getVx();
			ball1.setVx(ball2.getVx());
			ball2.setVx(temp);
			
			console.log('embedded');
		}
	};
	
	return {
		resolveBallFixedPointCollision: resolveBallFixedPointCollision,
		resolveBallToBallCollision: resolveBallToBallCollision
	}
	
})();