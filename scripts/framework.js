/**
 *
 * Testing framework for the Viewport Compliance Test.
 *
 *
 * @file framework.js
 * @author Rune Lillesveen <rune@opera.com>
 * @author Oyvind Stenhaug <oyvinds@opera.com>
 */

/** Helper class for parsing the query part of a URL and store the
    name/value pairs as properties on this object. */

function UrlQuery(queryString) {
    var params = queryString.split('&');
    for (var i = 0; i < params.length; ++i) {
        var fields = params[i].split('=');
        this[fields[0]] = fields[1];
    }
}


/** Class for storing device properties and running initial device check. */

function ViewportDeviceObject(queryMap) {

    if (queryMap) {
        this.availWidth = queryMap.aw ? parseInt(queryMap.aw) : -1;
        this.availHeight = queryMap.ah ? parseInt(queryMap.ah) : -1;
        this.deviceWidth = queryMap.dw ? parseInt(queryMap.dw) : -1;
        this.deviceHeight = queryMap.dh ? parseInt(queryMap.dh) : -1;
        this.desktopWidth = queryMap.dskw ? parseInt(queryMap.dskw) : -1;
        this.resolution = queryMap.dpi ? parseInt(queryMap.dpi) : -1;
        this.devicePixelRatio = queryMap.dpr ? parseInt(queryMap.dpr) : -1;
        this.emSize = queryMap.em ? parseInt(queryMap.em) : -1;
        this.exSize = queryMap.ex ? parseInt(queryMap.ex) : -1;
        this.minWidth = queryMap.minw ? parseInt(queryMap.minw) : -1;
        this.maxWidth = queryMap.maxw ? parseInt(queryMap.maxw) : -1;
        this.minScaleWidth = queryMap.minsw ? parseInt(queryMap.minsw) : -1;
        this.maxScaleWidth = queryMap.maxsw ? parseInt(queryMap.maxsw) : -1;
        this.minZoomWidthDef = queryMap.minzwd ? parseInt(queryMap.minzwd) : -1;
        this.maxZoomWidthDef = queryMap.maxzwd ? parseInt(queryMap.maxzwd) : -1;
    }
}

