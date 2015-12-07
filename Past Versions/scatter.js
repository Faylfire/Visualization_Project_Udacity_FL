function drawScatter(baseball,charta,flag) {

        d3.select(charta)
          .append('h3')
          .text('Baseball: Height/Weight and Batting Average')
          .style('text-align', "center");

      //Creates a set with all the names in the dataset
          var names = d3.set();
/*
          var countl = 0, countr = 0, countb = 0;
          var hrl = 0, hrr = 0, hrb = 0;
          function count_left(hrs){
            countl += 1;
            hrl += hrs;
          }
          function count_right(hrs){
            countr += 1;
            hrr += hrs;
          }
          function count_b(hrs){
            countb +=1;
            hrb += hrs;
          }
*/
          if (flag){
              baseball.forEach(function(d) {
                  d['HW']= +d['weight']/Math.sqrt(+d['height']);

                  var h_extent = d3.extent(baseball, function(d) {
                      return d['height'];
                  });

                  var w_extent = d3.extent(baseball, function(d) {
                      return d['weight'];
                  });
                  var wMM = (+d['weight']-w_extent[0])/(w_extent[1]-w_extent[0]);
                  var hMM = (+d['height']-h_extent[0])/(h_extent[1]-h_extent[0]);

                  d['size'] = (wMM + hMM)/2;
/*
                  if (d['handedness'] == 'L') {
                    count_left(+d['HR']);
                  } else if (d['handedness'] == 'R') {
                    count_right(+d['HR']);
                  } else {
                    count_b(+d['HR']);
                  }
                  names.add(d['name']);
*/
              });
          }
          //var filt_baseball = baseball.filter(function(d) { return +d['avg'] > 0; } );
          //var baseball = filt_baseball;

          var countl = 0, countr = 0, countb = 0;
          var hrl = 0, hrr = 0, hrb = 0;
          var bavgl = 0, bavgr = 0, bavgb = 0;
          var sizel = 0, sizer = 0, sizeb = 0;

          var left = [0,0,0,0,0,0], right = [0,0,0,0,0,0], both = [0,0,0,0,0,0];
          function count_left(hrs, bavg, size, w, h, bmi){
            countl += 1;
            hrl += hrs;
            bavgl += bavg;
            sizel += size;
            left[0] += hrs;
            left[1] += bavg;
            left[2] += size;
            left[3] += w;
            left[4] += h;
            left[5] += bmi;
          }
          function count_right(hrs,bavg,size,w,h, bmi){
            countr += 1;
            hrr += hrs;
            bavgr += bavg;
            sizer += size;
            right[0] += hrs;
            right[1] += bavg;
            right[2] += size;
            right[3] += w;
            right[4] += h;
            right[5] += bmi;
          }
          function count_b(hrs,bavg,size,w,h,bmi){
            countb +=1;
            hrb += hrs;
            bavgb += bavg;
            sizeb += size;
            both[0] += hrs;
            both[1] += bavg;
            both[2] += size;
            both[3] += w;
            both[4] += h;
            both[5] += bmi;
          }

          baseball.forEach(function(d){
            if (d['handedness'] == 'L') {
                    count_left(+d['HR'],+d['avg'],+d['size'],+d['weight'],+d['height'],+d['HW']);
                  } else if (d['handedness'] == 'R') {
                    count_right(+d['HR'],+d['avg'],+d['size'],+d['weight'],+d['height'],+d['HW']);
                  } else {
                    count_b(+d['HR'],+d['avg'],+d['size'],+d['weight'],+d['height'],+d['HW']);
                  }
          })

          left = left.map(function(d) {return d/countl;});
          right = right.map(function(d) { return d/countr; });
          both = both.map(function(d) {return d/countb; });

      //Creates a set with all the handedness in the dataset

          var hand = d3.set();

              baseball.forEach(function(d) {
                  hand.add(d['handedness'])
              });
      //Sets up the SVG area
        "use strict";
          var margin = 70,
              width = 750 - margin,
              height = 475 - margin,
              radius = 4,
              color = '#0099FF';

          //debugger;

          //Creats g/div like area used in SVG
          var svg = d3.select(charta)
                      .append("svg")
                      .attr("width", width + margin)
                      .attr("height", height + margin)
                      .attr('class', 'scatter')
                      .append('g')
                      .attr('class','chart');

          //Finds the range of the data values in the dataset for Height and Weight
          var height_extent = d3.extent(baseball, function(d) {
              //debugger;
              return d['height'];
          });

          var weight_extent = d3.extent(baseball, function(d) {
              return d['weight'];
          });

          //Create a scale for the radius using battling average and the HR
          var bat_extent = d3.extent(baseball, function(d) {
              //debugger;
              return d['avg'];
          });

          var hr_extent = d3.extent(baseball, function(d) {
              return d['HR'];
          });

          var hw_extent = d3.extent(baseball, function(d) {
              return d['HW'];
          });

          var size_extent = d3.extent(baseball, function(d) {
              return d['size'];
          })

          var bat_scale = d3.scale.linear()
            .range([0,10])
            .domain(bat_extent);

          var hr_scale = d3.scale.linear()
            .range([0.5,2])
            .domain(hr_extent);




          //Creates the scales used to make the Axis
          var height_scale = d3.scale.linear()
            .range([height,margin])
            .domain(height_extent);

          var height_scale_x = d3.scale.linear()
            .range([margin,width])
            .domain(height_extent);

          var weight_scale = d3.scale.linear()
            .range([margin,width])
            .domain(weight_extent);

          var avgaxis_scale = d3.scale.linear()
            .range([height,margin])
            .domain(bat_extent);

          var hw_scale = d3.scale.linear()
            .range([margin,width])
            .domain(hw_extent);

          var size_scale = d3.scale.linear()
            .range([margin,width])
            .domain(size_extent);


          //Creates the axis height and weight
          var height_axis_y = d3.svg.axis()
            .scale(height_scale)
            .orient("left");

          var weight_axis = d3.svg.axis()
            .scale(weight_scale);

          var avg_axis = d3.svg.axis()
            .scale(avgaxis_scale)
            .orient('left');

          var height_axis_x = d3.svg.axis()
            .scale(height_scale_x);

          var hw_axis = d3.svg.axis()
            .scale(hw_scale);

          var size_axis = d3.svg.axis()
            .scale(size_scale);


          


          //Appends the axis to the svg.g element
/*
          d3.select("svg")
            .append('g')
            .attr('class', "x axis")
            .attr("transform", "translate(0,"+ height + ")")
            .style('stroke', "black")
            .style('fill', 'none')
            .style('font-family', 'sans-serif')
            .call(weight_axis);
*/

          var svgA = d3.select(charta).select("svg")

            svgA.append('g')
            .attr('class', "x axis")
            .attr("transform", "translate(0,"+ height + ")")
            .style('stroke', "black")
            .style('fill', 'none')
            .style('font-family', 'sans-serif')
            .call(size_axis);
            //.call(hw_axis);
            //.call(height_axis_x);

/*
          d3.select("svg")
            .append('g')
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin + ",0)")
            .style('stroke', "black")
            .style('fill', 'none')
            .call(height_axis);
*/
          //d3.select(charta).select("svg")
            svgA.append('g')
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin + ",0)")
            .style('stroke', "black")
            .style('fill', 'none')
            .call(avg_axis);

          //Appends Text Labels to the axis
