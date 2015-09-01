/********************************************************************
 * PHYSICS.SCREEN
 ********************************************************************
 * Initializes the world using Physics.world.init().  Draws UI elements and
 * and event listeners to them.  Provides Physics.world with data parsed from UI
 * elements to set any object properties that are taken from them.???
 * Keyboard controlls to manipulate object on screen.  Access objects through
 * Physics.world.getObject()
 */
 
 Physics.screen = (function () {
	
	var maxVelocity = 100;  	//this is a particle's attribute
	var minVelocity = -100;
	//privatic static: Adds the amount specified to the quantity related to the given element
	//TODO make this a plugin that can set min and max value so I can call selector.modifyQty(amt)
	var modifyQty = function (val, selector){
		var qty = selector.val();  //get the current value in the input field
		var newQty = parseInt(qty, 10) + val;	//qty += val, qty-=val
		if (newQty < minVelocity){
			selector.val(minVelocity);
		}else if (newQty > maxVelocity){
			selector.val(maxVelocity);
		//} else if (qty == null){	//TODO check for NAN
			//selector.val(val);
		} else{
			selector.val(newQty); 	//set the value in the input equal to the newQty
		}
		
	};
	
	//functions to put in timer:
	//enable velocitybuttons/field 
	
	//disable velocity buttons when animation starts
	
	//enable disable key controls
 
	
	var initVelocityFields = function () {
		$('#vx').blur(function (){ //hoping this will take care of clicking the + - button and entering text into field
			//parse the number from field
			var num = $("#vx").val();
		
			//if number is outside of our constraintes
			if (num <= maxVelocity && num >= minVelocity) {
				Physics.particle.setVx(num);
				console.log("vx:" + Physics.particle.getVx());
			} else if(num < minVelocity) {	
				//set to the min value
				$("#vx").val(minVelocity);
				Physics.particle.setVx(minVelocity);
				console.log("vx:" + Physics.particle.getVx());
			} else if(num > maxVelocity) {
				//set to max value
				$("#vx").val(maxVelocity);
				Physics.particle.setVx(maxVelocity);
				console.log("vx:" + Physics.particle.getVx());
			}
		});
		
		$('#vy').blur(function (){
			//parse the number from field
			var num = $("#vy").val();
			//if its good set vy
			if (num <= maxVelocity && num >= minVelocity) {
				Physics.particle.setVy(num);
				console.log("vy:" + Physics.particle.getVy());
			} else if(num < minVelocity) {	
				//set to the min value
				$("#vy").val(minVelocity);
				Physics.particle.setVy(minVelocity);
				console.log("vy:" + Physics.particle.getVy());
			} else if(num > maxVelocity) {
				//set to max value
				$("#vy").val(maxVelocity);
				Physics.particle.setVy(maxVelocity);
				console.log("vy:" + Physics.particle.getVy());
			}
		});
	};
		
	var initBtnPlusMinus = function () {	
		$('#btn-plus-vx').click(function (){
			modifyQty(10, $('#vx'));
			//set vx to new value
			Physics.particle.setVx($('#vx').val());
			console.log("vx:" + Physics.particle.getVx());
		});
		
		$('#btn-plus-vy').click(function (){
			modifyQty(10, $('#vy'));
			Physics.particle.setVy($('#vy').val());
			console.log("vy:" + Physics.particle.getVy());
		});
		
		$('#btn-minus-vx').click(function (){
			modifyQty(-10, $('#vx'));
			Physics.particle.setVx($('#vx').val());
			console.log("vx:" + Physics.particle.getVx());
		});
		
		$('#btn-minus-vy').click(function (){
			modifyQty(-10, $('#vy'));
			Physics.particle.setVy($('#vy').val());
			console.log("vy:" + Physics.particle.getVy());
		});
		
		$('#btnStartStop').click(function () {
			handleStartStop();
		});
			
		$('#btnReset').click(function () {
			console.log("reset");
			handleReset();
		});
	};
	
	var handleWindowResize = function () {
		$(window).resize(function () {
			Physics.world.setWidth();
			Physics.world.setHeight();
		});
	};
	
	var initKeyboard = function () {
		var circle = $("#circle");
		$(document).keydown(function(key){
			var newPos;
			//get height and width
			var maxWidth = Physics.world.getWidth() - Physics.particle.getRadius();		//width = screen width - ball radius
			var maxHeight = Physics.world.getHeight() - Physics.particle.getRadius();	//height = screen height - ball radius
			
			switch(parseInt(key.which,10)){
				case 37:	//left arrow
					newPos = Physics.particle.getX() - Physics.particle.getRadius();		//new x = x pos - ball radius
					if(newPos >= Physics.particle.getRadius()) {							//if new x greater than or equal to ball radius
						Physics.particle.setX(newPos);								//slide left
						console.log(Physics.particle.getX());
					} else {
						Physics.particle.setX(Physics.particle.getRadius());				//reposition ball to the left edge of screen
					}
					break;
				case 38:	//up arrow
					newPos = Physics.particle.getY() - Physics.particle.getRadius();		//new y = y pos - ball radius
					if(newPos >= Physics.particle.getRadius()) {							//if new y 	is greater than or equal to ball radius
						Physics.particle.setY(newPos);								//slide up
					} else {
						Physics.particle.setY(Physics.particle.getRadius());				//else repositon ball to top edge of screen
					}
					break;
				case 39:	//right arrow
					newPos = Physics.particle.getX() + Physics.particle.getRadius();		//new x = x pos + radius
					if(newPos <= maxWidth) {										//if new x is less than or equal to screen width
						Physics.particle.setX(newPos);								//slide right
					} else {
						Physics.particle.setX(maxWidth);							//else reposition to right edge of screen
					}
					break;
				case 40:	//down arrow
					newPos = Physics.particle.getY() + Physics.particle.getRadius();		//new y = y pos + radius
					if(newPos <= maxHeight) {										//if new y less than or equal to screen height
						Physics.particle.setY(newPos);								//slide down
					} else {
						Physics.particle.setY(maxHeight);							//else reposition ball to bottom edge of screen
					}
					break;
				
				default:
					break;
			}
		
		});
	};
	/*********************************************/
	var printData = function () {
		//$('#time').text(getDt());
		//$('#x-pos').text(getX());
		//$('#y-pos').text(380 - getY());	//subtract current y position from starting y position
		$('#vx').text(Physics.particle.getVx());
		$('#vy').text(Physics.particle.getVy());
		//$('#energy').text(getEnergy());
	
	};
	
	var init =  function () {
			initVelocityFields();
			initBtnPlusMinus();
			handleWindowResize();
			initKeyboard();
		};
	
	return {
	
		init: init
	}
	
})();