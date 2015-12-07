function drawScatter(baseball,charta,flag) {

        d3.select(charta)
          .append('h3')
          .text('Batting Average vs Player Size Colored by Batting Hand')
          .style('text-align', "center");

      //Creates a set with all the names in the dataset
          var names = d3.set();

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
              });
          }

      //Creates a set with all the handedness in the dataset

          var hand = d3.set();

              baseball.forEach(function(d) {
                  hand.add(d['handedness'])
              });
              hand.add('Show All');
      //Sets up the SVG area
        "use strict";
          var margin = 70,
              width = 1100 - margin,
              height = 700 - margin,
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
              dt = +d['avg'];
              return dt.toPrecision(3);
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
            .orient('left')
            .tickFormat(d3.format('.3f'));

          var height_axis_x = d3.svg.axis()
            .scale(height_scale_x);

          var hw_axis = d3.svg.axis()
            .scale(hw_scale);

          var size_axis = d3.svg.axis()
            .scale(size_scale);

          var svgA = d3.select(charta).select("svg")

            svg.append('g')
            .attr('class', "x axis")
            .attr("transform", "translate(0,"+ height + ")")
            .style('stroke', "black")
            .style('fill', 'none')
            .style('font-family', 'sans-serif')
            .call(size_axis);

            svg.append('g')
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin + ",0)")
            .style('stroke', "black")
            .style('fill', 'none')
            .call(avg_axis);

          //Appends Text Labels to the axis

          //d3.select("svg")
            svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (margin/3) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Batting Average")
            .style('font', '16px sans-serif')
            .style('font-weight','bold');

          //d3.select('svg')
            svg.append('text')
            .attr("text-anchor", "middle")
            .attr("transform", "translate("+ (width+margin)/2 +","+(height+(margin/2))+")")
            .text("Player Size")
            .style('font', '16px sans-serif')
            .style('font-weight','bold');
            //.text("Weight (lb)");




          //Add a hoverover tooltip for each point
          var tooltip = d3.select('body')
                          .append("div")
                          .append('pre')
                          .attr('class', "tooltip")
                          .style("position", "absolute")
                          .style("z-index", "10")
                          .style("visibility", "hidden")
                          .style('background', "lightBlue")
                          .text("a simple tooltip");

          var colors = {
            'r':'rgb(253, 180, 98)',
            'l':'rgb(128, 177, 211)',
            'b':'rgb(188, 128, 189)',
            'rdark':'rgb(215,153,83)',
            'ldark':'rgb(109,150,179)',
            'bdark':'rgb(160,109,161)'
          };

          function handed(d){
              var h = d['handedness'].toLowerCase();
              if (h=='r') {
                return colors[h];
              } else if (h=='l'){
                return colors[h];
              } else {
                return colors[h];
              }
          }



              //return 'rgb(247, 148, 32)'
