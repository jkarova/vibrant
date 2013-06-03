
var SelectMgr = (function () {
	var textProp = null;
	var currentSelect = null; //a reference to the most recently used select control
	var elements;

	//reusable document observers (usually attached when a list is open)
	var docObserver = {
		click: function (evt) {
			currentSelect.closeList(false);
		},
		keypress: function (evt) {
			currentSelect._observeKeys(evt);
		}
	};

	/**
	 * The SelectBox object created for each initialized custom select control
	 */
	function SelectBox(myselect, selectedVal) {
		this.select = myselect;

		this.fields = {}; //common storage for <input> fields
		this.list = null;
		this.options = [];
		this.options.current = null;
		this.options.highlight = null;
		this.options.findIndexByProperty = function (prop, value) {
			var l = this.length;
			while (l--) {
				if (this[l][prop] == value)
					return l;
			}
			return -1;
		};
		textProp = document.body.innerText && 'innerText' || 'textContent';
		this._setup(selectedVal);
	}

	SelectBox.prototype = {
		/**
		 * Close the list (after a selection is made or the user clicks somewhere else on the document)
		 * @param {Boolean} focus A flag indicating whether the input should be focused upon closing the menu
		 */
		closeList: function (focusInput) {
			removeClass(this.select, 'show-list');
			removeListener(this.list, 'mouseover', this._hoverList);
			removeListener(document, 'click', docObserver.click);
			removeListener(document, 'keypress', docObserver.keypress);

			if (focusInput) {
				this.fields.text.focus();
			}

			if (this.options.length) {
				this._makeSelected(this.options.current);
			}
		},

		/**
		 * Set the list option under the mouse as the highlighted option
		 * @param {Object} evt The event object representing the user interaction with the list
		 */
		_hoverList: function (evt) {
			var evt = evt || window.event;
			var target = evt.srcElement || evt.target;
			removeClass(this.options.highlight, 'selected');
			addClass(target, 'selected');
			this.options.highlight = target;
		},

		/**
		 * Make a list option selected and write to the field
		 * @param {Number|String} idx An index (or string matching the value) of the newly selected option
		 * @returns {Object} The DOM node that is the new selected option
		 */
		_makeSelected: function (idx) {
			var node = null;

			if (typeof idx == "string") {
				idx = this.options.findIndexByProperty("data-value", idx);
				if (idx < 0) return;
			}

			//find all .selected elements
			var selected = getElementsByClass(this.list, 'selected', 'li');

			for (var i = 0, len = selected.length; i < len; i++) {
				removeClass(selected[i], 'selected');
			}

			var liTags = this.list.getElementsByTagName('LI');

			if (liTags.length && liTags[idx]) {
				addClass(liTags[idx], 'selected');
				node = liTags[idx];
				this._scrollToView(liTags[idx]);
			}

			this._writeInputs(idx);

			return node;
		},

		/**
		 * Find the value in the list - based on the key pressed by the user - and make it selected
		 * @param {String} letter The letter pressed by the user
		 */
		_getNextLetterOption: function (letter) {
			var opts = this.options;
			var l = opts.length;
			var end = this.options.current || 0;
			var i = (end + 1) % l;
			letter = letter.toUpperCase();
			while (i != end) {
				if (opts[i].text.charAt(0).toUpperCase() == letter) {
					this._makeSelected(i);
					break;
				}
				i = (++i % l);
			}
		},

		/**
		 * Handle user clicks on the select box, its children nodes, and the option list
		 * @param {Object} evt The event object representing the user interaction with the list
		 */
		_observeClick: function (evt) {
			var target = getEventTarget(evt);
			switch (target.nodeName) {
				case 'UL':
				case 'LI':
					this._observeListClick(evt);
					break;
				default: //INPUT, SPAN, DIV
					if (hasClass(this.select, 'show-list')) {
						this.closeList(true);
					} else {
						this._openList(evt);
					}
					stopEvent(evt);
			} //switch
		},

		/**
		 * Handle user keyboard interaction - direction arrows, escape, return, alpha keys - for the select
		 * @param {Object} evt The event object representing the user interaction with the list
		 */
		_observeKeys: function (evt) {
			evt = evt || window.event;

			var keyCode = evt.charCode || evt.keyCode

			switch (keyCode) {
				case 13: //return (submit)
					if (evt.preventDefault) evt.preventDefault();
					this._writeInputs(this.options.current);
					this.closeList(true);
					break;
				case 27: //esc
					this.closeList(true);
					break;
				case 37: //up arrow and left arrow
				case 38:
					if (this.options.highlight.listIndex > 0) {
						//if the listIndex is positive, select the previous option in the list
						this.options.highlight = this._makeSelected(this.options.highlight.listIndex - 1);
					}
					break;
				case 39: //right arrow and down arrow
				case 40:
					if (this.options.highlight.listIndex + 1 < this.options.length) {
						//if the next listIndex is smaller than the number of available
						//options, select the next option in the list
						this.options.highlight = this._makeSelected(this.options.highlight.listIndex + 1);
					}
					break;
				default:
					this._getNextLetterOption(String.fromCharCode(keyCode));
			} //switch
			stopEvent(evt);
		},

		/*
		 * Handle user clicks on list options by making the option selected and closing the list
		 * @param {Object} evt The event object representing the user interaction with the list
		 */
		_observeListClick: function (evt) {
			evt = evt || window.event;
			var t = evt.target || evt.srcElement;
			this.options.current = t.listIndex;
			this._makeSelected(this.options.current);
			this.closeList(false);
		},

		/**
		 * Open the list of options
		 * @param {Object} evt The event object representing the user interaction with the select box
		 */
		_openList: function (evt) {
			var select = this;

			if (select != currentSelect) {
				currentSelect && currentSelect.closeList();
				currentSelect = select;
			}

			//set the selected option and assign it as the highlight node
			this.options.highlight = this._makeSelected(this.options.current);

			addClass(this.select, 'show-list');
			this._scrollToView(this.options.highlight);


			addListener(this.list, 'mouseover', function (evt) {select._hoverList(evt);});
			addListener(document, 'click', docObserver.click);
			addListener(document, 'keypress', docObserver.keypress);
			stopEvent(evt);
		},

		/**
		 * Scroll the currently selected list option into view
		 * @param {Object} option The list option that will be scrolled into view
		 */
		_scrollToView: function (option) {
			var list = this.list;
			var needTop = option.offsetTop
			var needBottom = needTop + option.scrollHeight;
			var viewTop = list.scrollTop;
			var viewBottom = viewTop + list.offsetHeight;

			if (viewTop < needTop && needBottom < viewBottom)
				return;

			if (needTop < viewTop) {
				var scrollAmount = needTop;
			} else if (needBottom > viewBottom) {
				var scrollAmount = needBottom - list.offsetHeight;
			}

			list.scrollTop = scrollAmount;
		},

		/**
		 * Initialize the select box
		 * @param {String} selectedVal The initial selected value of the select box
		 */
		_setup: function (selectedVal) {
			var inputs = this.select.getElementsByTagName('INPUT');

			//assign each input to this.fields[ type ] based on the type attr
			for (var i = 0, len = inputs.length; i < len; i++) {
				this.fields[inputs[i].type] = inputs[i];
			}

			var select = this.select.getElementsByTagName('SELECT');
			this.fields["select"] = select[0];

			//get UL (list of options)
			var ul = this.select.getElementsByTagName('UL');
			var option, value, text;

			if (ul && ul[0]) {
				this.list = ul[0];

				var liTags = this.list.getElementsByTagName('li');
				this.options.current = 0;

				for (var j = 0; option = liTags[j]; ) {
					text = option[textProp].replace(/(^[\n ]+|[\n ]+$)/g, '');
					option[textProp] = text;
					option.listIndex = j;
					value = option.getAttribute('data-value');
					if (hasClass(option, "selected") || (selectedVal && value == selectedVal))
						this.options.current = j;

					this.options[j++] = { value: value, text: text };
				}
			}

			if (this.options.length)
				this.options.highlight = this._makeSelected(this.options.current);

			var selectBox = this;


			addListener(this.select, 'click', function (evt) {
				selectBox._observeClick(evt);
			});
			addListener(this.fields.text, 'keypress', function (evt) {
				selectBox._observeKeys(evt);
			});
		},

		/**
		 * Write the value for the select in both <input> fields
		 * @param {Number} idx The index of the list option that will be written to the <input> fields
		 */
		_writeInputs: function (idx) {
			if (typeof idx == 'number') {
				this.options.current = idx;
				this.fields.text.value = this.options[idx].text;

				if (this.fields.hidden) {
					this.fields.hidden.value = this.options[idx].value;
				}
				if (this.fields.select && this.fields.select.options) {
					//set the selected option by value
					for (var x = 0; x < this.fields.select.options.length; x++) {
						if (this.options[idx].value == this.fields.select.options[x].value) {
							this.fields.select.selectedIndex = x;
							//console.log(this.fields.select.options[this.fields.select.selectedIndex].text);

							//trigger change event handlers
							if ($) {
								$(this.fields.select).change();
							}

							break;
						}
					}
				}
			}
		}
	};

	/**
	 * The public interface for SelectManager
	 */
	return {
		/**
		 * Get a reference to an initialized select control based on an ID
		 * @param {String} selectID The id of the custom select control (usually the id attr of the DOM node)
		 */
		get: function (selectID) {
			return this._elements[selectID] || null;
		},

		/**
		 * Initialize a specific select control
		 * @param {String|Object} select A string (matching the id attr) or a reference to a DOM node
		 * @param {String} selectedVal The value of the option that is initially selected for the select control
		 */
		setup: function (select, selectedVal) {
			if (typeof select == 'string') select = document.getElementById(select);
			this._elements = this._elements || {};

			if (typeof this._elements[select.id] != 'object') {
				this._elements[select.id] = new SelectBox(select, selectedVal);
			}
			return this._elements[select.id];
		}
	};
})();
