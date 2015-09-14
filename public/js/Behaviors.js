/**
 * Detects if a particle is in contact or outside the boundaries of the "world".
 * Sets particle's position to the floor, ceiling, or wall position if in contact.
 * Ex. resolveBallFixedPointCollision(Physics.ParticleManager.particles[i]);
 */
	 
Physics.behaviors = (function () {

	//factor between 0 and 1 to account for energy loss in collision.
	//0 for completely inelastic collision, 1 for elastic collision.
	var elasticity;

	var resolveBallWallCollision = function (ball) {

		if (ball.getX() >= Physics.world.getWidth() - ball.getRadius()) {	//if in collision with right edge of wall
			var x = Physics.world.getWidth() - ball.getRadius();	//reposition to right edge of wall
			ball.setX(x);
			var vx = ball.getVx() * -1;		//reverse the particle's direction and reduce speed
			ball.setVx(vx);
		} else if (ball.getX() <= ball.getRadius()) {		//if in collision with left edge
			var x = ball.getRadius();		//reposition to left edge
			ball.setX(x);
			var vx = ball.getVx() * -1;		//reverse the particle's direction and reduce speed
			ball.setVx(vx);
		}

		if(ball.getY() >= Physics.world.getHeight() - ball.getRadius()) {	//if in collision with bottom edge
			var y = Physics.world.getHeight() - ball.getRadius();		//reposition to edge of floor
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
		var r = ball1.getRadius() + ball2.getRadius(),
			x1 = ball1.getX(),
			x2 = ball2.getX(),
			y1 = ball1.getY(),
			y2 = ball2.getY(),
			//distance between both balls
			d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
			//overlap of both balls
			l = r - d,
			ux1 = ball1.getVx(),
			ux2 = ball2.getVx(),
			uy1 = ball1.getVy(),
			uy2 = ball2.getVy(),
			//amount to move ball 1
			//! does not work when both vy or both vx are the same
			sx1 = - ux1 / Math.abs(ux1 - ux2) * l,
			sy1 = - uy1 / Math.abs(uy1 - uy2) * l,
			//amount to move ball 2
			sx2 = - ux2 / Math.abs(ux1 - ux2) * l,
			sy2 = - uy2 / Math.abs(uy1 - uy2) * l;

			if (d <= r) {
				//reposition balls
				ball1.setX(x1 + sx1);
				ball1.setY(y1 + sy1);
				ball2.setX(x2 + sx2);
				ball2.setY(y2 + sy2);
				//exchange velocities
				ball1.setVx(ux2);
				ball1.setVy(uy2);
				ball2.setVx(ux1);
				ball2.setVy(uy1);
				console.log('x1: ' + sx1 + ' y1:' + sy1 + ' x2:' + sx2 + ' y2:' + sy2);
				/*Clock.stop();
				console.log('embedded');
				setTimeout(function () {
					Clock.start(Physics.objectManager.update);
				}, 1000);
				*/
		}
	};
	
	return {
		resolveBallFixedPointCollision: resolveBallWallCollision,
		resolveBallToBallCollision: resolveBallToBallCollision
	}
	
})();