/**
 * Test-cases for the Viewport Compliance Test.
 *
 * @file testcases.js
 * @author Rune Lillesveen <rune@opera.com>
 * @author Oyvind Stenhaug <oyvinds@opera.com>
 */

/**
 *
 * The test fields:
 *
 * "opera-only": Set to true if the test only should be run in Opera.
 *
 * "server-only": Set to true if the test needs to be run from a server.
 *
 * "url": The url to the test document to use.
 *        This document should either have a #test-container element for measuring viewport dimensions (see e.g. test-docs/viewport-test.html),
 *        in which case the test result will be determined by the given expected computed values for 'width'/'height' etc,
 *        or a #last-x element for determining text wrap behavior (see e.g. test-docs/text-wrap-test.html),
 *        in which case the test result will be determined by the given expected value of "text-wrap-enabled".
 *
 * "meta-content": The content attribute of the viewport meta tag to test.
 *
 * "css-rules": The declarations of the @viewport rule to test.
 *              The at-rule will be put in a style element. If a meta tag is also written, the meta tag comes first.
 *
 * "min-width": A function returning the expected computed value of the min-width property, assuming no UA style sheet.
 *          This should return a number which is a length in pixels,
 *          undefined which means not specified, or null which means explicitly
 *          set to "auto".
 *          This can be a function, and will then be called with a ViewportDeviceObject parameter. That object
 *          can be used to resolve relative/absolute lengths, percentages and keywords
 *          to pixel lengths. See framework.js for available methods.
 *
 * "max-width": A function returning the expected computed value of the max-width property, assuming no UA style sheet.
 *          This should return a number which is a length in pixels,
 *          undefined which means not specified, or null which means explicitly
 *          set to "auto".
 *          This can be a function, and will then be called with a ViewportDeviceObject parameter. That object
 *          can be used to resolve relative/absolute lengths, percentages and keywords
 *          to pixel lengths. See framework.js for available methods.
 *
 * "min-height": A function returning the expected computed value of the min-height property, assuming no UA style sheet.
 *           This should return a number which is a length in pixels,
 *           undefined which means not specified, or null which means explicitly
 *           set to "auto".
 *           This can be a function, and will then be called with a ViewportDeviceObject parameter. That object
 *           can be used to resolve relative/absolute lengths, percentages and keywords
 *           to pixel lengths. See framework.js for available methods.
 *
 * "max-height": A function returning the expected computed value of the max-height property, assuming no UA style sheet.
 *           This should return a number which is a length in pixels,
 *           undefined which means not specified, or null which means explicitly
 *           set to "auto".
 *           This can be a function, and will then be called with a ViewportDeviceObject parameter. That object
 *           can be used to resolve relative/absolute lengths, percentages and keywords
 *           to pixel lengths. See framework.js for available methods.
 *
 * "zoom": The expected computed value of the zoom property, assuming no UA style sheet.
 *               This property should either be a number which is the scale factor,
 *               undefined which means not specified, or null which means 
 *               explicitly set to "auto". (E.g.: Represent 100% as 1.)
 *
 * "min-zoom": The expected computed value of min-zoom, assuming no UA style sheet.
 *              A value of undefined means not specified and null means explicitly set to "auto".
 *              This can be a function, and will then be called with a ViewportDeviceObject parameter.
 *              That object has information on e.g. default UA zoom values.
 *              See framework.js for available methods.
 *
 * "max-zoom": The expected computed value of max-zoom, assuming no UA style sheet.
 *              A value of undefined means not specified and null means explicitly set to "auto".
 *
 * "mimetype": The mimetype to be checked.
 *             This value is not used in the actual test. It's just an annotation.
 *             The actual mimetype for the test is set in the .htaccess file.
 *
 * "text-wrap-enabled": Expected enabled/disable status of ERA TextWrap.
 *                      true if enabled is expected, otherwise false.
 *
 * "description": A textual description of the test.
 *
 */

