/**
 * Created with JetBrains WebStorm.
 * User: jkarova
 * Date: 10/22/12
 * Time: 3:55 PM
 * To change this template use File | Settings | File Templates.
 */

window.addEventListener('load', function(event) {

	touchCollectObj = document.getElementById("touch-collect");
	touchCollectObj.style.height = window.document.documentElement.clientHeight + "px";

	touchCollectObj.addEventListener('touchstart', function (event) {
		var newTouch = document.createElement("div");
		newTouch.classList.add("touchmarker");
		newTouch.style.top = (event.touches[0].screenY-25) + "px";
		newTouch.style.left = (event.touches[0].screenX-25) + "px";

		touchCollectObj.appendChild(newTouch);
	});
});