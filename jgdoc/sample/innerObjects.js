/** @struct MyStruct */
/** @interface MyInterface */
/** @class MyClass */

/** @struct MyStruct.innerStruct */
/** @interface MyStruct.innerInterface */
/** @class MyStruct.innerClass */

/** @struct MyInterface.innerStruct */
/** @interface MyInterface.innerInterface */
/** @class MyInterface.innerClass */

/** @struct MyClass.innerStruct */
/** @interface MyClass.innerInterface */
/** @class MyClass.innerClass */

/** @class com.foo.bar.Class2.InnerClass */

/** @class com.foo.bar.Class1 */

/** @class com.foo.bar.Class2 */

/** @object com.foo.bla.Object1 */
/** @variable {int} sampleVar */
/** @event myEvent
 * @param {int} hitCount
 * @param {string} propertyName 
 */

 /**
 * @object MyObject
 */
 
 
 /***
  handing of SIMPLE_EVENT. Sample link for {@link listenerCallbackComplex  this link} - yep, indeed.
  @ifunction {listenerCallbackComplex} listenerCallbackSimple
  @param firstParam describes something
  @... {public int} paramOne - for test 1
  @... {optional MyObject} paramTwo - for test2
  @... {private optional Date} paramThree = {banzai} - for Test3
  @param {String} secondParam yet something else
  @return complex structure
  @... {function()} handler function
  @... {Event} event - value that is being handled
*/

/**
  handing of COMPLEX_EVENT
  @ifunction {Boolean} listenerCallbackComplex
  @param {MyObject} obj
*/

/**
  @ifunction {String} formatter
  @param {Date} date
*/



var MyObject = {
  SIMPLE_EVENT: 1,
  COMPLEX_EVENT: 2,

  /**
    @event {Boolean} onReady
    @param {Window} window
  */
  onReady: null,

  /**
    @function addListener
    @paramSet for simple case
    @param {Number} event
    @param {listenerCallbackSimple} callback
    @paramSet for complex case
    @param {Number} event
    @param {listenerCallbackComplex} callback
  */
  addListener: function(event, callback) {},

  /**
   * @function {formatter} createDateFormatter
   * @param {String} formatString
   */
  createDateFormatter: function(formatString) {}

} 