/*
          d3.select("svg")
            .append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (margin/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Height (in)");
*/

          //d3.select("svg")
            svgA.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (margin/3) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Batting Average");

          //d3.select('svg')
            svgA.append('text')
            .attr("text-anchor", "middle")
            .attr("transform", "translate("+ (width+margin)/2 +","+(height+(margin/2))+")")
            .text("Size");
            //.text("Weight (lb)");

          //Add a hoverover tooltip for each point
          var tooltip = d3.select(charta)
                          .append("div")
                          .append('pre')
                          .attr('class', "tooltip")
                          .style("position", "absolute")
                          .style("z-index", "10")
                          .style("visibility", "hidden")
                          .style('background', "lightBlue")
                          .text("a simple tooltip");

          function handed(d){
              if (d['handedness']=='R') {
                return 'rgb(253, 180, 98)';
              } else if (d['handedness']=='L'){
                return 'rgb(128, 177, 211)'
              } else {
                return 'rgb(188, 128, 189)'
              }
              //return 'rgb(247, 148, 32)'
/*
              rgb(251, 128, 114) //lightRed
              rgb(128, 177, 211) //lightBlue
              rgb(253, 180, 98) //lightOrange
              rgb(179, 222, 105) //lightGreen
              rgb(188, 128, 189) //lightPurple
*/
          }

          //randome number gen for jitter
          function getRandomInt(min, max) {
              return Math.floor(Math.random() * (max - min)) + min;
          }

