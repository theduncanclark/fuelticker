var DURATION = 1000,
    SVG_W = 1000,
    SVG_H = 700,
    SVG_M = { t: SVG_H/20, r: SVG_W/20, b: SVG_H/20, l: SVG_W/20 },
    CORE_W = SVG_W - SVG_M.l - SVG_M.r,
    CORE_H = SVG_H - SVG_M.t - SVG_M.b;

// D3 shorthands
var $ = d3.select,
    $$ = d3.selectAll;

// Query string
var parameters = {};
(function (query, re, match) {
	while (match = re.exec(query)) {
		parameters[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
	}
})(window.location.search.substring(1).replace(/\+/g, "%20"), /([^&=]+)=?([^&]*)/g);
if (parameters.graun == "true") {
	$$("h1, .standfirst").remove();
	$("#wrapper").style("padding", 0);
}

// Generic transitions
function fadeOut(selector, duration, delay) {
	if (typeof duration == "undefined") duration = DURATION;
	if (typeof delay == "undefined") delay = 0;
	$(selector).transition().duration(duration).style("opacity", 0);
}

function fadeIn(selector, duration, delay) {
	if (typeof duration == "undefined") duration = DURATION;
	if (typeof delay == "undefined") delay = 0;
	$(selector).transition().duration(duration).style("opacity", 1);
}

// Chart setup
function initBlankChartIn(selector, w, h, m) {
	if (typeof w == "undefined") w = SVG_W;
	if (typeof h == "undefined") h = SVG_H;
	if (typeof m == "undefined") m = SVG_M;

	var svg = $(selector).append("svg").attr("viewBox", "0 0 " + w + " " + h);
	var core = svg.append("g").attr("class", "core")
			.attr("transform", "translate(" + m.l + "," + m.t + ")");
			
	core.append("rect")
		.attr("width", 0).attr("height", 0)
		.transition().duration(1000)
		.attr("fill", "black")
		.attr("width", CORE_W).attr("height", CORE_H);
}

// Graphics
function exponential() {
	initBlankChartIn("#chart-exponential");
	var core = $("#chart-exponential svg .core");

	var exp_start = 0.1;
	    exp_rate = 2.2,
	    exp_series = [],
	    running_total = exp_start;
	for (var i = 1850; i < 2015; i++) {
		running_total = running_total * (100 + exp_rate)/100;
		var year_object = {};
		year_object.year = i;
		year_object.val = running_total;
		exp_series.push(year_object);
	}

	var line = d3.svg.line().interpolate("monotone")
		.x(function(d) { return d.year; })
		.y(function(d) { return d.val; });

	core.append("path").attr("d", line(exp_series)).attr("white");
}

function reserves() {
	var words = ["minaar", "oh", "year", "fishes", "minuu", "really", "berry", "larry", "animal", "dog"];
	for (var i = 0; i < 100; i++) {
		setTimeout(function() {
			var n = Math.floor(Math.random() * 10);
			t = $("#reserves .caption p").text();
			$("#reserves .caption p").text(t + " " + words[n]);
		}, i * 25)
	}
	initBlankChartIn("#chart-reserves");
}
