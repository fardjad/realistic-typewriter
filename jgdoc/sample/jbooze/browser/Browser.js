/**
	Sample module file for jGrouseDoc tool.<br>
	If you are interested in jBooze library, see <a href="http://jbooze.com">jbooze.com</a>
	
*/
/**
	Contains classes encapsulating browser-specific functionality
	@module jbooze.browser.Browser
	@author Denis Riabtchik
	@since 0.1
*/
jbooze.module(
{
	name : 'jbooze.browser.Browser',
	body : function(embed)
	{
		eval(embed);
		
		/**
			Base class for all browsers
			@class {abstract} jbooze.browser.BaseBrowser
			@extends jbooze.BaseObject
			@author Denis Riabtchik
		*/
		jbooze.define('jbooze.browser.BaseBrowser', 'jbooze.BaseObject', function(salt)
		{
			eval(salt);
			
			return  {
			
				/**
					Test variable - just for inheritance demo
					@variable {private int} testVar
				*/
				
				/**
				 * Test property - just for demo
				 * @property {read write String} location
				 */
				
				/**
					@constructor ?
				*/
				initialize : function()
				{
					_super(this, 'initialize');
					this._eventNameMap = {'trueKeypress' : 'keypress'};
					
					this._cssMap = {'float' : 'cssFloat'};
					
				},
				/**
					Map generic event name into browser-specific event name.
					@function {string} ?
					@param {string} eventName - name of generic event name
					@returns {string} browser-specific event name 
				*/
				mapEventName : function(eventName)
				{
					var n = this._eventNameMap[eventName];
					return n? n : eventName;
				},
				
				/**
					Map css property name to browser-specific property name. 
					Used to map property names from CSS standard into names that could be used in scripts
					@function {string} mapCssProperty
					@param {string} property - name of generic css property
					@returns {string} name of mapped property
				*/
				mapCssProperty : function(property)
				{
					var v = this._cssMap[property];
					return v? v : property;
				},
				
				/**
					Add event listener to DOM element
					@function addListener
					@param {DOMElement} dom - element to which the listener should be attached
					@param {string} eventName - name of event being observed
					@param {function(event)} listener callback that should be called when event is triggered
					@param {boolean} doCapture indicates if it is necessary to use capture capabilities
				*/
				addListener : function(dom, eventName, listener, doCapture)
				{
					dom.addEventListener(this.mapEventName(eventName), listener, doCapture);
				},
				
				/**
					Remove event listener from DOM element
					@function removeListener
					@param {DOMElement} dom - element to which the listener was attached
					@param {string} eventName - name of event being observed
					@param {function(event)} listener callback that was used
					@param {boolean} doCapture indicates if it was necessary to use capture capabilities
					
				*/
				removeListener : function(dom, eventName, listener, doCapture)
				{
					dom.removeEventListener(this.mapEventName(eventName), listener, doCapture);
				},
				
				/**
					Get attribute of DOM node. 
					@function {string} getAttribute
					@param {DOMElement} domNode 
					@param {string} attrName
					@returns value of retrieved attribute
				*/
				getAttribute : function(domNode, attrName)
				{
					return domNode.getAttribute(attrName);
				},
				
				/**
					Get style computed on element's class, style and inherited styles.
					@function {string} getComputedStyle
					@param {DOMElement} element
					@param {string} styleName
					@returns value of retrieved computed style
				*/
				getComputedStyle : function(element, styleName)
				{
					return document.defaultView.getComputedStyle(element, styleName);
				},
				
				/**
					Remove all attributes from element.
					@function clearAttributes
					@param {DOMElement} element
				*/
				clearAttributes : function(element)
				{
					var attrs = element.attributes;
					var attrNames = [];
					for (var i = attrs.length - 1; i >= 0; i--)
					{
						attrNames.push(attrs.item(i).nodeName);
					}
					jbooze.forEach(attrNames, function(itemName)
					{
						attrs.removeNamedItem(itemName);
					});
				}
				
				/**
				 * Sample abstract method
				 * @function {abstract protected} overrideMe
				 */
			};
		});
		
		/**
			Support for Mozilla browsers
			@class jbooze.browser.Mozilla
			@extends BaseBrowser
		*/
		jbooze.define('jbooze.browser.Mozilla', 'jbooze.browser.BaseBrowser', function(salt)
		{
			eval (salt);
			
			
			return {
				/**
					@constructor initialize
				*/
				initialize : function()
				{
					_super(this, 'initialize');
					l_info('mozilla!');
				}
				
				/**
				 * @function {public} overrideMe
				 * @inheritdesc
				 */
				
			};
		});
		
		/**
			Support for MS Explorer
			@class jbooze.browser.Explorer
			@extends jbooze.browser.BaseBrowser
		*/
		jbooze.define('jbooze.browser.Explorer', 'jbooze.browser.BaseBrowser', function(salt)
		{
			eval(salt);
			
			return {
			
				/**
					@variable testVar
					@inheritdesc
				*/
			
				/**
					@constructor initialize
				*/
				initialize : function()
				{
					_super(this, 'initialize');
					this._cssMap['float'] = 'styleFloat';
				},
				
				/* *
					Explorer-specific implementation of addListener that based on attachEvent method.
					@function addListener
					@param {DOMElement} dom - element to which the listener should be attached
					@param {string} eventName - name of event being observed
					@param {function(event)} listener callback that should be called when event is triggered
					@param {boolean} doCapture not used here
					
				*/
				/**
					@function addListener
					@inheritdesc
				*/
				addListener : function(dom, eventName, listener, doCapture)
				{
					var name = this.mapEventName(eventName);
					dom.attachEvent('on' + name, listener);
				},
				
				/**
					Explorer-specific implementation of removeListener that relies on detachEvent method.
					@function removeListener
					@param {DOMElement} dom - element to which the listener was attached
					@param {string} eventName - name of event being observed
					@param {function(event)} listener callback that was used
					@param {boolean} doCapture indicates if it was necessary to use capture capabilities
				*/
				removeListener : function(dom, eventName, listener, doCapture)
				{
					var name = this.mapEventName(eventName);
					dom.detachEvent('on' + name, listener);
				},
				

				/**
					Explorer-specific implementation of getAttribute.
					@function getAttribute
					@param {DOMElement} domNode 
					@param {string} attrName
					
				*/				
				getAttribute : function(domNode, attrName)
				{
					return domNode.getAttribute(attrName, 2); // returns value exactly as it was set in script or source doc
				},

				/**
					Explorer-specific implementaion of getComputedStyle
					@function getComputedStyle
					@param {DOMElement} element
					@param {string} styleName
				*/				
				getComputedStyle : function(element, styleName)
				{
					return element.currentStyle[styleName];
				},

				/**
					Remove all attributes from element.
					@function clearAttributes
					@param {DOMElement} element
				*/				
				clearAttributes : function(element)
				{
					element.clearAttributes();
				}
			}
		});
		
		/**
			Support for KHTML browser
			@class jbooze.browser.KHTML
			@extends jbooze.browser.BaseBrowser
		*/		
		jbooze.define('jbooze.browser.KHTML', 'jbooze.browser.BaseBrowser', function(salt)
		{
			eval(salt);
			
			return {
				/**
					@constructor initialize
				*/
				initialize : function()
				{
					_super(this, 'initialize');
					this._eventNameMap['keypress'] = 'keydown';
				}
				
			}
		});
		
		/**
			Support for Opera browser
			@class jbooze.browser.Opera
			@extends jbooze.browser.BaseBrowser
		*/
		jbooze.define('jbooze.browser.Opera', 'jbooze.browser.BaseBrowser', function(salt)
		{
			eval(salt);
			return {
				/**
					@constructor initialize
				*/
				initialize : function()
				{
					_super(this, 'initialize');
				},

				/**
					Opera-specific implementation of addListener (based on MS style)
					@function ?
					@param {DOMElement} dom - element to which the listener should be attached
					@param {string} eventName - name of event being observed
					@param {function(event)} listener callback that should be called when event is triggered
					@param {boolean} doCapture indicates if it is necessary to use capture capabilities
					
				*/
				addListener : function(dom, eventName, listener, doCapture)
				{
					var name = this.mapEventName(eventName);
					dom.attachEvent('on' + name, listener);
				},

				/**
					Opera-specific implementation of removeListener (based on MS style)
					@function ?
					@param {DOMElement} dom - element to which the listener was attached
					@param {string} eventName - name of event being observed
					@param {function(event)} listener callback that was used
					@param {boolean} doCapture indicates if it was necessary to use capture capabilities
					
				*/
				
				removeListener : function(dom, eventName, listener, doCapture)
				{
					var name = this.mapEventName(eventName);
					dom.detachEvent('on' + name, listener);
				}				
			}
		});		
	},
	
	postInit : function(embed)
	{
		eval(embed);
		
		
		function getBrowserClass()
		{
			var userAgent = navigator.userAgent;
			var appName = navigator.appName;
			if (appName.indexOf('Microsoft') >= 0 && userAgent.indexOf('MSIE') >= 0)
			{
				return 'jbooze.browser.Explorer';
			}
			if (userAgent.match(/Konqueror|Safari|KHTML/))
			{
				return 'jbooze.browser.KHTML';
			}
			if (userAgent.indexOf('Gecko') >= 0)
			{
				return 'jbooze.browser.Mozilla';
			}
			if (userAgent.indexOf('Opera') >= 0)
			{
				return 'jbooze.browser.Opera'
			}
			return 'jbooze.browser.BaseBrowser';
		}

		var bn = getBrowserClass();
		var bc = jbooze.resolveName(bn);
		jbooze.browser.instance = new bc();

		
	}
});