ViewportDeviceObject.prototype = {

    /** Type of property to detect with the current page load */
    LENGTHS: 0,
    DEVICE_SIZE: 1,
    AVAILABLE_SIZE: 2,
    DEFAULT_WIDTH: 3,
    MIN_WIDTH: 4,
    MAX_WIDTH: 5,
    MIN_SCALE: 6,
    MAX_SCALE: 7,
    DEFAULT_MIN_ZOOM: 8,
    DEFAULT_MAX_ZOOM: 9,

    /** Figure out what to check next, generate viewport meta and setup an 
        onload handler to do the checking */
    setup: function() {
        this.pickNextCheck();
        this.writeViewportMeta();
        window.viewportDetector = this;
        window.onload = function() {
            setTimeout(function() { window.viewportDetector.runCheck(); }, 100);
        }
    },

    /** Figure out what to check next, and store in this.detectProperty */
    pickNextCheck: function() {
        if (this.emSize == -1) {
            this.detectProperty = ViewportDeviceObject.prototype.LENGTHS;
            this.vpContent = null;
        }
        else if (this.deviceWidth == -1) {
            this.detectProperty = ViewportDeviceObject.prototype.DEVICE_SIZE;
            this.vpContent = "width=device-width, height=device-height";
        }
        else if (this.availWidth == -1) {
            this.detectProperty = ViewportDeviceObject.prototype.AVAILABLE_SIZE;
            this.vpContent = "initial-scale=1.0";
        }
        else if (this.desktopWidth == -1) {
            this.detectProperty = ViewportDeviceObject.prototype.DEFAULT_WIDTH;
            this.vpContent = null;
        }
        else if (this.minWidth == -1) {
            this.detectProperty = ViewportDeviceObject.prototype.MIN_WIDTH;
            this.vpContent = "width=1,minimum-scale=0,maximum-scale=100";
        }
        else if (this.maxWidth == -1) {
            this.detectProperty = ViewportDeviceObject.prototype.MAX_WIDTH;
            this.vpContent = "width=20000,minimum-scale=0,maximum-scale=100";
        }
        else if (this.minScaleWidth == -1) {
            this.detectProperty = ViewportDeviceObject.prototype.MIN_SCALE;
            this.vpContent = "initial-scale=0.01,minimum-scale=0,maximum-scale=100";
        }
        else if (this.maxScaleWidth == -1) {
            this.detectProperty = ViewportDeviceObject.prototype.MAX_SCALE;
            this.vpContent = "initial-scale=100,minimum-scale=0,maximum-scale=100";
        }
        else if (this.minZoomWidthDef == -1) {
            this.detectProperty = ViewportDeviceObject.prototype.DEFAULT_MIN_ZOOM;
            this.vpContent = "initial-scale=0.01";
        }
        else if (this.maxZoomWidthDef == -1) {
            this.detectProperty = ViewportDeviceObject.prototype.DEFAULT_MAX_ZOOM;
            this.vpContent = "initial-scale=100";
        }
        else {
            this.vpContent = "initial-scale=1.0";
        }
    },

    /** Generate HTML for the viewport meta tag. */
    writeViewportMeta: function() {
        if (this.vpContent) {
            document.write('<meta name="viewport" content="' + this.vpContent + '">');
        }
    },

    /** Calculate the device-specific values and store them on this object.
        Output results when finished. */
    runCheck: function() {
        var tc = document.getElementById("test-container");
        var width = tc.offsetWidth;
        var height = tc.offsetHeight;
        switch (this.detectProperty) {
            case ViewportDeviceObject.prototype.LENGTHS:
                var emElm = document.getElementById("em-test");
                this.emSize = parseFloat(getComputedStyle(emElm, null).width);
                var exElm = document.getElementById("ex-test");
                this.exSize = parseFloat(getComputedStyle(exElm, null).width)/10;
                break;
            case ViewportDeviceObject.prototype.DEVICE_SIZE:
                this.deviceWidth = width;
                this.deviceHeight = height;
                break;
            case ViewportDeviceObject.prototype.AVAILABLE_SIZE:
                this.availWidth = width;
                this.availHeight = height;
                break;
            case ViewportDeviceObject.prototype.DEFAULT_WIDTH:
                this.desktopWidth = width;
                break;
            case ViewportDeviceObject.prototype.MIN_WIDTH:
                this.minWidth = width;
                break;
            case ViewportDeviceObject.prototype.MAX_WIDTH:
                this.maxWidth = width;
                break;
            case ViewportDeviceObject.prototype.MIN_SCALE:
                this.minScaleWidth = width;
                break;
            case ViewportDeviceObject.prototype.MAX_SCALE:
                this.maxScaleWidth = width;
                break;
            case ViewportDeviceObject.prototype.DEFAULT_MIN_ZOOM:
                this.minZoomWidthDef = width;
                break;
            case ViewportDeviceObject.prototype.DEFAULT_MAX_ZOOM:
                this.maxZoomWidthDef = width;
                break;
            default:
                this.outputResult();
                return;
        }
        // Load next iteration.
        location.search = "?" + this.formatQuery();
    },

    outputResult: function() {
        var resElm = document.getElementById("device-result");
        resElm.firstChild.data = "Detected values:\n\n" + this.formatReport();
        document.getElementById("content").style.display = "block";
        document.getElementById("cont-button").disabled = false;
    },

    /** Return the calculated resolution in DPI. */
    getDPI: function() {
        return this.resolution;
    },

    /** Return the length of 1em in pixels. */
    getEM: function() {
        return this.emSize;
    },

    /** Return the length of 1ex in pixels. */
    getEX: function() {
        return this.exSize;
    },

    /** Return the length of 1in in pixels. */
    getIN: function() {
        return 96;
    },

    /** Return the length of 1cm in pixels. */
    getCM: function() {
        return this.getIN() / 2.54;
    },

    /** Return the length of 1mm in pixels. */
    getMM: function() {
        return this.getCM() / 10;
    },

    /** Return the length of 1pt in pixels. */
    getPT: function() {
        return this.getIN() / 72;
    },

    /** Return the length of 1pc in pixels. */
    getPC: function() {
        return this.getIN() / 6;
    },

    /** Return the calculated device-width in pixels.
        If targetDPI is given, the returned value is scaled accordingly. */
    getDeviceWidth: function(targetDPI) {
        return (targetDPI ? this.scaleToDPI(this.deviceWidth, targetDPI)
                          : this.deviceWidth);
    },

    /** Return the calculated device-height in pixels.
        If targetDPI is given, the returned value is scaled accordingly. */
    getDeviceHeight: function(targetDPI) {
        return (targetDPI ? this.scaleToDPI(this.deviceHeight, targetDPI)
                          : this.deviceHeight);
    },

    /** Return the calculated available width a.k.a. initial-width in pixels.
        If targetDPI is given, the returned value is scaled accordingly. */
    getAvailableWidth: function(targetDPI) {
        return (targetDPI ? this.scaleToDPI(this.availWidth, targetDPI)
                          : this.availWidth);
    },

    /** Return the calculated available width a.k.a. initial-height in pixels.
        If targetDPI is given, the returned value is scaled accordingly. */
    getAvailableHeight: function(targetDPI) {
        return (targetDPI ? this.scaleToDPI(this.availHeight, targetDPI)
                          : this.availHeight);
    },

    /** Return the calculated desktop width (i.e. viewport width after applying
        UA stylesheet) in pixels. */
    getDesktopWidth: function() {
        return this.desktopWidth;
    },

    /** Return the smallest width allowed in viewport meta by this UA, in pixels. */
    getMinimumWidth: function() {
        return this.minWidth >= 0 ? this.minWidth : undefined;
    },

    /** Return the largest width allowed in viewport meta by this UA, in pixels. */
    getMaximumWidth: function() {
        return this.maxWidth >= 0 ? this.maxWidth : undefined;
    },

    /** Return the smallest scale factor allowed in viewport meta by this UA. */
    getMinimumScale: function() {
        if (this.minScaleWidth > 0)
            return this.getAvailableWidth() / this.minScaleWidth;
        else
            return undefined;
    },

    /** Return the largest scale factor allowed in viewport meta by this UA. */
    getMaximumScale: function() {
        if (this.maxScaleWidth > 0)
            return this.getAvailableWidth() / this.maxScaleWidth;
        else
            return undefined;
    },

    /** Return the default min-zoom value used by this UA. */
    getDefaultMinZoom: function() {
        if (this.minZoomWidthDef > 0)
            return this.getAvailableWidth() / this.minZoomWidthDef;
        else
            return undefined;
    },

    /** Return the default max-zoom value used by this UA. */
    getDefaultMaxZoom: function() {
        if (this.maxZoomWidthDef > 0)
            return this.getAvailableWidth() / this.maxZoomWidthDef;
        else
            return undefined;
    },

    /** Return the default ratio of device px per css px, in percent */
    getDevicePixelRatio: function() {
        return this.devicePixelRatio >= 0 ? this.devicePixelRatio : undefined;
    },

    /** Return the length in CSS px of 'length' scaled using 'dpi' instead of this device's actual DPI */
    scaleToDPI: function(length, dpi) {
        /* length * device-pixel-ratio/100 = length in device pixels
         * Then scale by multiplying with (desired dpi)/(actual dpi)
         */
        return length * this.getDevicePixelRatio() * dpi / (100 * this.getDPI());
    },

    /** Format query part of url for passing on the device properties. */
    formatQuery: function() {
        var query = "aw=" + this.availWidth +
                    "&ah=" + this.availHeight +
                    "&dw=" + this.deviceWidth +
                    "&dh=" + this.deviceHeight +
                    "&dskw=" + this.desktopWidth +
                    "&dpi=" + this.resolution +
                    "&dpr=" + this.devicePixelRatio +
                    "&em=" + this.emSize +
                    "&ex=" + this.exSize +
                    "&minw=" + this.minWidth +
                    "&maxw=" + this.maxWidth +
                    "&minsw=" + this.minScaleWidth +
                    "&maxsw=" + this.maxScaleWidth +
                    "&minzwd=" + this.minZoomWidthDef +
                    "&maxzwd=" + this.maxZoomWidthDef;
        return query;
    },

    /** Format text output of device check result. */
    formatReport: function() {
        var retStr = "resolution: "+this.getDPI()+"dpi\n";
        retStr += "device-pixel-ratio: "+this.getDevicePixelRatio()+"%\n";
        retStr += "initial-width: "+this.getAvailableWidth()+"px\n";
        retStr += "initial-height: "+this.getAvailableHeight()+"px\n";
        retStr += "device-width: "+this.getDeviceWidth()+"px\n";
        retStr += "device-height: "+this.getDeviceHeight()+"px\n";
        retStr += "1em: "+this.getEM()+"px\n";
        retStr += "1ex: "+this.getEX()+"px\n";
        //retStr += "minimum META width: "+this.getMinimumWidth()+"px\n";
        //retStr += "maximum META width: "+this.getMaximumWidth()+"px\n";
        //retStr += "minimum META scale: "+this.getMinimumScale()+"\n";
        //retStr += "maximum META scale: "+this.getMaximumScale()+"\n";
        retStr += "UA style rules:\n@viewport {\n";
        retStr += "    width: "+this.getDesktopWidth()+"px;\n";
        retStr += "    min-zoom: "+this.getDefaultMinZoom()+";\n";
        retStr += "    max-zoom: "+this.getDefaultMaxZoom()+";\n";
        retStr += "}\n";
        return retStr;
    }
};