/*


            .attr('cx', function(d) { 
                var result = weight_scale(d['weight']) + getRandomInt(-12,12);
                if (result <= margin+11) {
                  return margin+11;
                } else {
                  return result;
                }
            })
            .attr('cy', function(d) { 
                var result = height_scale(d['height']) + getRandomInt(-12,12); 
                if (result >= height) {
                  return height-11;
                } else {
                  return result;
                }
            })

*/


          //Selects circle elements in SVG and binds a circle to each data point
          //d3.select("svg")
            svgA.selectAll("circle")
            .data(baseball)
            .enter()
            .append("circle")
            .filter(function(d) {
              return d['avg'] > 0
            })
            .attr('cx', function(d) { 
                //var result = height_scale_x(d['height']) + getRandomInt(-12,12);
                //var result = hw_scale(d['HW']) + getRandomInt(-12,12);
                var result = size_scale(d['size'])
                if (result <= margin+11) {
                  return margin+11;
                } else {
                  return result;
                }
            })
            .attr('cy', function(d) { 
                var result = avgaxis_scale(d['avg']); //+ getRandomInt(-12,12); 
                if (result >= height) {
                  return height-11;
                } else {
                  return result;
                }
            })
            //.attr('r', function(d) { return hr_scale(d['HR']); })
            .attr('r', 4)
            .attr('fill', handed)
            .attr('stroke', handed)
            .attr('stroke-width', 0.7)
            .attr('opacity', 0.5)
            .on("mouseover", function(d){ return tooltip.style("visibility", "visible").text(d['name']+'\n'+'HR: '+d['HR']+'\n'+'Avg: '+d['avg']+'\n'+'Y/X: '+event.pageY+' '+event.pageX);
            })
            //.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
            .on('mousemove', function(){return tooltip.style("top", (event.pageY-20)+"px").style("left",(event.pageX-225)+"px");})
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

          function update(h) {

            function update_circle(d) {
                  
                  //debugger;
                  if(d.handedness == h) {
                      if (+d.HR >= 300) {
                        return 'red';
                      } else { 
                        return handed(d);
                      }
                  } else {
                      return 'white';
                  }
            }
            function update_opacity(d) {
                  if(d.handedness == h) {
                      if (+d.HR >= 300) {
                        return 0.6;
                      } else {
                      return 0.5;
                    }
                  } else {
                      return 0;
                  }
            }
            function update_stroke(d) {
                  if(d.handedness == h) {
                      if (+d.HR >= 300) {
                        return 'red';
                      } else {
                      return handed;
                    }
                  } else {
                      return 'white';
                  }
            }


              d3.select(charta).select('h3')
                .text(function(){
                  if (h=='L') {
                    return 'Baseball: Height/Weight and Batting Average for Left-Hand Batters'
                  } else if (h=='R') {
                    return 'Baseball: Height/Weight and Batting Average for Right-Hand Batters'
                  } else {
                    return 'Baseball: Height/Weight and Batting Average for Switch Hitters'
                  }
                });

              svgA.selectAll('circle')
                        .transition()
                        .duration(500)
                        .style('fill', update_circle)
                        .style('stroke', update_stroke)
                        .style('opacity', update_opacity);
          };

          function newfunc(color){
            console.log(hand);
            d3.selectAll('circle')
               .style('fill',color)
          }

          //Set an Interval that will continue running that changes the color of the handedness
          var hand_idx = 0;
          var colors = ['black', 'red', 'blue'];

          var hand_interval = setInterval(function() {
            update(hand.values()[hand_idx]);
            //newfunc(colors[hand_idx]);

            hand_idx++;

            if(hand_idx >= hand.values().length) {
                clearInterval(hand_interval);
                //hand_idx = 0;

                var buttons = d3.select(charta)
                      .append("div")
                      .attr("class", "hand_buttons")
                      .selectAll("div")
                      .data(hand.values())
                      .enter()
                      .append('div')
                      .text(function(d){ return d;
                      });

                buttons.on("click", function(d) {
                    d3.selectAll('div.hand_buttons div')
                      //.selectAll('div')
                      .style("background", "rgb(251, 201, 127)")
                      .style('color', "black");

                    d3.select(this)
                      .transition()
                      .duration(500)
                      .style('background', "lightBlue")
                      .style('color', 'white');

                    update(d);
                });

            }
          }, 2000);

          //console.log(names.values().splice(0,10));
      }