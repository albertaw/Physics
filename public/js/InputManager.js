/** The input manager handles the detection of raw input from the device
  * and allows for the registration of objects to be notified of input events
  */

Physics.InputManager = (function () {
	var clicked = false;
	var clickX;
	var clickY;
	var dx;
	var dy;
	var minVelocity = -100;
	var maxVelocity = 100;
	
	var ondragstart = function (e) {
		//onmousedown get the position of the cursor
		e.preventDefault(); // Needed for Firefox to allow dragging correctly
        clicked = true;
		clickX = e.clientX; 
		clickY = e.clientY;
		//set clicked = true
		console.log("ondragstart triggered");
	};
	
	var ondrag = function (e) {
		//onmousemove update the position to
		//current position + the change in position 
		//which is the position of the cursor - the position at ondragstart
		e.preventDefault();
        if(clicked){
          //  dx = e.clientX - clickX;
           // dy = e.clientY - clickY;

            e.target.setAttribute("transform", "translate(" + moveX + "," + moveY + ")");
		}
	};
	var ondrop = function () {
		//onmouseup set clicked = false
		clicked = false;
	};
	
	//input field settings
	
	//Requires that the particles dictionary is not at its max capicity
	//inititalizes a new ball and draws it on the screen
	var addBall = function () {
		Physics.ParticleManager.add(new Physics.Particle());
	};
	
	//Requires that there are at least two balls on the screen
	//looks for the first existing ball to destroy
	var removeBall = function () {
		var id = Physics.ParticleManager.length() - 1;
		if (id !=0) {
			Physics.ParticleManager.destroyObjectById(id);
			console.log("ball " + id + "destroyed");
			Physics.ParticleManager.nextID--;	//must be updated to maintain uninterrupted sequence of numbers when adding back balls
		}
	};
	
	//Requires the fields to have an initial numeric value. Value of field cannnot
	//exceed set max or value. Inputs a number and adds its value to the value of the
	//element, then sets particle's velocity to value of field.
	var handleQuantityChanged = function (val, element) {
		var qty = parseInt(element.val(), 10);  //get the current value in the field
								//set initial value to 0 if null, undefined, or NAN
		var newQty = qty + val;	//qty += val
		if (newQty < minVelocity) {	//check that the the new number is not less than our min
			element.val(minVelocity);
		} else if (newQty > maxVelocity) {	//check that the new number is not greater than our max
			element.val(maxVelocity);
		} else {
			element.val(newQty); 	//set the value in the input equal to the newQty
		}
		
	};
	
	//toggles between play and pause
	var handleStartStop = function () {
		if ($('#btnStartStop').attr('src') == "img/play.png") {
			$('#btnStartStop').attr('src', "img/pause.png")	//change to pause button
			//start animation
			Physics.Clock.init();
		} else {
			$('#btnStartStop').attr('src', "img/play.png")	//change to play button
			//pause animation
			Physics.Clock.cleanup();
		}
	};
	
	var addKeyboardListener;
	var addMouseListener = function () {
		//ondragstart(event);
		//ondrag(event);
		//ondrop();
		$('#btn-plus-vx').click(function () {
			handleQuantityChanged(10, $('#vx'));
			//update particle vx
			Physics.ParticleManager.particles[0].setVx($('#vx').val());
			console.log(Physics.ParticleManager.particles[0].getVx());
		});
		
		$('#btn-plus-vy').click(function () {
			handleQuantityChanged(10, $('#vy'));
			Physics.ParticleManager.particles[0].setVy($('#vy').val());
			console.log(Physics.ParticleManager.particles[0].getVy());
		});
		
		$('#btn-minus-vx').click(function () {
			handleQuantityChanged(-10, $('#vx'));
			Physics.ParticleManager.particles[0].setVx($('#vx').val());
			console.log(Physics.ParticleManager.particles[0].getVx());
		});
		
		$('#btn-minus-vy').click(function () {
			handleQuantityChanged(-10, $('#vy'));
			Physics.ParticleManager.particles[0].setVy($('#vy').val());
			console.log(Physics.ParticleManager.particles[0].getVy());
		});
		
		$('#btnStartStop').click(function () {
			handleStartStop();
		});
		
		$(window).resize(function () {
			Physics.world.update();
		
		});

		$('#add').click(function () {
			addBall();
		});
		
		$('#remove').click(function () {
			removeBall();
		});
	};
	
	
	var removeKeyboardListener;
	var removeMouseListener;
	
	//the previous state for all input devices is saved then the input devices 
	//are polled and compared to their previous states. If there are any 
	//discrepancies between the two states of the device, then some kind of input 
	//event has taken place and the appropriate events will be triggered.
	var update;

	
	var init = function () {
		//initialize button and field values
		$('#vx').val(0);
		$('#vy').val(0);
		//addKeyboardListener();
		addMouseListener();
	};
	
	var cleanup = function () {
		//removeKeyboardListener
		//removeMouseListener
	};


	return {
		init: init
	}

})();

