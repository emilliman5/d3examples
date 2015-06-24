// Generated by CoffeeScript 1.9.3
(function() {
  var button_size, color, gap, height, hilit, i, left_width, make_plot, margin, myscatter, rad, sets, svg, width, y;

  height = 500;

  width = 800;

  left_width = 80;

  gap = 10;

  button_size = 20;

  rad = 3;

  color = "#6A5ACD";

  hilit = "#C71585";

  margin = {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };

  svg = d3.select("div#chart").append("svg").attr("height", height).attr("width", width + left_width);

  sets = ["I", "II", "III", "IV"];

  y = (function() {
    var results;
    results = [];
    for (i in sets) {
      results.push(margin.top + i * button_size * 1.5);
    }
    return results;
  })();

  svg.selectAll("empty").data(sets).enter().append("rect").attr("x", gap).attr("y", function(d, i) {
    return y[i];
  }).attr("height", button_size).attr("width", button_size).attr("fill", color).on("mouseover", function(d) {
    return d3.select(this).attr("fill", hilit);
  }).on("mouseout", function(d) {
    return d3.select(this).attr("fill", color);
  }).on("click", function(d) {
    return make_plot(d);
  });

  svg.selectAll("empty").data(sets).enter().append("text").text(function(d) {
    return d;
  }).attr("x", gap + button_size * 2).attr("y", function(d, i) {
    return y[i] + button_size / 2.0;
  }).style("dominant-baseline", "middle").style("text-anchor", "middle").style("font-size", "20px");

  myscatter = scatterplot().xvar("x").yvar("y").xlab("X").ylab("Y").xlim([3, 20]).ylim([2.1, 13.74]).margin(margin).height(height - margin.top - margin.bottom).width(width - margin.left - margin.right - gap).pointsize(rad).pointcolor(color);

  make_plot = function(set) {
    return d3.json("http://localhost:8080/anscombe/" + set, function(data) {
      var myscatter_svg;
      d3.select("svg#scatterplot").remove();
      d3.select(".d3-tip").remove();
      return myscatter_svg = svg.append("svg").attr("height", height).attr("width", width + left_width).attr("id", "scatterplot").append("g").attr("transform", "translate(" + left_width + ",0)").datum(data).call(myscatter);
    });
  };

}).call(this);