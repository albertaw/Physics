var Ball = {};

//General properties and methods for ball
Ball.createBall = (function () {
	var g = 1;		//acceleration due to gravity
	var vx = 8; 	//initial horizontal velocity
	var vy = 0;		//initial vertical velocity
	var x = 0;
	var y = 0;
	
	//set circle attributes//
	var circle = document.getElementById('circle');
	
	var setStrokeStyle = function (color) {
		circle.style.stroke = color;
	}
	
	var setStrokeWidth = function (width) {
		circle.style['stroke-width'] = width;
	}
	
	var setFillColor = function (color) {
		circle.style.fill = color;
	}
	
	var setX = function (xi) {
	//this.x = xi;
		circle.setAttribute("cx", xi);
	}
	
	var getX = function () {
		//return this.x;
		return parseInt(circle.getAttribute("cx"), 10)
	}
	
	var setY = function (yi) {
		//this.y = yi;
		circle.setAttribute("cy", yi);
	}
	
	var getY = function () {
		//return this.y;
		return parseInt(circle.getAttribute("cy"), 10)
	}
	
	var setVX = function (vxi) {
		this.vx = vxi;
	}
	
	var getVX = function () {
		return this.vx;
	}
	
	var setVY = function (vyi) {
		this.vy = vyi;
	}
	
	var getVY = function () {
		return this.vy;
	}
	
	var animate = function () {
	
		x = circle.getAttribute("cx");
		//vx = parseInt(getVX()); 
        var newX = parseInt(x) + vx;
		y = circle.getAttribute("cy");
		vy += g;	//this is not getting the parsed value of vy
		var newY = parseInt(y) + vy;
		//animate line
		var line = $('#line1');
		//var newX2Pos = parseInt(line.getAttribute("x2"), 10) + vx;
		 if(newX >= 1000) {
            //newX = 75;
			clearInterval(timer);
        }
		
		//if ball hits ground
		if (newY >= 425) {	//position of ground - the radius of the ball
			vy *= -.8;	//reverse the velocity and reduce speed
			//setY(newY);
			console.log("vy"+ vy);
		}
	
		//line.setAttribute('x2', newX2Pos);
		setX(newX);
		setY(newY);
	
		console.log(getX() + " " + getY());
	}
	
	var timer = null;
	var startStopAnimation = function () {
		if(timer == null) {
			timer = setInterval(animate, 20);
			$('#btnStartStop').text('Stop Animation');
		} else {
            clearInterval(timer);
			$('#btnStartStop').text('Start Animation');
            timer = null;
        }
	}
	
	return {
	
		setStrokeStyle: setStrokeStyle,
		setStrokeWidth: setStrokeWidth,
		setFillColor: setFillColor,
		setX: setX,
		getX: getX,
		setY: setY,
		getY: getY,
		setVX: setVX,
		getVX: getVX,
		setVY: setVY,
		getVY: getVY,
		startStopAnimation: startStopAnimation
		
	}
	
})();

Ball.physics = (function () {
	
	
})();

$(document).ready(function () {
	//alert("hello");
	var newBall = Ball.createBall;
	newBall.setStrokeStyle("#000");
	newBall.setStrokeWidth(8);
	newBall.setFillColor("#fff");
	newBall.setX(75);
	newBall.setY(425);
	newBall.setVX(parseInt($('#vx').val(), 10)); //this isn't parsing
	newBall.setVY(parseInt($('#vy').val(), 10)); //this isn't parsing
	console.log(newBall.getVX() + " " + newBall.getVY());
	$('#btnStartStop').click(function () {
		newBall.startStopAnimation();

	});
	
});
			