/** Exception class */

function ViewportTestException(description) {
    this.description = description;
}


/** Test instance class */

function ViewportTest(testdata) {
    this.testdata = testdata;
}

ViewportTest.prototype = {

    /** Write the viewport meta tag for this test instance. */
    writeViewportMetaTag: function() {
        if ((typeof this.testdata["meta-content"]) == "string")
            document.write('<meta name="viewport" content="' + this.testdata["meta-content"] + '">');
    },

    writeHttpContentTypeMetaTag: function() {

        if ((typeof this.testdata.mimetype) == "string") {
            var metaElm = document.createElement("meta");
            metaElm.setAttribute("http-equiv", "Content-Type");
            metaElm.setAttribute("content", this.testdata.mimetype);
            headElm = document.getElementsByTagName("head")[0];
            headElm.appendChild(metaElm);
        }
    },

    writeViewportAtRule: function() {
        if ((typeof this.testdata["css-rules"]) == "string")
            document.write('<style type="text/css"> @viewport { ' + this.testdata["css-rules"] + ' } </style>');
    },

    serverOnly: function() {
        return this.testdata["server-only"] == true;
    },

    operaOnly: function() {
        return this.testdata["opera-only"] == true;
    },

    calculateExpectedValues: function(deviceObject) {
        var minWidth = (typeof this.testdata["min-width"] == "function"
                        ? this.testdata["min-width"](deviceObject)
                        : this.testdata["min-width"]);
        var maxWidth = (typeof this.testdata["max-width"] == "function"
                        ? this.testdata["max-width"](deviceObject)
                        : this.testdata["max-width"]);
        var minHeight = (typeof this.testdata["min-height"] == "function"
                        ? this.testdata["min-height"](deviceObject)
                        : this.testdata["min-height"]);
        var maxHeight = (typeof this.testdata["max-height"] == "function"
                        ? this.testdata["max-height"](deviceObject)
                        : this.testdata["max-height"]);
        var compZoom = this.testdata.zoom;
        var minZoom = (typeof this.testdata["min-zoom"] == "function"
                       ? this.testdata["min-zoom"](deviceObject)
                       : this.testdata["min-zoom"]);
        var maxZoom = this.testdata["max-zoom"];
        var targetDPI = (typeof this.testdata["target-densitydpi"] == "function"
                        ? this.testdata["target-densitydpi"](deviceObject)
                        : this.testdata["target-densitydpi"]);
        var width = undefined;
        var height = undefined;
        var zoom = compZoom;
        var initialWidth = deviceObject.getAvailableWidth(targetDPI);
        var initialHeight = deviceObject.getAvailableHeight(targetDPI);

        /* UA stylesheet; assuming that it sets width, min-zoom and max-zoom */
        var defaultWidth = deviceObject.getDesktopWidth();
        var defaultMinZoom = (deviceObject.getDefaultMinZoom()
                              ? deviceObject.getDefaultMinZoom() : 0.25);
        var defaultMaxZoom = (deviceObject.getDefaultMaxZoom()
                              ? deviceObject.getDefaultMaxZoom() : 5);
        if (minWidth === undefined)
            minWidth = defaultWidth;
        if (maxWidth === undefined)
            maxWidth = defaultWidth;
        if (minZoom === undefined)
            minZoom = defaultMinZoom;
        if (maxZoom === undefined)
            maxZoom = defaultMaxZoom;

        /* Step 2 */
        if (minWidth != undefined && maxWidth != undefined)
            width = Math.max(minWidth, Math.min(maxWidth, initialWidth));
        else if (minWidth != undefined)
            width = Math.max(minWidth, initialWidth);
        else if (maxWidth != undefined)
            width = Math.min(maxWidth, initialWidth);
        /* Step 3 */
        if (minHeight != undefined && maxHeight != undefined)
            height = Math.max(minHeight, Math.min(maxHeight, initialHeight));
        else if (minHeight != undefined)
            height = Math.max(minHeight, initialHeight);
        else if (maxHeight != undefined)
            height = Math.min(maxHeight, initialHeight);
        /* Step 4 */
        if (minZoom != undefined && maxZoom != undefined && maxZoom < minZoom)
            maxZoom = minZoom;
        /* Step 5 */
        if (compZoom == undefined && width != undefined)
            zoom = initialWidth / width;
        /* Step 6 */
        if (zoom == undefined)
            zoom = 1;
        /* Step 7 */
        if (compZoom == undefined && height != undefined)
            zoom = Math.max(zoom, initialHeight / height);
        /* Step 8 */
        if (maxZoom != undefined && zoom > maxZoom)
            zoom = maxZoom;
        else if (minZoom != undefined && zoom < minZoom)
            zoom = minZoom;
        /* Step 9 */
        if (width == undefined) {
            if (compZoom == undefined)
                width = initialWidth;
            /* Step 10 */
            else if (height == undefined)
                width = initialWidth / zoom;
            /* Step 11 */
            else
                width = height * initialWidth / initialHeight;
        }
        /* Step 12 */
        if (height == undefined)
            height = width * initialHeight / initialWidth;
        /* Step 13 */
        width = Math.max(width, (initialWidth / zoom));
        /* Step 14 */
        height = Math.max(height, (initialHeight / zoom));

        this.expWidth = width;
        this.expHeight = height;
        this.expZoom = zoom;
        this.expDPI = targetDPI;
    },

    getExpectedTextWrapEnabled: function() {
        return this.testdata["text-wrap-enabled"];
    },

    /** Check if the test should be skipped because we're running from file, or not running Opera. */
    shouldSkip: function() {
        return (this.serverOnly() && window.location.protocol == "file:" ||
                this.operaOnly() && navigator.userAgent.indexOf("Opera") == -1);
    },

    /**
     * Run this test. Returns true if passed, otherwise false.
     * If the current document has a #last-x element, a text-wrap check is performed.
     * Otherwise, a check of viewport dimensions and initial-scale (in this case a #test-container element is assumed to exist).
     * Initial-scale is only checked in Safari (for now).
     * @param testMode one of the TEST_MODE_... values in ViewportTestHelper
     */
    run: function(deviceObject, testMode) {
        var pass = false;
        var detailedResult = "=== ERROR ===\nTest markup missing?";
        var textWrapTestElement = document.getElementById("last-x");
        var viewportTestElement = document.getElementById("test-container");
        if (textWrapTestElement) {
            pass = ((textWrapTestElement.offsetTop == 0) != this.getExpectedTextWrapEnabled());
            detailedResult = "=== " + (pass ? "PASS" : "FAIL") + " ===";
        }
        else if (viewportTestElement) {
            this.calculateExpectedValues(deviceObject);
            /* Need to check min/max for rounding issues. */
            var minExpectedWidth = Math.floor(this.expWidth);
            var maxExpectedWidth = Math.ceil(this.expWidth);
            var minExpectedHeight = Math.floor(this.expHeight);
            var maxExpectedHeight = Math.ceil(this.expHeight);
            var width = viewportTestElement.offsetWidth;
            var height = viewportTestElement.offsetHeight;
            var zoom = deviceObject.getAvailableWidth(this.expDPI)/window.innerWidth;
            var passW = (width >= minExpectedWidth && width <= maxExpectedWidth);
            var passH = (height >= minExpectedHeight && height <= maxExpectedHeight);
            var passZoom = Math.abs(zoom - this.expZoom) < 0.01;
            //if (navigator.userAgent.indexOf("Safari") == -1) passZoom = true;
            pass = passW && passH && passZoom;
            detailedResult = "=== " + (pass ? "PASS" : "FAIL") + " ===";
            if (!passW)
                detailedResult += "\nExpected width (min/max): " + minExpectedWidth + "/" + maxExpectedWidth + "\nActual width: " + width;
            if (!passH)
                detailedResult += "\nExpected height (min/max): " + minExpectedHeight + "/" + maxExpectedHeight + "\nActual height: " + height;
            if (!passZoom)
                detailedResult += "\nExpected initial-scale: " + Math.round(this.expZoom*1000)/1000 + " (+/-0.01)\nActual initial-scale: " + zoom;
        }

        if (testMode == ViewportTestHelper.prototype.TEST_MODE_SINGLE) {
            alert(detailedResult);
            window.history.back();
        }
        return pass;
    }
};


