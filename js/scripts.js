
	var g = 1;		//acceleration due to gravity
	var vx = 0; 	//initial horizontal velocity
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
			setY(400)
			setVY(0);
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

$(document).ready(function () {

	setStrokeStyle("purple");
	setFillColor("#fff");
	setStrokeWidth("4");
	setX(75);
	setY(425);
	setVX(parseInt($('#vx').val(), 10)); //this isn't parsing
	setVY(parseInt($('#vy').val(), 10)); //this isn't parsing
	console.log(getVX() + " " + getVY());
	$('#btnStartStop').click(function () {
		startStopAnimation();

	});
	
});
			