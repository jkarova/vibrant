/**
 * Add a class to specific DOM node
 * @param {Object} node The DOM node receiving the new class
 * @param {String} newClass The class being added to the DOM node
 */
function addClass( node, newClass ) {
	if ( ! node ) return null;
	if (typeof node == 'string') node = document.getElementById( node );

	if ( ! hasClass( node, newClass ) ) {
		node.className = ( node.className ) ? node.className + ' ' + newClass : newClass;
	}
}

/**
 * Bind an event listener to a DOM node
 * @param {Object} el The DOM node that will observe the event
 * @param {String} type The type of event (e.g. 'click', 'keypress', 'mouseover', 'hover')
 * @param {Object} fn The function that will be called when the event is observed
 */
function addListener( el, type, fn ) {
	if ( el.addEventListener ) {
		el.addEventListener( type, fn, false );
		return true;
	} else if ( el.attachEvent ) {
		return el.attachEvent( 'on'+type, fn );
	} else {
		el[ 'on'+type ] = fn;
	}
}

/**
 * Get an array of elements that are children of node, of class tag, and possessing the class searchClass
 *   - via Dustin Diaz
 * @param {Object} node The DOM node containing the children nodes to be searched (defaults to document)
 * @param {String} searchClass The class being queried
 * @param {String} tag The type of tag possessing the searchClass
 */
function getElementsByClass( node, searchClass, tag ) {
	var classElements = [];
	var node = node || document;
	var tag = tag || '*';
	var els = node.getElementsByTagName(tag); // use "*" for all elements
	var pattern = new RegExp( '(^|\\s)' + searchClass + '(\\s|$)' );

	for ( var i = 0, j = 0, elsLen = els.length; i < elsLen; i++ ) {
		if ( pattern.test( els[ i ].className ) ) {
			classElements[ j ] = els[ i ];
			j++;
		}
	}

	return classElements;
}

/**
 * Return the element that observed the event
 * @param {Object} evt The event object representing the user interaction
 * @returns {Object} A reference to the DOM node that observed the event
 */
function getEventTarget( evt ) {
	evt = evt || window.event;
	return evt.srcElement || evt.target;
}

/**
 * Return true/false if a test node possesses a specific class
 * @param {Object} node The DOM node being tested for a specific class
 * @param {String} testClass The class being tested
 */
function hasClass( node, testClass, output ) {
	if ( ! node ) return null;
	if (typeof node == 'string') node = document.getElementById( node );
	var match = node.className.search( new RegExp( '(^|\\s)' + testClass + '(\\s|$)' ) );
	return ( match < 0 ) ? false : true;
}

/**
 * Remove a class from an DOM node
 * @param {Object} node The DOM node possessing the class being removed
 * @param {String} targetClass The class being removed
 */
function removeClass( node, targetClass ) {
	if ( ! node ) return null;
	if (typeof node == 'string') node = document.getElementById( node );

	node.className = node.className
		.replace( new RegExp( '(^|\\s)' + targetClass + '(\\s|$)' ), ' ' )
		.replace( /\s{2,}/g, ' ' ) //remove two (or more) consecutive spaces
		.replace( /^\s|\s$/, '' ); //trim leading/trainling spaces
}

/**
 * Unbind an event listener from a DOM node
 * @param {Object} el The DOM node observing the event
 * @param {String} type The type of event (e.g. 'click', 'keypress', 'mouseover', 'hover')
 * @param {Object} fn The function that will be called when the event is observed
 */
function removeListener( el, type, fn ) {
	if ( el.removeEventListener ) {
		el.removeEventListener( type, fn, false );
		return true;
	} else if ( el.detachEvent ) {
		return el.detachEvent( 'on'+type, fn );
	} else {
		el[ 'on'+type ] = null;
	}
}

/**
 * Stop an event from propagating to the parent node
 * @param {Object} evt The event object representing the user interaction to be stopped
 */
function stopEvent( evt ) {
	var evt = evt || window.event;
	if ( evt.stopPropagation ) {
		evt.stopPropagation();
	} else {
		evt.cancelBubble = true;
	}
}