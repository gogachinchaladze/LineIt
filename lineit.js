var lineIt = (function () {
    //Line Color, Line height, Line z-position, Transition duration, Transition timing function, Hover/always
    function createLine(color, height, animationTime, animationTimingFunction) {
        var lineDiv = document.createElement("div");
        lineDiv.className = "line";
        lineDiv.style.backgroundColor = color;
        lineDiv.style.height = height;
        lineDiv.style.transitionDuration = animationTime;
        lineDiv.style.webkitTransitionDuration = animationTime;
        lineDiv.style.transitionTimingFunction = animationTimingFunction;
        lineDiv.style.webkitTransitionTimingFunction = animationTimingFunction;

        return lineDiv;
    }

    function drawLine(el) {
        var sentence = el.innerHTML,
            words = sentence.split(" "),
            lineColor = el.getAttribute('data-line-color'),
            lineHeight = el.getAttribute('data-line-height'),
            linePosition = el.getAttribute('data-line-it'),
            hoverOnly = (el.getAttribute('data-line-hover') === "true" || el.getAttribute('data-line-hover') === "1"),
            animationTime = el.getAttribute('data-animation-time'),
            animationTimingFunction = el.getAttribute('data-timing-function');

        el.className += " line-it"; //Adding basic class
        el.className += (linePosition) ? " " + linePosition : ""; //Adding position class
        el.className += (hoverOnly) ? " hover-only" : ""; //adding hover/not hover class

        if (linePosition == "through" || linePosition === undefined) { //converting string to spans
            var htmlString = "";
            for (var i = 0, length = words.length; i < length; i++) {
                var chars = words[i].split('');
                for (var j = 0, charslength = chars.length; j < charslength; j++) {
                    var charInSpan = '<span>' + chars[j] + '</span>'
                    htmlString += charInSpan;
                }
                htmlString += "&nbsp;";
            }
            el.innerHTML = htmlString;
        }
        var line = createLine(lineColor, lineHeight, animationTime, animationTimingFunction);
        el.appendChild(line);
    }


    function init() {
        var lineItEls = document.querySelectorAll('[data-line-it]');
        for (var i = 0, length = lineItEls.length; i < length; i++) {
            drawLine(lineItEls[i]);
        }
    }
    return {
        please: init
    }
})();


window.addEventListener('load', function (e) {
    lineIt.please();
});