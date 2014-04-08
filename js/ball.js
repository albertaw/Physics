var Ball = {};
var t = 0;
var timeStep = 10;
//General properties and methods for ball
Ball.createBall = (function () {
	var g = 1;		//acceleration due to gravity
	var vxi = 30; 	//initial horizontal velocity
	var vyi = -10;	//initial vertical velocity
	var vx;
	var vy;
	var xi = 0;
	var yi = 0;
	var x = 0;
	var y = 0;
	
	var ball = $('.ball');
	
	var setX = function (xi) {
		this.xi = xi;
		ball.css("left", xi);
	}
	
	var getX = function () {
		//return this.x;
		return parseInt(ball.css("left"), 10)
	}
	
	var setY = function (yi) {
		this.yi = yi;
		ball.css("top", yi);
	}
	
	var getY = function () {
		//return this.y;
		return parseInt(ball.css("top"), 10)
	}
	
	var setVX = function (vxi) {
		this.vxi = vxi;
	}
	
	var getVX = function () {
		return this.vxi;
	}
	
	var setVY = function (vyi) {
		this.vyi = vyi;
	}
	
	var getVY = function () {
		return this.vyi;
	}
	
	var animate = function () {
		t += 1;
		xi = parseInt(ball.css("left"), 10);
        x += vxi;
		yi = parseInt(ball.css("top"), 10);
		y = yi + (vyi * t) + (.5 * g * t * t);	//this is not getting the parsed value of vy
		 if (y >= 250) {
			y = 250;
			clearInterval(timer);
			$('#btnStartStop').text('Start Animation');
            timer = null;
		}
		$('#line1').css("width", "+=" + vxi);
		setX(x);
		setY(y);
		
		console.log(getX() + " " + getY());
	}
	
	var timer = null;
	var startStopAnimation = function () {
		if(timer == null) {
			timer = setInterval(animate, 30);
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
			