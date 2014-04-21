/********************************************************************
 * MAIN
 *******************************************************************/

$(document).ready(function () {
	//enable all buttons and fields
	document.getElementById('btnStartStop').disabled = false;
	
	Physics.world.init();
	Physics.screen.init();
	
});		

