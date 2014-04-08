var Ball = {};
var time = 0;
var timeStep = .01;
//General properties and methods for ball
Ball.createBall = (function () {
	var g = -1;		//acceleration due to gravity
	var vx = 16; //parseInt($('#velocity').val(), 10);		//initial horizontal velocity
	var vy = 16;		//initial vertical velocity
	var x = 0;
	var y = 0;
	
	var ball = $('.ball');
	
	var setX = function (xi) {
		//this.x = xi;
		ball.css("left", xi);
	}
	
	var getX = function () {
		//return this.x;
		return parseInt(ball.css("left"), 10)
	}
	
	var setY = function (yi) {
		//this.y = yi;
		ball.css("top", yi);
	}
	
	var getY = function () {
		//return this.y;
		return parseInt(ball.css("top"), 10)
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
		x = parseInt(ball.css("left"), 10);
        var newX = x + vx;
		y = parseInt(ball.css("top"), 10);
		vy += g;	//this is not getting the parsed value of vy
		var newY = y + vy;
		 if(newX >= 1000 || newX <= 0) {
            vx *= -1;
			clearInterval(timer);
			timer = null;
			$('#btnStartStop').text('Start Animation');
        }

			console.log("vy:"+ vy);
		
		$('#line1').css("width", "+=" + vx);
		setX(newX);
		setY(newY);
	
		console.log(getX() + " " + getY());
	}
	
	var timer = null;
	var startStopAnimation = function () {
		if(timer == null) {
			timer = setInterval(animate, timeStep);
			$('#btnStartStop').text('Stop Animation');
		} else {
            clearInterval(timer);
			$('#btnStartStop').text('Start Animation');
            timer = null;
        }
	}
	
	return {
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
	newBall.setX(0);
	newBall.setY(250);
	newBall.setVX(parseInt($('#vx').val(), 10)); //this isn't parsing
	newBall.setVY(parseInt($('#vy').val(), 10)); //this isn't parsing
	console.log(newBall.getVX() + " " + newBall.getVY());
	$('#btnStartStop').click(function () {
		newBall.startStopAnimation();

	});
	
});
			