(function() {
// Test is initiated from body.onload, so explicit done() call is required.
setup({ explicit_done: true });

function checkSubtreeExpectedValues(t, parent, prefix)
{
    var checkedLayout = checkExpectedValues(t, parent, prefix);
    Array.prototype.forEach.call(parent.childNodes, function(node) {
        checkedLayout |= checkSubtreeExpectedValues(t, node, prefix);
    });
    return checkedLayout;
}

function checkAttribute(output, node, attribute)
{
    var result = node.getAttribute && node.getAttribute(attribute);
    output.checked |= !!result;
    return result;
}

function assert_tolerance(actual, expected, message)
{
    if (isNaN(expected) || Math.abs(actual - expected) >= 1) {
        assert_equals(actual, Number(expected), message);
    }
}

function checkDataKeys(node) {
    var validData = {
        "data-expected-width": true,
        "data-expected-height": true,
        "data-offset-x": true,
        "data-offset-y": true,
        "data-expected-client-width": true,
        "data-expected-client-height": true,
         "data-expected-scroll-width": true,
        "data-expected-scroll-height": true,
        "data-expected-bounding-client-rect-width": true,
        "data-total-x": true,
        "data-total-y": true,
        "data-expected-display": true,
        "data-expected-padding-top": true,
        "data-expected-padding-bottom": true,
        "data-expected-padding-left": true,
        "data-expected-padding-right": true,
        "data-expected-margin-top": true,
        "data-expected-margin-bottom": true,
        "data-expected-margin-left": true,
        "data-expected-margin-right": true
    };
    if (!node || !node.getAttributeNames)
        return;
    for (let name of node.getAttributeNames()) {
        if (name.startsWith("data-") && !validData[name])
            console.warn(`checkLayout unexpected data attribute "${name}`);
    }
}

function checkExpectedValues(t, node, prefix)
{
    checkDataKeys(node);
    var output = { checked: false };

    var expectedWidth = checkAttribute(output, node, "data-expected-width");
    if (expectedWidth) {
        assert_tolerance(node.offsetWidth, expectedWidth, prefix + "width");
    }

    var expectedHeight = checkAttribute(output, node, "data-expected-height");
    if (expectedHeight) {
        assert_tolerance(node.offsetHeight, expectedHeight, prefix + "height");
    }

    var expectedOffset = checkAttribute(output, node, "data-offset-x");
    if (expectedOffset) {
        assert_tolerance(node.offsetLeft, expectedOffset, prefix + "offsetLeft");
    }

    var expectedOffset = checkAttribute(output, node, "data-offset-y");
    if (expectedOffset) {
        assert_tolerance(node.offsetTop, expectedOffset, prefix + "offsetTop");
    }

    var expectedWidth = checkAttribute(output, node, "data-expected-client-width");
    if (expectedWidth) {
        assert_tolerance(node.clientWidth, expectedWidth, prefix + "clientWidth");
    }

    var expectedHeight = checkAttribute(output, node, "data-expected-client-height");
    if (expectedHeight) {
        assert_tolerance(node.clientHeight, expectedHeight, prefix + "clientHeight");
    }

    var expectedWidth = checkAttribute(output, node, "data-expected-scroll-width");
    if (expectedWidth) {
        assert_tolerance(node.scrollWidth, expectedWidth, prefix + "scrollWidth");
    }

    var expectedHeight = checkAttribute(output, node, "data-expected-scroll-height");
    if (expectedHeight) {
        assert_tolerance(node.scrollHeight, expectedHeight, prefix + "scrollHeight");
    }

    var expectedWidth = checkAttribute(output, node, "data-expected-bounding-client-rect-width");
    if (expectedWidth) {
        assert_tolerance(node.getBoundingClientRect().width, expectedWidth, prefix + "getBoundingClientRect().width");
    }

    var expectedOffset = checkAttribute(output, node, "data-total-x");
    if (expectedOffset) {
        var totalLeft = node.clientLeft + node.offsetLeft;
        assert_tolerance(totalLeft, expectedOffset, prefix +
                         "clientLeft+offsetLeft (" + node.clientLeft + " + " + node.offsetLeft + ")");
    }

    var expectedOffset = checkAttribute(output, node, "data-total-y");
    if (expectedOffset) {
        var totalTop = node.clientTop + node.offsetTop;
        assert_tolerance(totalTop, expectedOffset, prefix +
                         "clientTop+offsetTop (" + node.clientTop + " + " + node.offsetTop + ")");
    }

    var expectedDisplay = checkAttribute(output, node, "data-expected-display");
    if (expectedDisplay) {
        var actualDisplay = getComputedStyle(node).display;
        assert_equals(actualDisplay, expectedDisplay, prefix + "display");
    }

    var expectedPaddingTop = checkAttribute(output, node, "data-expected-padding-top");
    if (expectedPaddingTop) {
        var actualPaddingTop = getComputedStyle(node).paddingTop;
        // Trim the unit "px" from the output.
        actualPaddingTop = actualPaddingTop.slice(0, -2);
        assert_equals(actualPaddingTop, expectedPaddingTop, prefix + "padding-top");
    }

    var expectedPaddingBottom = checkAttribute(output, node, "data-expected-padding-bottom");
    if (expectedPaddingBottom) {
        var actualPaddingBottom = getComputedStyle(node).paddingBottom;
        // Trim the unit "px" from the output.
        actualPaddingBottom = actualPaddingBottom.slice(0, -2);
        assert_equals(actualPaddingBottom, expectedPaddingBottom, prefix + "padding-bottom");
    }

    var expectedPaddingLeft = checkAttribute(output, node, "data-expected-padding-left");
    if (expectedPaddingLeft) {
        var actualPaddingLeft = getComputedStyle(node).paddingLeft;
        // Trim the unit "px" from the output.
        actualPaddingLeft = actualPaddingLeft.slice(0, -2);
        assert_equals(actualPaddingLeft, expectedPaddingLeft, prefix + "padding-left");
    }

    var expectedPaddingRight = checkAttribute(output, node, "data-expected-padding-right");
    if (expectedPaddingRight) {
        var actualPaddingRight = getComputedStyle(node).paddingRight;
        // Trim the unit "px" from the output.
        actualPaddingRight = actualPaddingRight.slice(0, -2);
        assert_equals(actualPaddingRight, expectedPaddingRight, prefix + "padding-right");
    }

    var expectedMarginTop = checkAttribute(output, node, "data-expected-margin-top");
    if (expectedMarginTop) {
        var actualMarginTop = getComputedStyle(node).marginTop;
        // Trim the unit "px" from the output.
        actualMarginTop = actualMarginTop.slice(0, -2);
        assert_equals(actualMarginTop, expectedMarginTop, prefix + "margin-top");
    }

    var expectedMarginBottom = checkAttribute(output, node, "data-expected-margin-bottom");
    if (expectedMarginBottom) {
        var actualMarginBottom = getComputedStyle(node).marginBottom;
        // Trim the unit "px" from the output.
        actualMarginBottom = actualMarginBottom.slice(0, -2);
        assert_equals(actualMarginBottom, expectedMarginBottom, prefix + "margin-bottom");
    }

    var expectedMarginLeft = checkAttribute(output, node, "data-expected-margin-left");
    if (expectedMarginLeft) {
        var actualMarginLeft = getComputedStyle(node).marginLeft;
        // Trim the unit "px" from the output.
        actualMarginLeft = actualMarginLeft.slice(0, -2);
        assert_equals(actualMarginLeft, expectedMarginLeft, prefix + "margin-left");
    }

    var expectedMarginRight = checkAttribute(output, node, "data-expected-margin-right");
    if (expectedMarginRight) {
        var actualMarginRight = getComputedStyle(node).marginRight;
        // Trim the unit "px" from the output.
        actualMarginRight = actualMarginRight.slice(0, -2);
        assert_equals(actualMarginRight, expectedMarginRight, prefix + "margin-right");
    }

    return output.checked;
}

var testNumber = 0;
var highlightError = true;
var printDomOnError = window.testRunner != undefined;

window.checkLayout = function(selectorList, callDone = true)
{
    if (!selectorList) {
        console.error("You must provide a CSS selector of nodes to check.");
        return;
    }
    var nodes = document.querySelectorAll(selectorList);
    nodes = Array.prototype.slice.call(nodes);
    var checkedLayout = false;
    Array.prototype.forEach.call(nodes, function(node) {
        test(function(t) {
            var container = node.parentNode.className == 'container' ? node.parentNode : node;
            var prefix =
                printDomOnError ? '\n' + container.outerHTML + '\n' : '';
            var passed = false;
            try {
                checkedLayout |= checkExpectedValues(t, node.parentNode, prefix);
                checkedLayout |= checkSubtreeExpectedValues(t, node, prefix);
                passed = true;
            } finally {
              if (!passed && highlightError) {
                if (!document.querySelector('#testharness_error_css')) {
                  var style = document.createElement('style');
                  style.setAttribute('id', '#testharness_error_css');
                  style.appendChild(document.createTextNode(
                      '.testharness_error { outline: red dotted 2px !important; }'));
                }
                if (node && node.classList)
                  node.classList.add('testharness_error');
              }
                checkedLayout |= !passed;
            }
        }, selectorList + ' ' + String(++testNumber));
    });
    if (!checkedLayout) {
        console.error("No valid data-* attributes found in selector list : " + selectorList);
    }
    if (callDone)
        done();
};

})();
