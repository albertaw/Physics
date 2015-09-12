var Physics = Physics || {};

Physics.util = (function () {

	var radius = 80;

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

	return {
		randomX: randomX,
		randomY: randomY
	}
	
})();