var viewportTests = [

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Viewport Meta with \"width=device-width\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "height=device-height",
      "min-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "max-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "description" : "Viewport Meta with \"height=device-height\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "initial-scale=1.0",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 1,
      "description" : "Viewport META with \"initial-scale=1.0\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "initial-scale=2.0",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 2,
      "description" : "Viewport META with \"initial-scale=2.0\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "initial-scale=0.5",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 0.5,
      "description" : "Viewport META with \"initial-scale=0.5\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "initial-scale=1.6",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 1.6,
      "description" : "Viewport META with \"initial-scale=1.6\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=0",
      "max-zoom" : 0.1,
      "description" : "Viewport META with \"maximum-scale=0\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=0, initial-scale=0.5",
      "min-width" : null,
      "max-width" : null,
      "max-zoom" : 0.1,
      "zoom" : 0.5,
      "description" : "Viewport META with \"maximum-scale=0, initial-scale=0.5\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=0, initial-scale=3",
      "min-width" : null,
      "max-width" : null,
      "max-zoom" : 0.1,
      "zoom" : 3,
      "description" : "Viewport META with \"maximum-scale=0, initial-scale=3\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=0, initial-scale=10",
      "min-width" : null,
      "max-width" : null,
      "max-zoom" : 0.1,
      "zoom" : 10,
      "description" : "Viewport META with \"maximum-scale=0, initial-scale=10\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=0.5",
      "max-zoom" : 0.5,
      "description" : "Viewport META with \"maximum-scale=0.5\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=0.5, initial-scale=4",
      "min-width" : null,
      "max-width" : null,
      "max-zoom" : 0.5,
      "zoom" : 4,
      "description" : "Viewport META with \"maximum-scale=0.5, initial-scale=4\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=0.5, initial-scale=0.2",
      "min-width" : null,
      "max-width" : null,
      "max-zoom" : 0.5,
      "zoom" : 0.2,
      "description" : "Viewport META with \"maximum-scale=0.5, initial-scale=0.2\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=1, initial-scale=2",
      "min-width" : null,
      "max-width" : null,
      "max-zoom" : 1,
      "zoom" : 2,
      "description" : "Viewport META with \"maximum-scale=1, initial-scale=2\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "minimum-scale=1",
      "min-zoom" : function(deviceObject) { return Math.min(deviceObject.getDefaultMaxZoom(), 1); },
      "description" : "Viewport META with \"minimum-scale=1\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "minimum-scale=8",
      "min-zoom" : function(deviceObject) { return Math.min(deviceObject.getDefaultMaxZoom(), 8); },
      "description" : "Viewport META with \"minimum-scale=8\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "minimum-scale=10",
      "min-zoom" : function(deviceObject) { return Math.min(deviceObject.getDefaultMaxZoom(), 10); },
      "description" : "Viewport META with \"minimum-scale=10\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "minimum-scale=8, initial-scale=6",
      "min-width" : null,
      "max-width" : null,
      "min-zoom" : function(deviceObject) { return Math.min(deviceObject.getDefaultMaxZoom(), 8); },
      "zoom" : 6,
      "description" : "Viewport META with \"minimum-scale=8, initial-scale=6\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "initial-scale=1, minimum-scale=2",
      "min-width" : null,
      "max-width" : null,
      "min-zoom" : function(deviceObject) { return Math.min(deviceObject.getDefaultMaxZoom(), 2); },
      "zoom" : 1,
      "description" : "Viewport META with \"initial-scale=1, minimum-scale=2\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "minimum-scale=10, maximum-scale=0.1",
      "min-zoom" : 10,
      "max-zoom" : 0.1,
      "description" : "Viewport META with \"minimum-scale=10, maximum-scale=0.1\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=0.1, minimum-scale=10",
      "min-zoom" : 10,
      "max-zoom" : 0.1,
      "description" : "Viewport META with \"maximum-scale=0.1, minimum-scale=10\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "minimum-scale=10, maximum-scale=1",
      "min-zoom" : 10,
      "max-zoom" : 1,
      "description" : "Viewport META with \"minimum-scale=10, maximum-scale=1\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "minimum-scale=3, maximum-scale=2",
      "min-zoom" : 3,
      "max-zoom" : 2,
      "description" : "Viewport META with \"minimum-scale=3, maximum-scale=2\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=3, minimum-scale=4",
      "min-zoom" : 4,
      "max-zoom" : 3,
      "description" : "Viewport META with \"maximum-scale=3, minimum-scale=4\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=10, minimum-scale=10",
      "min-zoom" : 10,
      "max-zoom" : 10,
      "description" : "Viewport META with \"maximum-scale=10, minimum-scale=10\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "minimum-scale=8, maximum-scale=9",
      "min-zoom" : 8,
      "max-zoom" : 9,
      "description" : "Viewport META with \"minimum-scale=8, maximum-scale=9\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "",
      "description" : "Viewport META with empty content (\"\")." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-height",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "description" : "Viewport META with \"width=device-height\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=700",
      "min-width" : 700,
      "max-width" : 700,
      "description" : "Viewport META with \"width=700\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=200",
      "min-width" : 200,
      "max-width" : 200,
      "description" : "Viewport META with \"width=200\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "height=700",
      "min-height" : 700,
      "max-height" : 700,
      "description" : "Viewport META with \"height=700\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "height=200",
      "min-height" : 200,
      "max-height" : 200,
      "description" : "Viewport META with \"height=200\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, initial-scale=2",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "zoom" : 2,
      "description" : "Viewport META with \"width=device-width, initial-scale=2\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, initial-scale=0.5",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "zoom" : 0.5,
      "description" : "Viewport META with \"width=device-width, initial-scale=0.5\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=480, initial-scale=0.1",
      "min-width" : 480,
      "max-width" : 480,
      "zoom" : 0.1,
      "description" : "Viewport META with \"width=480, initial-scale=0.1\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "height=700, initial-scale=1.6",
      "min-width" : null,
      "max-width" : null,
      "min-height" : 700,
      "max-height" : 700,
      "zoom" : 1.6,
      "description" : "Viewport META with \"height=700, initial-scale=1.6\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "height=device-height, initial-scale=1",
      "min-width" : null,
      "max-width" : null,
      "min-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "max-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "zoom" : 1,
      "description" : "Viewport META with \"height=device-height, initial-scale=1\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "height=200, initial-scale=0.5",
      "min-width" : null,
      "max-width" : null,
      "min-height" : 200,
      "max-height" : 200,
      "zoom" : 0.5,
      "description" : "Viewport META with \"height=200, initial-scale=0.5\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=200, height=700",
      "min-width" : 200,
      "max-width" : 200,
      "min-height" : 700,
      "max-height" : 700,
      "description" : "Viewport META with \"width=200, height=700\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=700, height=device-height",
      "min-width" : 700,
      "max-width" : 700,
      "min-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "max-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "description" : "Viewport META with \"width=700, height=device-height\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=1000, height=device-height, initial-scale=0.5",
      "min-width" : 1000,
      "max-width" : 1000,
      "min-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "max-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "zoom" : 0.5,
      "description" : "Viewport META with \"width=1000, height=device-height, initial-scale=0.5\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, height=1000, initial-scale=2",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "min-height" : 1000,
      "max-height" : 1000,
      "zoom" : 2,
      "description" : "Viewport META with \"width=device-width, height=1000, initial-scale=2\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=0",
      "min-width" : 1,
      "max-width" : 1,
      "description" : "Viewport META with \"width=0\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=15000, height=20000",
      "min-width" : 10000,
      "max-width" : 10000,
      "min-height" : 10000,
      "max-height" : 10000,
      "description" : "Viewport META with \"width=15000, height=20000\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "minimum-scale=0, maximum-scale=0",
      "min-zoom" : 0.1,
      "max-zoom" : 0.1,
      "description" : "Viewport META with \"minimum-scale=0, maximum-scale=0\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "minimum-scale=11, maximum-scale=13, initial-scale=12",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 10,
      "min-zoom" : 10,
      "max-zoom" : 10,
      "description" : "Viewport META with \"minimum-scale=11, maximum-scale=13, initial-scale=12\"." },

    /*
     *
     * Tests for extending width and height to fill viewport at given initial-scale below
     *
     */

    { "url" : "viewport-test.html",
      "meta-content" : "width=10, height=3000, initial-scale=1.0",
      "min-width" : 10,
      "max-width" : 10,
      "min-height" : 3000,
      "max-height" : 3000,
      "zoom" : 1,
      "description" : "Check that width is increased to fill the visual viewport." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=3000, height=10, initial-scale=1.0",
      "min-width" : 3000,
      "max-width" : 3000,
      "min-height" : 10,
      "max-height" : 10,
      "zoom" : 1,
      "description" : "Check that height is increased to fill the visual viewport." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=10, height=10, initial-scale=1.0",
      "min-width" : 10,
      "max-width" : 10,
      "min-height" : 10,
      "max-height" : 10,
      "zoom" : 1,
      "description" : "Check that both width and height are increased to fill the visual viewport." },

    /*
     *
     * Tests for Viewport META property parsing below
     *
     */

    { "url" : "viewport-test.html",
      "meta-content" : "width=-100",
      "description" : "Check that negative width is translated to auto." },

    { "url" : "viewport-test.html",
      "meta-content" : "height=-1.5",
      "description" : "Check that negative height is translated to auto." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=garbage",
      "min-width" : 1,
      "max-width" : 1,
      "description" : "Check that unrecognized keyword translate to 0 for width." },

    { "url" : "viewport-test.html",
      "meta-content" : "height=y20",
      "min-height" : 1,
      "max-height" : 1,
      "description" : "Check that unrecognized keyword translate to 0 for height." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width;",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Check that ';' is not included in keyword" },

    { "url" : "viewport-test.html",
      "meta-content" : "width=yes, height=no",
      "min-width" : 1,
      "max-width" : 1,
      "min-height" : 1,
      "max-height" : 1,
      "description" : "Check that 'yes' and 'no' translate to 0 for width/height." },

    { "url" : "viewport-test.html",
      "meta-content" : "initial-scale=-1",
      "description" : "Check that negative initial-scale is auto." },

    { "url" : "viewport-test.html",
      "meta-content" : "initial-scale=yes",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 1,
      "description" : "Check that initial-scale=yes is 1.0." },

    { "url" : "viewport-test.html",
      "meta-content" : "minimum-scale=no, initial-scale=0",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 0.1,
      "min-zoom" : 0.1,
      "description" : "Check that minimum-scale=no is 0." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=yes, initial-scale=2",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 2,
      "max-zoom" : 1,
      "description" : "Check that maximum-scale=yes is 1." },

    { "url" : "viewport-test.html",
      "meta-content" : "maximum-scale=device-height, initial-scale=10",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 10,
      "max-zoom" : 10,
      "description" : "Check that maximum-scale=device-height is 10." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100 initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Check that space is a valid separator." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100,initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Check that comma is a valid separator." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100 ,initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Check that comma is a valid separator (space before)." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100, initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Check that comma is a valid separator (space after)." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100;initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Check that semi-colon is a valid separator (no spaces)." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100 ;initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Check that semi-colon is a valid separator (space before)." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100; initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Check that semi-colon is a valid separator (space after)." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100x initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Check that alpha character after number is ignored and space acts as a valid separator." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100 xinitial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "description" : "Check that xinitial-scale property is dropped after space." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100 x initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "description" : "Check that property name without a value does not cause synchronization on following space." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100 x,initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Check that a comma forces synchronization after property name with no value." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100 x;initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Check that a property name without a value synchronize on following semi-colon (no space)." },


    { "url" : "viewport-test.html",
      "meta-content" : "width=100 x; initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Check that a property name without a value synchronize on following semi-colon (space after)." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100 x;  initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Check that a property name without a value synchronize on following semi-colon (multiple spaces after)." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=10 x; maximum-scale=10 initial-scale=10",
      "min-width" : 10,
      "max-width" : 10,
      "zoom" : 10,
      "max-zoom" : 10,
      "description" : "Semicolon is a valid separator." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=10 maximum-scale=10 initial-scale=10",
      "min-width" : 10,
      "max-width" : 10,
      "zoom" : 10,
      "max-zoom" : 10,
      "description" : "Three properties with values separated by spaces." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=10 ;,initial-scale=yes;",
      "min-width" : 10,
      "max-width" : 10,
      "zoom" : 1,
      "description" : "\"yes;\" means \"yes\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100 a= initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "description" : "Space is consumed before property value." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100 a=; initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Semi-colon is a valid separator in place for a property value." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=100,,,initial-scale=1",
      "min-width" : 100,
      "max-width" : 100,
      "zoom" : 1,
      "description" : "Multiple commas allowed." },

    { "url" : "viewport-test.html",
      "meta-content" : "width====3000",
      "min-width" : 3000,
      "max-width" : 3000,
      "description" : "Multiple equals-signs are accepted." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=400%",
      "min-width" : 400,
      "max-width" : 400,
      "description" : "width=400% gives 400 pixels." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=height=830",
      "min-width" : 0,
      "max-width" : 0,
      "description" : "Value can contain equals sign." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=,height=480",
      "min-height" : 480,
      "max-height" : 480,
      "description" : "Comma separator terminates empty value." },

    { "url" : "viewport-test.html",
      "meta-content" : "width = 540",
      "min-width" : 540,
      "max-width" : 540,
      "description" : "Space can occur before and after assignment operator" },

    { "url" : "viewport-test.html",
      "meta-content" : "initial-scale=.7",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 0.7,
      "description" : ".7 is a valid initial-scale" },

    { "url" : "viewport-test.html",
      "meta-content" : "width 500",
      "description" : "Space is not an assignment operator" },

    { "url" : "viewport-test.html",
      "meta-content" : "width:680",
      "description" : "Colon is not an assignment operator" },

    /*
     *
     * Tests for mobile DOCTYPEs below
     *
     */

    { "url" : "xhtmlmp10.html",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 1,
      "description" : "XHTML Mobile Profile 1.0 document that should trigger width=device-width." },

    { "url" : "xhtmlmp10.html",
      "meta-content" : "width=700, initial-scale=0.5",
      "min-width" : 700,
      "max-width" : 700,
      "zoom" : 0.5,
      "description" : "XHTML Mobile Profile 1.0 document with viewport meta" },

    { "url" : "xhtmlmp10-oma.html",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 1,
      "description" : "OMA XHTML Mobile Profile 1.0 document that should trigger width=device-width." },

    { "url" : "xhtmlmp11.html",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 1,
      "description" : "XHTML Mobile Profile 1.1 document that should trigger width=device-width." },

    { "url" : "xhtmlmp12.html",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 1,
      "description" : "XHTML Mobile Profile 1.2 document that should trigger width=device-width." },

    { "opera-only" : true,
      "url" : "xhtmlbasic10.html",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 1,
      "description" : "XHTML Basic 1.0 document that should trigger width=device-width." },

    { "opera-only" : true,
      "url" : "xhtmlbasic11.html",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 1,
      "description" : "XHTML Basic 1.1 document that should trigger width=device-width." },

    { "opera-only" : true,
      "url" : "compact.html",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 1,
      "description" : "Compact HTML document that should trigger width=device-width." },

    /*
     *
     * Tests for mobile document mimetypes below
     *
     */

    { "opera-only" : true,
      "server-only" : true,
      "url" : "mobdoc-http-vnd.wap.html",
      "mimetype": "application/vnd.wap.xhtml+xml",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 1,
      "description" : "Document with mime-type (application/vnd.wap.xhtml+xml) that should be recognized as a Mobile Document and set width to device-width.\n\nThis test must be run from a server." },

    /*
     *
     * Tests for ERA text-wrap below
     *
     */

    { "opera-only" : true,
      "url" : "text-wrap-test.html",
      "meta-content" : "width=600, maximum-scale=10, initial-scale=2",
      "text-wrap-enabled" : true,
      "description" : "Check that ERA TextWrap is enabled for pages with a Viewport META tag.\n\nThis is an Opera-only test. It will be skipped for other browsers." },

    { "opera-only" : true,
      "url" : "text-wrap-test.html",
      "text-wrap-enabled" : true,
      "description" : "Check that ERA TextWrap is enabled for pages without a Viewport META tag.\n\nThis is an Opera-only test. It will be skipped for other browsers." },

    /*
     *
     * More tests for Viewport META property parsing
     *
     */

    { "url" : "viewport-test.html",
      "meta-content" : "= width=400",
      "min-width" : 400,
      "max-width" : 400,
      "description" : "Empty property name not allowed (\"= width=400\")" },

    { "url" : "viewport-test.html",
      "meta-content" : "== width=400",
      "min-width" : 400,
      "max-width" : 400,
      "description" : "Empty property name not allowed (\"== width=400\")" },

    { "url" : "viewport-test.html",
      "meta-content" : " = width=400",
      "min-width" : 400,
      "max-width" : 400,
      "description" : "Empty property name not allowed (\" = width=400\")" },

    { "url" : "viewport-test.html",
      "meta-content" : " == width=400",
      "min-width" : 400,
      "max-width" : 400,
      "description" : "Empty property name not allowed (\" == width=400\")" },

    { "url" : "viewport-test.html",
      "meta-content" : "x= width=400",
      "description" : "Width is value in \"x= width=400\"" },

    { "url" : "viewport-test.html",
      "meta-content" : "x== width=400",
      "description" : "Width is value in \"x== width=400\"" },

    { "url" : "viewport-test.html",
      "meta-content" : "x = width=400",
      "description" : "Width is value in \"x = width=400\"" },

    { "url" : "viewport-test.html",
      "meta-content" : "x == width=400",
      "description" : "Width is value in \"x == width=400\"" },

    { "url" : "viewport-test.html",
      "meta-content" : "=x width=400",
      "description" : "Empty property name not allowed (\"=x width=400\")" },

    { "url" : "viewport-test.html",
      "meta-content" : "==x width=400",
      "description" : "Empty property name not allowed (\"==x width=400\")" },

    { "url" : "viewport-test.html",
      "meta-content" : " =x width=400",
      "description" : "Empty property name not allowed (\" =x width=400\")" },

    { "url" : "viewport-test.html",
      "meta-content" : " ==x width=400",
      "description" : "Empty property name not allowed (\" ==x width=400\")" },

    { "url" : "viewport-test.html",
      "meta-content" : ".=: width=400",
      "min-width" : 400,
      "max-width" : 400,
      "description" : "'.' and ':' are not separators" },

    { "url" : "viewport-test.html",
      "meta-content" : "=x hei og hopp width=400",
      "description" : "Width not recognized in \"=x hei og hopp width=400\"" },

    { "url" : "viewport-test.html",
      "meta-content" : "x hei og hopp width=400",
      "description" : "Width not recognized in \"x hei og hopp width=400\"" },

    { "url" : "viewport-test.html",
      "meta-content" : "width width=400",
      "min-width" : 400,
      "max-width" : 400,
      "description" : "Width recognized in \"width width=400\"" },

    { "url" : "viewport-test.html",
      "meta-content" : "width height=400",
      "min-width" : 400,
      "max-width" : 400,
      "description" : "Width recognized in \"width height=400\"" },

    { "url" : "viewport-test.html",
      "meta-content" : "height width=400",
      "min-height" : 400,
      "max-height" : 400,
      "description" : "Height recognized in \"height width=400\"" },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width=",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Width recognized in \"width=device-width=\" because '=' is a separator" },

    { "url" : "viewport-test.html",
      "meta-content" : "width=&#x09;device-width",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Check that horizontal tab is a separator space" },

    { "url" : "viewport-test.html",
      "meta-content" : "width=&#x0a;device-width",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Check that line feed is a separator space" },

    { "url" : "viewport-test.html",
      "meta-content" : "width=&#x0b;device-width",
      "min-width" : 1,
      "max-width" : 1,
      "description" : "Check that vertical tab is not a separator space" },

    { "url" : "viewport-test.html",
      "meta-content" : "width=&#x0c;device-width",
      "min-width" : 1,
      "max-width" : 1,
      "description" : "Check that form feed is not a separator space" },

    { "url" : "viewport-test.html",
      "meta-content" : "width=&#x0d;device-width",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Check that carriage return is a separator space" },

    { "url" : "viewport-test.html",
      "meta-content" : "width=&#x20;device-width",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Check that the space entity is a separator" },

    { "url" : "viewport-test.html",
      "meta-content" : "width=&#x2003;device-width",
      "min-width" : 1,
      "max-width" : 1,
      "description" : "Check that EM SPACE is not a separator space" },

    { "url" : "viewport-test.html",
      "meta-content" : "width",
      "description" : "Just a property name is dropped" },

    { "url" : "viewport-test.html",
      "meta-content" : "width=",
      "description" : "Empty property value is dropped" },

    { "url" : "viewport-test.html",
      "meta-content" : "height=2000",
      "min-height" : 2000,
      "max-height" : 2000,
      "description" : "Viewport META with \"height=2000\"." },

    /*
     * Viewport at-rule tests
     */

    { "url" : "viewport-test.html",
      "css-rules" : "width: device-width",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Viewport at-rule with \"width: device-width\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: auto",
      "min-width" : null,
      "max-width" : null,
      "description" : "Viewport at-rule with \"width: auto\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: device-height",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "description" : "Viewport at-rule with \"width: device-height\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 600px",
      "min-width" : 600,
      "max-width" : 600,
      "description" : "Viewport at-rule with \"width: 600px\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 200%",
      "min-width" : function(deviceObject) { return deviceObject.getAvailableWidth()*2; },
      "max-width" : function(deviceObject) { return deviceObject.getAvailableWidth()*2; },
      "description" : "Viewport at-rule with \"width: 200%\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "height: auto",
      "min-height" : null,
      "max-height" : null,
      "description" : "Viewport at-rule with \"height: auto\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "height: device-width",
      "min-height" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-height" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Viewport at-rule with \"height: device-width\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "height: device-height",
      "min-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "max-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "description" : "Viewport at-rule with \"height: device-height\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "height: 800px",
      "min-height" : 800,
      "max-height" : 800,
      "description" : "Viewport at-rule with \"height: 800px\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "height: 200%",
      "min-height" : function(deviceObject) { return deviceObject.getAvailableHeight()*2; },
      "max-height" : function(deviceObject) { return deviceObject.getAvailableHeight()*2; },
      "description" : "Viewport at-rule with \"height: 200%\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: auto",
      "zoom" : null,
      "description" : "Viewport at-rule with \"zoom: auto\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: 1",
      "zoom" : 1,
      "description" : "Viewport at-rule with \"zoom: 1\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: 0.5",
      "zoom" : 0.5,
      "description" : "Viewport at-rule with \"zoom: 0.5\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-zoom: auto",
      "min-zoom" : null,
      "description" : "Viewport at-rule with \"min-zoom: auto\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-zoom: auto; zoom: 0.2",
      "zoom" : 0.2,
      "min-zoom" : null,
      "description" : "Viewport at-rule with \"min-zoom: auto; zoom: 0.2\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-zoom: 1.0",
      "min-zoom" : 1,
      "description" : "Viewport at-rule with \"min-zoom: 1.0\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: .5; min-zoom: 1.0",
      "zoom" : 0.5,
      "min-zoom" : 1,
      "description" : "Viewport at-rule with \"zoom: .5; min-zoom: 1.0\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "max-zoom: auto",
      "max-zoom" : null,
      "description" : "Viewport at-rule with \"max-zoom: auto\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: 6; max-zoom: auto",
      "zoom" : 6,
      "max-zoom" : null,
      "description" : "Viewport at-rule with \"zoom: 6; max-zoom: auto\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: 2; max-zoom: 1",
      "zoom" : 2,
      "max-zoom" : 1,
      "description" : "Viewport at-rule with \"zoom: 2; max-zoom: 1\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 700px; zoom: 5; max-zoom: 2; min-zoom: 1; width: auto;",
      "min-width" : null,
      "max-width" : null,
      "zoom" : 5,
      "max-zoom" : 2,
      "min-zoom" : 1,
      "description" : "Viewport at-rule with several properties set." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 50em",
      "min-width" : function(deviceObject) { return deviceObject.getEM()*50; },
      "max-width" : function(deviceObject) { return deviceObject.getEM()*50; },
      "description" : "Viewport at-rule with \"width: 50em\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 100.0ex",
      "min-width" : function(deviceObject) { return deviceObject.getEX()*100; },
      "max-width" : function(deviceObject) { return deviceObject.getEX()*100; },
      "description" : "Viewport at-rule with \"width: 100.0ex\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 10in",
      "min-width" : function(deviceObject) { return deviceObject.getIN()*10; },
      "max-width" : function(deviceObject) { return deviceObject.getIN()*10; },
      "description" : "Viewport at-rule with \"width: 10in\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 7.62cm",
      "min-width" : function(deviceObject) { return deviceObject.getCM()*7.62; },
      "max-width" : function(deviceObject) { return deviceObject.getCM()*7.62; },
      "description" : "Viewport at-rule with \"width: 7.62cm\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "height: 101.6mm",
      "min-height" : function(deviceObject) { return deviceObject.getMM()*101.6; },
      "max-height" : function(deviceObject) { return deviceObject.getMM()*101.6; },
      "description" : "Viewport at-rule with \"width: 101.6mm\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-width: 300pt",
      "min-width" : function(deviceObject) { return deviceObject.getPT()*300; },
      "description" : "Viewport at-rule with \"min-width: 300pt\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "max-width: 12pc",
      "max-width" : function(deviceObject) { return deviceObject.getPC()*12; },
      "description" : "Viewport at-rule with \"max-width: 12pc\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-width: auto",
      "min-width" : null,
      "description" : "Viewport at-rule with \"min-width: auto\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-width: device-width",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Viewport at-rule with \"min-width: device-width\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-width: device-height",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "description" : "Viewport at-rule with \"min-width: device-height\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-width: 500px",
      "min-width" : 500,
      "description" : "Viewport at-rule with \"min-width: 500px\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "max-width: device-width",
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Viewport at-rule with \"max-width: device-width\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "max-width: device-height",
      "max-width" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "description" : "Viewport at-rule with \"max-width: device-height\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "max-width: 220px",
      "max-width" : 220,
      "description" : "Viewport at-rule with \"max-width: 220px\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-width: 2px; max-width: 200%",
      "min-width" : 2,
      "max-width" : function(deviceObject) { return deviceObject.getAvailableWidth()*2; },
      "description" : "Viewport at-rule with \"min-width: 2px; max-width: 200%\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-width: 150%; max-width: 50%",
      "min-width" : function(deviceObject) { return deviceObject.getAvailableWidth()*1.5; },
      "max-width" : function(deviceObject) { return deviceObject.getAvailableWidth()*0.5; },
      "description" : "Viewport at-rule with \"min-width: 150%; max-width: 50%\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-width: 900px; max-width: 200px; width: device-width",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Viewport at-rule with \"min-width: 900px; max-width: 200px; width: device-width\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 900px; max-width: 200px",
      "min-width" : 900,
      "max-width" : 200,
      "description" : "Viewport at-rule with \"width: 900px; max-width: 200px\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 200px; max-width: 900px",
      "min-width" : 200,
      "max-width" : 900,
      "description" : "Viewport at-rule with \"width: 200px; max-width: 900px\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 900px 200px",
      "min-width" : 900,
      "max-width" : 200,
      "description" : "Viewport at-rule with \"width: 900px 200px\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 20em 20em",
      "min-width" : function(deviceObject) { return deviceObject.getEM()*20; },
      "max-width" : function(deviceObject) { return deviceObject.getEM()*20; },
      "description" : "Viewport at-rule with \"width: 20em 20em\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: auto 200%",
      "min-width" : null,
      "max-width" : function(deviceObject) { return deviceObject.getAvailableWidth()*2; },
      "description" : "Viewport at-rule with \"width: auto 200%\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 1mm device-width",
      "min-width" : function(deviceObject) { return deviceObject.getMM(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Viewport at-rule with \"width: 1mm device-width\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 200px 4000px; min-width: 1000px",
      "min-width" : 1000,
      "max-width" : 4000,
      "description" : "Viewport at-rule with \"width: 200px 4000px; min-width: 1000px\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-width: 1000px; width: 200px 4000px",
      "min-width" : 200,
      "max-width" : 4000,
      "description" : "Viewport at-rule with \"width: 200px 4000px; min-width: 1000px\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-height: auto",
      "min-height" : function() { return null; },
      "description" : "Viewport at-rule with \"min-height: auto\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-height: device-width",
      "min-height" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Viewport at-rule with \"min-height: device-width\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-height: device-height",
      "min-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "description" : "Viewport at-rule with \"min-height: device-height\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-height: 500px",
      "min-height" : 500,
      "description" : "Viewport at-rule with \"min-height: 500px\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "max-height: device-width",
      "max-height" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Viewport at-rule with \"max-height: device-width\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "max-height: device-height",
      "max-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "description" : "Viewport at-rule with \"max-height: device-height\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "max-height: 220px",
      "max-height" : 220,
      "description" : "Viewport at-rule with \"max-height: 220px\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-height: 2000px; max-height: 3000px; height: device-height",
      "min-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "max-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "description" : "Viewport at-rule with \"min-height: 2000px; max-height: 3000px; height: device-height\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "height: device-height; min-height: 150%; max-height: 200px;",
      "min-height" : function(deviceObject) { return deviceObject.getAvailableHeight()*1.5; },
      "max-height" : 200,
      "description" : "Viewport at-rule with \"height: device-height; min-height: 150%; max-height: 200px;\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "height: 200% 300%",
      "min-height" : function(deviceObject) { return deviceObject.getAvailableHeight()*2; },
      "max-height" : function(deviceObject) { return deviceObject.getAvailableHeight()*3; },
      "description" : "Viewport at-rule with \"height: 200% 300%\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "height: 3000px 2000px",
      "min-height" : 3000,
      "max-height" : 2000,
      "description" : "Viewport at-rule with \"height: 3000px 2000px\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "height: 3000px; height: auto auto",
      "min-height" : null,
      "max-height" : null,
      "description" : "Viewport at-rule with \"height: 3000px; height: auto auto\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 700px; width: -500px;",
      "min-width" : 700,
      "max-width" : 700,
      "description" : "Viewport at-rule with negative width." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 700px; width: 0px;",
      "min-width" : 700,
      "max-width" : 700,
      "description" : "Viewport at-rule with zero width." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: 2; zoom: -1;",
      "zoom" : 2,
      "description" : "Viewport at-rule with negative zoom." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: 2; zoom: 0;",
      "zoom" : 2,
      "description" : "Viewport at-rule with zero zoom." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 650em; height: 5000%",
      "min-width" : function(deviceObject) { return deviceObject.getEM()*650; },
      "max-width" : function(deviceObject) { return deviceObject.getEM()*650; },
      "min-height" : function(deviceObject) { return deviceObject.getAvailableHeight()*50; },
      "max-height" : function(deviceObject) { return deviceObject.getAvailableHeight()*50; },
      "description" : "Viewport at-rule with large width and height." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: 6",
      "zoom" : 6,
      "description" : "Viewport at-rule with large zoom." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: 16; min-zoom: 20",
      "zoom" : 16,
      "min-zoom" : 20,
      "description" : "Viewport at-rule with large zoom and min-zoom." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: 2; zoom: inherit",
      "zoom" : 2,
      "description" : "Viewport at-rule with 'inherit' value." },

    { "url" : "meta-and-style-test.html",
      "meta-content" : "height=-1",
      "css-rules" : "width: auto; zoom: 1;",
      "min-width" : null,
      "max-width" : null,
      "min-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "max-height" : function(deviceObject) { return deviceObject.getDeviceHeight(); },
      "zoom" : 1,
      "min-zoom" : 3,
      "description" : "Viewport at-rule &gt; meta &gt; at-rule." },

    { "url" : "media-and-style-test.html",
      "min-width" : 200,
      "max-width" : 200,
      "description" : "Viewport at-rule inside @media." },

    { "url" : "css-link-test.html",
      "min-width" : 200,
      "max-width" : 200,
      "description" : "Viewport at-rule via link element." },

    { "url" : "two-viewport-at-rules.html",
      "min-width" : 400,
      "max-width" : 400,
      "min-height" : 700,
      "max-height" : 700,
      "description" : "Viewport at-rules, two in one style element." },

    { "url" : "viewport-test.html",
      "css-rules" : "width: 400px !important; width: 900px",
      "min-width" : 400,
      "max-width" : 400,
      "description" : "Viewport at-rule, !important declaration." },

    { "url" : "mixed-case-at-viewport.html",
      "min-width" : 900,
      "max-width" : 900,
      "description" : "Viewport at-rule, mixed case for at-keyword." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: 100%;",
      "zoom" : 1,
      "description" : "Viewport at-rule with \"zoom: 100%;\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: 600%; zoom: -100%",
      "zoom" : 6,
      "description" : "Viewport at-rule with \"zoom: 600%; zoom: -100%\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "min-zoom: 150%; zoom: 100%",
      "zoom" : 1,
      "min-zoom" : 1.5,
      "description" : "Viewport at-rule with \"min-zoom: 150%; zoom: 100%\"." },

    { "url" : "viewport-test.html",
      "css-rules" : "zoom: 0.8; max-zoom: 50%",
      "zoom" : 0.8,
      "max-zoom" : 0.5,
      "description" : "Viewport at-rule with \"zoom: 0.8; max-zoom: 50%\"." },

    { "url" : "multiple-at-media-at-viewport.html",
      "min-width" : function(deviceObject) { var aw = deviceObject.getAvailableWidth(); return (aw <= 400 ? 700 : (aw >= 800 ? 400 : 100)); },
      "max-width" : function(deviceObject) { var aw = deviceObject.getAvailableWidth(); return (aw <= 400 ? 700 : (aw >= 800 ? 400 : 100)); },
      "description" : "Viewport at-rules and multiple @media rules." },

    { "url" : "at-viewport-media-height.html",
      "min-width" : function(deviceObject) { return (deviceObject.getAvailableHeight() <= 500 ? 300 : undefined); },
      "max-width" : function(deviceObject) { return (deviceObject.getAvailableHeight() <= 500 ? 300 : undefined); },
      "min-height" : 900,
      "max-height" : 900,
      "description" : "Viewport at-rules in @media depending on height." },

      /* target-densityDpi */

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=device-dpi",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(deviceObject.getDPI()); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(deviceObject.getDPI()); },
      "target-densitydpi" : function(deviceObject) { return deviceObject.getDPI(); },
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=device-dpi\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=low-dpi",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(120); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(120); },
      "target-densitydpi" : 120,
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=low-dpi\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=medium-dpi",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(160); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(160); },
      "target-densitydpi" : 160,
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=medium-dpi\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=high-dpi",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(240); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(240); },
      "target-densitydpi" : 240,
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=high-dpi\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=70",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(70); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(70); },
      "target-densitydpi" : 70,
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=70\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=200",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(200); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(200); },
      "target-densitydpi" : 200,
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=200\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=400",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(400); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(400); },
      "target-densitydpi" : 400,
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=400\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=69",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=69\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=100, target-densityDpi=300",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(300); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(300); },
      "target-densitydpi" : 300,
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=100, target-densityDpi=300\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=160, target-densityDpi=401",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(160); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(160); },
      "target-densitydpi" : 160,
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=160, target-densityDpi=401\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=100.9",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(100.9); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(100.9); },
      "target-densitydpi" : 100.9,
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=100.9\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=120dpi",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(120); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(120); },
      "target-densitydpi" : 120,
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=120dpi\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=160garbage",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(160); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(160); },
      "target-densitydpi" : 160,
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=160garbage\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=140, target-densityDpi=0",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(140); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(140); },
      "target-densitydpi" : 140,
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=140, target-densityDpi=0\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densityDpi=-100",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(); },
      "description" : "Viewport Meta with \"width=device-width, target-densityDpi=-100\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=device-width, target-densitydpi=180",
      "min-width" : function(deviceObject) { return deviceObject.getDeviceWidth(180); },
      "max-width" : function(deviceObject) { return deviceObject.getDeviceWidth(180); },
      "target-densitydpi" : 180,
      "description" : "Viewport Meta with \"width=device-width, target-densitydpi=180\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "width=300, target-densityDpi=130",
      "min-width" : 300,
      "max-width" : 300,
      "target-densitydpi" : 130,
      "description" : "Viewport Meta with \"width=300, target-densityDpi=130\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "target-densityDpi=low-dpi",
      "target-densitydpi" : 120,
      "description" : "Viewport Meta with \"target-densityDpi=low-dpi\"." },

    { "url" : "viewport-test.html",
      "meta-content" : "target-densityDpi=medium-dpi, initial-scale=2",
      "min-width" : null,
      "max-width" : null,
      "target-densitydpi" : 160,
      "zoom" : 2,
      "description" : "Viewport Meta with \"target-densityDpi=medium-dpi, initial-scale=2\"." }
];
