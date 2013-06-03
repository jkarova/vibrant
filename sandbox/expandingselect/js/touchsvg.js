/**
 * Created with JetBrains WebStorm.
 * User: jkarova
 * Date: 10/22/12
 * Time: 3:55 PM
 * To change this template use File | Settings | File Templates.
 */

window.addEventListener('load', function(event) {

	var touchList;
	var touchCount = 0;
	var touchSet = [];

	function createCircle(container, x, y, id) {
		var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		c.setAttribute("cx", x);
		c.setAttribute("cy", y);
		c.setAttribute("r", "50");
		c.setAttribute("id", id);
		c.setAttribute("fill", '#' + ('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6));
		touchSet[id] = container.appendChild(c);
	};

	function createArc(container, x, y, id) {
		var gTranslate = document.createElementNS("http://www.w3.org/2000/svg", "g");
		gTranslate.setAttribute("transform", "translate(" + x + "," + y + ")");
		gTranslate.setAttribute("id", id);

		var animate = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
		animate.setAttribute("attributeName", "transform");
		animate.setAttribute("attributeType", "XML");
		animate.setAttribute("type", "rotate");
		animate.setAttribute("from", "0");
		animate.setAttribute("to", "360");
		animate.setAttribute("dur",".5s");
		animate.setAttribute("repeatCount", "indefinite");

		var gRotate = document.createElementNS("http://www.w3.org/2000/svg", "g");
		gRotate.setAttribute("transform", "rotate(" + Math.round(Math.random()*360) + ")");

		var a = document.createElementNS("http://www.w3.org/2000/svg", "path");
		a.setAttribute("stroke", "#" + (Math.random()*16777216<<0).toString(16).substr(-6));
		a.setAttribute("stroke-width", Math.round(Math.random()*20));
	  a.setAttribute("id", id);
		a.setAttribute("d", "m-50,0 a50,50 0 0 0 100,0");

		gRotate.appendChild(animate);
		gRotate.appendChild(a);
		gTranslate.appendChild(gRotate);

		animate = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
		animate.setAttribute("attributeName", "transform");
		animate.setAttribute("attributeType", "XML");
		animate.setAttribute("type", "rotate");
		animate.setAttribute("from", "360");
		animate.setAttribute("to", "0");
		animate.setAttribute("dur",".75s");
		animate.setAttribute("repeatCount", "indefinite");

		gRotate = document.createElementNS("http://www.w3.org/2000/svg", "g");
		gRotate.setAttribute("transform", "rotate(" + Math.round(Math.random()*-360) + ")");

		a = document.createElementNS("http://www.w3.org/2000/svg", "path");
		a.setAttribute("stroke", "#" + (Math.random()*16777216<<0).toString(16).substr(-6));
		a.setAttribute("stroke-width", Math.round(Math.random()*20));
		a.setAttribute("id", id);
		a.setAttribute("d", "m-30,0 a30,30 0 0 0 60,0");

		gRotate.appendChild(animate);
		gRotate.appendChild(a);
		gTranslate.appendChild(gRotate);

		touchSet[id] = container.appendChild(gTranslate);
	}

	var touchCollectObj = document.getElementById("touch-collect");
	touchCollectObj.setAttribute("width", window.document.documentElement.clientWidth);
	touchCollectObj.setAttribute("height", window.document.documentElement.clientHeight);

	document.body.addEventListener('touchstart', function (event) {
		if (!touchList) touchList = event.changedTouches[i];

		for (var i = 0; i < event.changedTouches.length; i++) {
			if (!touchCollectObj.getElementById(event.changedTouches[i].identifier)) {
				var touch = event.changedTouches[i];
				createArc(touchCollectObj, touch.screenX, touch.screenY, event.changedTouches[i].identifier);
				//createCircle(touchCollectObj, touch.screenX, touch.screenY, event.changedTouches[i].identifier);
			}
		}
	});

	document.body.addEventListener('touchmove', function (event) {
		//event.stopPropagation();
		event.preventDefault();

		var changedTouch;

		for (var i = 0; i < event.changedTouches.length; i++) {
			changedTouch = event.changedTouches[i];
			//var elementToMove = touchCollectObj.getElementById(changedTouch.identifier);
			//console.log("[" + changedTouch.screenX + ", " + changedTouch.screenY + "]");
			//elementToMove.setAttribute("cx", changedTouch.screenX);
			//elementToMove.setAttribute("cy", changedTouch.screenY);

			//touchSet[changedTouch.identifier].setAttribute("cx", changedTouch.screenX);
			//touchSet[changedTouch.identifier].setAttribute("cy", changedTouch.screenY);
			touchSet[changedTouch.identifier].setAttribute("transform", "translate(" + changedTouch.screenX + "," + changedTouch.screenY + ")");
		}
	});

	document.body.addEventListener('touchend', function (event) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			//var elementToRemove = touchCollectObj.getElementById(event.changedTouches[i].identifier);
			//if (elementToRemove) {
			//	touchCollectObj.removeChild(elementToRemove);
			//}
			touchCollectObj.removeChild(touchSet[event.changedTouches[i].identifier]);
		}
	});
});