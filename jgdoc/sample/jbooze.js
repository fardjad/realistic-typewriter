/*
$Id: jbooze.js 581 2011-03-15 12:02:26Z denis.riabtchik $
*/

/**
	Example for jBoozeDoc tool. <br>
	If you are interested in jBooze library, see <a href="http://jbooze.com">jbooze.com</a>
	@file jbooze.js
	@author den
	@version
*/

/**
Adds two numbers together. <b>Sample only.</b>
Could be used as mixin to {@link com.foo.SomeClass SomeClass}
@function {public static int} add
@param {int} first - first number
@param {optional int} second - second number
@returns sum of two numbers
@author den
@since 0.9
@version 1.3
@throws InvalidArgumentException when sum of two numbers greater than 100
*/
function add(first, second)
{
	return first + second
}

/**/ /* this is a test */

/**
* Root object of the namespace
* @namespace jbooze
*/
jbooze = 
{
	/**
		default name of startup file. comment for this member is an example of usage of var alias
		@variable {string} _startupFile
	*/
	_startupFile : 'jbooze.js',
	/**
		array of functions that should be called on app shutdown
		@variable {function()[]} _closeHooks
	*/
	_closeHooks : []
};



/**
*	Structure containing jBooze configuration.
	@struct jbooze_config
*/
if (typeof jbooze_config == 'undefined')
{
	jbooze_config = {};
}
/**Inital log level @variable logLevel*/
/**Suppress logging in classes @variable nologs*/ 
/**Enable debugging for dynamically loaded modules @variable debug*/


/**@scope jbooze*/

/**
* Contains reference to global namespace	
  @variable {object} _global
*/
jbooze._global = this;

/**
* Special exception that is used to break iterators
* @variable {public static string} $break
*/
jbooze.$break = "break exception";


/**
* Base class for jbooze exceptions
* @class jbooze.Exception
*/
/**
* @constructor Exception
* @param {string} messageCode - string representing the error
* @param {array} params associated with the error, optional
*/
jbooze.Exception = function(messageCode, params)
{
	this._messageCode = messageCode;
	this._params = params;
}

jbooze.Exception.prototype = 
{
	/**
	* @function toString
	* @returns string representation of exception
	*/
	toString : function()
	{
		return this._messageCode;
	}
}

/**
 * Runtime exception thrown when function or method has been passed an illegal or inapropriate argument
 * @class jbooze.InvalidArgumentException
 */

/**@scope jbooze*/
/**
* Used to indicate that method is not implemented/abstract by throwing {@link jbooze.Exception Exception}
* @function notImplemented
* @param {string} methodName name of the method that is not implemented
*/
jbooze.notImplemented = function(methodName)
{
	throw new jbooze.Exception('notImplemented ' + methodName);
}

/**
	Adds a shutdown hook - a function that should be called at app shutdown
	@function addUnloadHook
	@param {function()} func - hook that should be called at shutdown
*/
jbooze.addUnloadHook = function(func)
{
	jbooze._closeHooks.push(func);
}

/**
	Converts argument to array, if possible. If data is array, then copy of data is returned. 
	If data has method toArray then the result of that method is returned. If data has property length, then it is assumed
	that it is possible to iterate over elements of data as if over array. If neither of these conditions are met, then 
	empty array is returned.
	@function {array} toArray
	@param {object} data - object that should be converted to array
	@returns result of conversion to array
*/
jbooze.toArray = function(data)
{
	if (data instanceof Array)
	{
		return data.concat([]);
	}
	if (data.toArray)
	{
		return data.toArray();
	}
	if (data.length)
	{
		var res = [];
		for (var i = 0; i < data.length; i++)
		{
			res.push(data[i]);
		}		
		return res;
	}
	return [];
}

/**
	Searches for item in array. Return index of found item 
	@function {int} ? 
	@param {array} arr - array containing data
	@param {object} item - item that is being searched for
	@param {function (item, arrayItem)} comparator (optional) - if specified, then 
		returns -1 when item &lt; arrayItem; 
		returns 0 if item == arrayItem;
		returns 1 otherwise
	@returns the index where item was found or -1 otherwise
*/

jbooze.search = function(arr, item, comparator)
{
	// unwind the loop for performance
	if (comparator)
	{
		for (var i = arr.length - 1; i >= 0; i--)
		{
			if (comparator(item, arr[i]) === true)
			{
				return i;
			}
		}
	}
	else
	{
		for (var i = arr.length - 1; i >= 0; i--)
		{
			if (arr[i] == item)
			{
				return i;
			}
		}
	}
	return -1;
}

/**
 * callback for iterators
 * @ifunction iteratorCallback
 * @paramset Syntax 1 - iterating over arrays or collections
 * @param item - current item in array/collection/etc
 * @param {int} index - index of item in array/collection/etc
 * @paramset Syntax 2 - iterating over maps
 * @param key - value in the map
 * @param value - key of the value 
 */


/**
	Execute a function for each element of array or member of structure
	@function forEach
	@paramset Syntax 1 - array based (iteration over array elements)
	@param {array} arr - array to be iterated
	@param {iteratorCallback} func - function to be called for each array element. 
	@param {boolean} backwards - if iteration should start from the end of the array. 
		This is optional parameter, default value is "false". Iteration from the end of the array could be 
		useful when iterator function removes elements from the array
	@paramset Syntax 2 - object based (iteration over object properties)
	@param {object} obj - source object
	@param {iteratorCallback} func - function to be called for each object property.
	@see $break
	@since 0.1
	@version 
*/
jbooze.forEach = function(arr, func, backwards)
{
	try
	{
		if (typeof arr == 'array')
		{
			if (backwards)
			{
				for (var i = arr.length - 1; i >= 0; i--)
				{
					func(arr[i], i);
				}
			}
			else
			{
				for (var i = 0; i < arr.length; i++)
				{
					func(arr[i], i);
				}
			}
		}
		else if (typeof arr == 'object')
		{
			var dummy = {};
			for (var i in arr)
			{
				if (arr[i] != dummy[i])
				{
					func(arr[i], i);
				}
			}
		}
	}
	catch (ex)
	{
		if (ex != jbooze.$break)
		{
			throw ex;
		}
	}
}

/**
	Checks if the structure is empty, i.e. does not have any members 
	@function isEmpty
	@param {object} obj structure
	@returns true if structure has at least one member
*/
jbooze.isEmpty = function(obj)
{
	var dummy = {};
	for (var i in obj)
	{
		if (obj[i] != dummy[i])
		{
			return false;
		}
	}
	return true;
}

