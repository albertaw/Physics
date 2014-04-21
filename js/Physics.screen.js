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
	var minVelocity = -100
	//privatic static: Adds the amount specified to the quantity related to the given element
	//TODO make this a plugin that can set min and max value so I can call selector.modifyQty(amt)
	function modifyQty(val, selector){
		var qty = selector.val();  //get the current value in the input field
		var newQty = parseInt(qty, 10) + val;	//qty += val, qty-=val
		if (newQty < 0){
			newQty = 0;
		}else if (newQty > maxVelocity){
			selector.val(maxVelocity);
		}else{
			selector.val(newQty); 	//set the value in the input equal to the newQty
		}
		
	}
	
	//functions to put in timer:
	//enable velocitybuttons/field 
	
	//disable velocity buttons when animation starts
	
	//enable disable key controls
 
	
	function initVelocityFields() {
		$('#vx').blur(function (){ //hoping this will take care of clicking the + - button and entering text into field
			//parse the number from field
			var num = $("#vx").val();
		
			//if its good set vx
			if (num <= maxVelocity && num >= minVelocity) {
				setVx(num);
				console.log("vx:" + getVx());
			} else if(num < minVelocity) {	
				//set to the min value
				$("#vx").val(minVelocity);
				setVx(minVelocity);
				console.log("vx:" + getVx());
			} else if(num > maxVelocity) {
				//set to max value
				$("#vx").val(maxVelocity);
				setVx(maxVelocity);
				console.log("vx:" + getVx());
			}
		})
		
		$('#vy').blur(function (){
			//parse the number from field
			var num = $("#vy").val();
			//if its good set vy
			if (num <= maxVelocity && num >= minVelocity) {
				setVy(num);
				console.log("vy:" + getVy());
			} else if(num < minVelocity) {	
				//set to the min value
				$("#vy").val(minVelocity);
				setVy(minVelocity);
				console.log("vy:" + getVy());
			} else if(num > maxVelocity) {
				//set to max value
				$("#vy").val(maxVelocity);
				setVy(maxVelocity);
				console.log("vy:" + getVy());
			}
		})
	}
		
	function initBtnPlusMinus() {	
		$('#btn-plus-vx').click(function (){
			modifyQty(10, $('#vx'));
			//set vx to new value
			setVx($('#vx').val());
			console.log("vx:" + getVx());
		});
		
		$('#btn-plus-vy').click(function (){
			modifyQty(10, $('#vy'));
			setVy($('#vy').val());
			console.log("vy:" + getVy());
		});
		
		$('#btn-minus-vx').click(function (){
			modifyQty(-10, $('#vx'));
			setVx($('#vx').val());
			console.log("vx:" + getVx());
		});
		
		$('#btn-minus-vy').click(function (){
			modifyQty(-10, $('#vy'));
			setVy($('#vy').val());
			console.log("vy:" + getVy());
		});
		
		$('#btnStartStop').click(function () {
			handleStartStop();
		});
			
		$('#btnReset').click(function () {
			console.log("reset");
			handleReset();
		});
	};
	
	function handleWindowResize() {
		$(window).resize(function () {
			Physics.world.setWidth();
			Physics.world.setHeight();
		});
	};
	
	function initKeyboard() {
		var circle = $("#circle");
		$(document).keydown(function(key){
			var newPos;
			//get height and width
			var maxWidth = Physics.world.getWidth() - radius;
			var maxHeight = Physics.world.getHeight() - radius;
			
			switch(parseInt(key.which,10)){
				case 37:	//left arrow
					newPos = getX() - radius;
					if(newPos >= radius) {
						//slide left 
						//set x
						setX(newPos);
						console.log(getX());
					} else {
						setX(radius);
					}
					break;
				case 38:	//up arrow
					newPos = getY() - radius
					if(newPos >= radius) {
						//slide up
						//set y
						setY(newPos);
					} else {
						setY(radius);
					}
					break;
				case 39:	//right arrow
					newPos = getX() + radius;
					if(newPos <= maxWidth) {
						//slide right
						//set x
						setX(newPos);
					} else {
						setX(maxWidth);
					}
					break;
				case 40:	//down arrow
					var newPos = getY() + radius;
					if(newPos <= maxHeight) {
						//slide down
						//set y
						setY(newPos);
					} else {
						setY(maxHeight);
					}
					break;
				
				default:
					break;
			}
			
			return false;
		
		});
	};
	
	return {
	
		init: function () {
			initVelocityFields();
			initBtnPlusMinus();
			handleWindowResize();
			initKeyboard();
		}
	}
	
})();