/** Helper class for selecting which test to run, run it onload,
    and trigger load of the next test. */

function ViewportTestHelper(tests) {

    var queryMap = new UrlQuery(window.location.search.substring(1));

    this.deviceObject = new ViewportDeviceObject(queryMap);

    this.tests = tests;
    this.testIndex = queryMap.idx ? parseInt(queryMap.idx) : 0;
    this.result = queryMap.res ? queryMap.res : "";
    this.testMode = queryMap.mode ? parseInt(queryMap.mode) : 0;
    if (queryMap.first)
        this.rangeFirst = parseInt(queryMap.first);
    if (queryMap.last)
        this.rangeLast = parseInt(queryMap.last);
}


ViewportTestHelper.prototype = {
    /** To be tested as part of a testsuite, one page redirecting to the  next */
    TEST_MODE_MULTI: 0,
    /** To be tested (manually) as a single test, alerting the test result */
    TEST_MODE_SINGLE: 1,

    /** Return the ViewportDeviceObject where the device properties are stored. */
    getDeviceObject: function() {
        return this.deviceObject;
    },

    /** Initialize the test to run. */
    initTest: function () {
        if (this.testIndex < this.tests.length) {
            this.vpTest = new ViewportTest(this.tests[this.testIndex]);
            this.setupTest();
        }
        else if (this.testMode == ViewportTestHelper.prototype.TEST_MODE_MULTI) {
            this.loadResultPage();
        }
    },

    /** Get the number of results. */
    getResultCount: function() {
        if (this.rangeFirst)
            return this.rangeLast - this.rangeFirst + 1;
        else
            return this.testIndex;
    },

    /** Return pass/fail/skipped for test number n (starts at 0). */
    getResult: function(n) {
        if (this.result && n < this.result.length)
            return parseInt(this.result[n]);
        else
            return 0;
    },

    /** Run the test and extend the result string. */
    runTest: function() {
        if (this.vpTest.run(this.deviceObject, this.testMode))
            this.result += "1";
        else
            this.result += "0";
    },

    /** Skip this test and load next. */
    skipTest: function() {
        this.result += "2"; // 2 means skipped.
        if (this.testMode == ViewportTestHelper.prototype.TEST_MODE_MULTI) {
            this.loadNext();
        }
        else {
            alert("=== Test skipped ===");
            window.history.back();
        }
    },

    /** Set up an onload handler that runs the test*/
    setupTest: function() {

        if (this.vpTest.shouldSkip()) {
            this.skipTest();
            return;
        }

        this.vpTest.writeViewportMetaTag();
        this.vpTest.writeViewportAtRule();

        window.testHelper = this;
        window.onload = function () {
            setTimeout(function(){
                testHelper.runTest();
                testHelper.loadNext();
                }, 100);
        };
    },

    /** Format the url query part for the next test. */
    formatQuery: function() {
        var query = "idx=" + this.testIndex +
                    "&res=" + this.result +
                    "&mode=" + this.testMode +
                    "&" + this.deviceObject.formatQuery();
        if (this.rangeFirst)
            query += "&first=" + this.rangeFirst;
        if (this.rangeLast)
            query += "&last=" + this.rangeLast;
        return query;
    },

    /** Format the url query part for running a test in single-test mode. */
    formatSingleTestQuery: function(index) {
        var query = "?idx=" + index +
                    "&mode=" + ViewportTestHelper.prototype.TEST_MODE_SINGLE +
                    "&" + this.deviceObject.formatQuery();
        return query;
    },

    /** Load the first viewport test. */
    loadFirst: function(first, last) {
        if (first || last) {
            var testCount = this.tests.length;

            if (!first || first < 1)
                first = 1;
            else if (first > testCount)
                first = testCount;

            if (!last || last > testCount)
                last = testCount;
            else if (last < 1)
                last = 1;

            if (last < first)
                last = first;

            this.rangeFirst = first;
            this.testIndex = first - 1;
            this.rangeLast = last;
        }
        location.href = this.tests[0].url + "?" + this.formatQuery();
    },

    /** Load the next test. */
    loadNext: function() {
        if (this.testMode == ViewportTestHelper.prototype.TEST_MODE_MULTI) {
            var lastTest = this.rangeLast ? this.rangeLast : this.tests.length;
            if (++this.testIndex < lastTest) {
                var nextTest = new ViewportTest(this.tests[this.testIndex]);
                if (nextTest.shouldSkip())
                    this.skipTest();
                else
                    location.href = this.tests[this.testIndex].url + "?" + this.formatQuery();
            }
            else
                this.loadResultPage();
        }
    },

    loadResultPage: function() {
        location.href = "result.html?" + this.formatQuery();
    },

    loadTestList: function() {
        location.href = "all-tests.html?" + this.formatQuery();
    },

    formatTestLink: function(index, text) {
        return ('<a href="show-test.html' + this.formatSingleTestQuery(index) + '">' + text + '</a>');
    },

    formatResults: function() {

        var passCount = 0;
        var skipCount = 0;
        var resultCount = this.getResultCount();
        var failedTests = '<p>';
        var skippedTests = '<p>';

        for (i = 0; i < resultCount; i++) {

            var testIdx = i;
            if (this.rangeFirst)
                testIdx += this.rangeFirst - 1;

            switch (this.getResult(i)) {
                case 0:
                    failedTests += this.formatTestLink(testIdx, (testIdx+1)) + ' ';
                    break;
                case 1:
                    passCount++;
                    break;
                case 2:
                    skippedTests += this.formatTestLink(testIdx, (testIdx+1)) + ' ';
                    skipCount++;
                    break;
            }
        }

        resultCount -= skipCount;

        if (resultCount == passCount)
            failedTests += 'None';

        if (skipCount == 0)
            skippedTests = 'None';

        failedTests += '</p>';

        if (resultCount > 0)
            /* Use floor to make sure 100% pass rate means we've passed all tests. */
            passRate = Math.floor((100*passCount)/resultCount);
        else
            passRate = 100;

        var retHtml = '<h2>Pass rate</h2><p class="passrate">' + passRate + '%</p>';
        retHtml += '<h2>Failed tests</h2>' + failedTests;
        retHtml += '<h2>Skipped tests</h2>' + skippedTests;

        return retHtml;
    },

    formatDescription: function() {
        this.testMode = ViewportTestHelper.prototype.TEST_MODE_SINGLE;
        var retHtml = '<h2>Test '+(this.testIndex+1)+'</h2><p style="white-space:pre-line">' + this.tests[this.testIndex].description + '</p>';
        retHtml += '<a href="' + this.tests[this.testIndex].url + "?" + this.formatQuery() + '">Run this test in single-test mode.</a>';
        return retHtml;
    },

    formatTestList: function() {
        var retHtml = '<h2>Browse tests</h2><ol>';
        var count = this.tests.length;
        for (i=0; i<count; i++) {
            var shortDesc = this.tests[i].description;
            if (shortDesc.length > 80)
                shortDesc = shortDesc.substring(0, 80) + " ...";
            retHtml += "<li>" + this.formatTestLink(i, shortDesc) + '</li>';
        }
        retHtml += "</ol>";
        return retHtml;
    }

};
