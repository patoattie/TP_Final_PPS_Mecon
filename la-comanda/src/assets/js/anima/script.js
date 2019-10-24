var tl = new TimelineMax({repeat: 0});
var svg = document.getElementById("mozo");

var t2 = new TimelineMax({repeat: 0});
var svg2 = document.getElementById("prontop1");

TweenLite.defaultEase = Sine.easeInOut;
TweenLite.defaultOverwrite = false;

tl.to(svg, 2, {delay: 1, attr: {viewBox: "0 0 400 230"}});
t2.to(svg2, 2, {delay: 1, attr: {viewBox: "0 0 195 69"}});