/*
              rgb(251, 128, 114) //lightRed
              rgb(128, 177, 211) //lightBlue
              rgb(253, 180, 98) //lightOrange
              rgb(179, 222, 105) //lightGreen
              rgb(188, 128, 189) //lightPurple
*/

          //randome number gen for jitter
          function getRandomInt(min, max) {
              return Math.floor(Math.random() * (max - min)) + min;
          }


          //MouseOver, MouseMove and MouseOut event functions, to display tooltips and display interactive components
          function mouseOver(d){ 
                  var h = d['handedness'].toLowerCase();
                  var boxId = '#boxplot-'+h+'----';
                  var dimpleId = '#dimple-'+h+'----';
                  d3.select(boxId)
                    .select('rect')
                    .style('fill',colors[h+'dark']);

                  d3.select(dimpleId)
                    .style('fill',colors[h+'dark']);

                  //d3.select(boxId).select('rect').style('opacity','0.3');

                  return tooltip.style("visibility", "visible").text(d['name']+'\n'+'Home Runs: '+d['HR']+'\n'+'Avg: '+d['avg']+'\n'+'Hand: '+d['handedness']);
                  //return d3.select(boxId).select('rect').style('opacity','0.3');
          }

          function mouseMove(d){
                  return tooltip.style("top", (event.pageY-20)+"px").style("left",(event.pageX-125)+"px");
          }

          function mouseOut(d){

                  var boxId = '#boxplot-'+d['handedness'].toLowerCase()+'----';
                  var h = d['handedness'].toLowerCase();
                  var dimpleId = '#dimple-'+h+'----';
                  d3.select(boxId)
                    .select('rect')
                    .style('fill',colors[h]);

                  d3.select(dimpleId)
                    .style('fill',colors[h]);
                  return tooltip.style("visibility", "hidden");
          }


          //Selects circle elements in SVG and binds a circle to each data point
          //d3.select("svg")
            svg.selectAll("circle")
            .data(baseball)
            .enter()
            .append("circle")
            .attr('class','players')
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
            .on("mouseover", mouseOver)
            //.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
            .on('mousemove', mouseMove)
            .on("mouseout", mouseOut);


          //Add a Legend using the colors set in colors

          var legend = svg.append('g')
              .attr("class", "legend")
              .attr('transform', "translate(" + (width - 930) + "," + 540+")")
              .selectAll("g")
              .data(["Right-Handed","Left-Handed","Switch-Hitter","Over 300 Home Runs"])
              .enter().append("g");

          legend.append("circle")
              .attr("cy", function(d,i) {
                return i *20;
              })
              .attr("r", 5)
              .attr("fill", function(d,i) {
                if (i == 0){
                  return colors['r'];
                } else if (i==1){
                  return colors['l']
                } else if (i==2){
                  return colors['b']
                } else{
                  return 'red';
                }
              });

          legend.append("text")
              .attr("y", function(d, i) {
                return i*20 + 5;
              })
              .attr ("x", radius * 5)
              .text(function(d) {
                return d;
              });


          //Update function to redraw the circles
          function update(h) {

            function update_circle(d) {
                if (+d.HR >= 300) {
                  return 'red';
                } else { 
                  return handed;
                }
            }
            function update_opacity(d) {
                if (+d.HR >= 300) {
                  return 0.6;
                } else {
                return 0.5;
                }
            }

            function update_stroke(d) {
                if (+d.HR >= 300) {
                  return 'red';
                } else {
                return handed;
                }
            }


              d3.select(charta).select('h3')
                .text(function(){
                  if (h=='L') {
                    return 'Batting Average vs Player Size: Left-Hand Batters'
                  } else if (h=='R') {
                    return 'Batting Average vs Player Size: Right-Hand Batters'
                  } else if (h =='B') {
                    return 'Batting Average vs Player Size: Switch Hitters'
                  } else{
                    return 'Batting Average vs Player Size Colored by Batting Hand'
                  }
                });

              if (h == 'Show All') {
                filt_bs = baseball;
              } else {
                filt_bs = baseball.filter(function(d) { return d['handedness'] == h; } );
              }

              var updatecircle = svg.selectAll('.players')
                 
              updatecircle.remove();



                 
              svg.selectAll('.players').data(filt_bs)
                        .enter()
                        .append("circle")
                        .attr('class','players')
                        .attr('cx', function(d) { 
                            //var result = height_scale_x(d['height']) + getRandomInt(-12,12);
                            //var result = hw_scale(d['HW']) + getRandomInt(-12,12);
                            var result = size_scale(d['size'])
                            return result;
                        })
                        .attr('cy', function(d) { 
                            var result = avgaxis_scale(d['avg']); //+ getRandomInt(-12,12); 
                            return result;
                        })
                        //.attr('r', function(d) { return hr_scale(d['HR']); })
                        .attr('r', 4)
                        .attr('fill', handed)
                        .attr('stroke', handed)
                        .attr('stroke-width', 0.7)
                        .attr('opacity', 0.5)
                        .style('fill', update_circle)
                        .style('stroke', update_stroke)
                        .style('opacity', update_opacity)
                        .on("mouseover", mouseOver)
                        //.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
                        .on('mousemove', mouseMove)
                        .on("mouseout", mouseOut)
                        //debugger;

          };

          function newfunc(color){
            console.log(hand);
            d3.selectAll('circle')
               .style('fill',color)
          }

          d3.select(charta).append('p')
            .text('*Player Size is a composite variable by summing the min-max scaled weight and height and normalized to 0.0-1.0')
            .style('text-align','center');

          //Set an Interval that will continue running that changes the color of the handedness
          var hand_idx = 0;


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
                      .attr('class','hbuttons')
                      .attr('id', function(d){
                        return 'button-'+d.toLowerCase()+'----';
                      })
                      .style('visibility',function(d){
                        if (d =='Show All'){
                          return 'visible';
                        } else {
                          return 'hidden';
                        }
                      })
                      .text(function(d){ return d;
                      })
                      .style('background',function(d){
                        if (d =='Show All'){
                          return 'lightBlue';
                        } else {
                          return 'rgb(251, 128, 114)';
                        }
                      })
                      .style('color',function(d){
                        if (d =='Show All'){
                          return 'white';
                        } else {
                          return 'black';
                        }
                      });

                buttons.on("click", function(d) {
                    d3.selectAll('div.hand_buttons div')
                      //.selectAll('div')
                      .style("background", "rgb(251, 128, 114)")
                      .style('color', "black");

                    d3.select(this)
                      .transition()
                      .duration(300)
                      .style('background', "lightBlue")
                      .style('color', 'white');

                    update(d);
                });

            }
          }, 2000);

          //console.log(names.values().splice(0,10));
      }