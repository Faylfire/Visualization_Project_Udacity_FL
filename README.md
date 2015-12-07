# Visualization Project


### Fang Lu
### Udacity
### 11/3/2015





## Summary

Does Batting Hand Matter?

Batting Performance Comparision of Baseball Players

This dataset contains 1157 baseball players with their names, height, weight, batting hand, batting average (ratio of safe hits to at-bats), and total career home runs. 266 pitchers have been removed from the batting performance analysis (because both batting average and total home runs are zero).

This visualization compares the performance of the remaining 891 players by batting hand. Summary statistics show a statistical advantage to being a left-handed batter. The top batting average bracket (> .300) shows 67% left handers despite having half the number of players as right-handers. 

Left-Handed prevalance is approximately 10% of the general population. The dataset shows 29% left-handed batters which my indicate that batting left-handed is advantageous.



## Design

The original design was to allow for an interactive scatter plot that could be filtered by batting hand so they could explore the differences of handedness and performance. The x and y axis could be switched and changed from a drop down list so different variables available in the dataset could be viewed against each other such as batting average to home runs or batting average to height/weight. But after getting feedback, a scatter plot alone seemed to be a confusing way to see if batting hands presents an advantage.

The insights seemed to be more clear in the summary statistics and number of different handed players and their performance. The scatter plot even with the color differentiation does not clearly show that left-handed batters are at an advantage. This is partially because there are more right-handed batters than left-handed batters in the dataset and the density of the right-handed batters make differentiation difficult. The scatter plot is something that is worth exploring a bit in detail by looking at individual player stats, there is some insight into the the relationship of home runs vs batting average that can be seen. The context that the summary statistics can provide would help with navigating the scatter plot.

A pie chart was added to provide the proportion of players split by batting hand, this also provides evidence of how handedness matters in competitive sports/baseball. I was aiming for more simplicity in the presentation but the feedback showed that more clarity was needed in terms of labeling and terminology. The title of the visualization was changed to provide more context although I feel it runs the risk of biasing the readers.

*Edit* Chose to change the design of the scatter plot to show the relationship between home runs and batting average. Batting average to size was not contributing to the story of how handedness might matter in baseball. Added filtering by batting average to show that the proportion of top end players heavily favors left handers despite the fact that they are more right handed players in the dataset. The animation will now guide the reader to explore how left-hand batters take up a significant proportion of the players with top batting average. These changes should provide a more focused story that shows readers batting hand does matter in baseball in terms of performance.

Detailed Update List:

Scatter Plot only Version 1, 2 and 3 (baseball.html)
	
	* Jitter
	* different axises
	* Filtering by handedness
	* sizing of circles by home runs
	* changing chart titles
	* handedness buttons
	* Coloring of home runs

Scatter Plot plus Boxplot final_v1.html

	* Added Pie Chart
	* Removed sizing of circles according to Home Runs
	* Created final visualization layout Final_v1
	* Added Title and summary information

Final_v2.html

	* Increased the viewable area
	* Increased the chart sizes, resized the charts
	* Added buttons for more variable exploration on boxplot
	* Made boxplot and pie chart clickable to filter the scatter plot by batting hand
	* Added 'Show All' button to show all players on scatter plot
	* Fixed wording on visualization
	* Added prompt text for interactive use, and explanation for the "size" variable

Final_v3.html

	* Added legend to the scatter plot
	* Added legend to the pie chart
	* Added title for the pie chart
	* Added arrows and shadowing and a box around the buttons for boxplot interactions to be more clear
	* Resized certain texts and labels for more clarity
	* Renamed title of the visualizations for clarity "Does Batting Hand Matter"
	* Removed the use of 'Handedness' and used 'Batting Hand' for clarity
	* Added hoverover actions on the scatter plot points linked to the boxplot and pie charts to indicate clear interactive components
	* Renamed 'size' to Player Size for clarity
	* Added highlighting of the buttons corresponding to the plot shown to indicate current selection starting from page load instead of only after they click
	* Fixed the precision on the batting average axis to show 3 digits after the decimal

Final_v4.html - Final Version

	* Added back the visibility of the Scatter Plot filtering buttons and moved to the bottom right of the plot
	* Renamed the buttons to 'Right', 'Left', 'Switch', "Show All" for clarity
	* Fixed a bug with box.js not calculating the quartiles correctly, introduced in v3.
	* Adjusted position of boxplot controls

Final_v5.html - Resubmit Version

	* Added legend for boxplot for Median and Mean
	* Removed Height, Weight and Size filters for boxplot to provide a more focused presentation
	* Changed scatter plot to Home Runs versus Batting Average.
	* Added filtering by batting average to show proportion of left, right, both handed players in the pie chart
	* Changed the summary 
	* Added details to design considerations.





## Feedback



#### Melanie:

```
Scatter-plot Only:

The colors should match. Maybe when you mouse over the dots, a baseball card can show up! Not really sure what the scatter plot shows.

Scatter plot for the Right-handed batter, the title is bugged, has extra text.

The textbox with the player's information, the text is up against the edge.

It's a little hard to understand what is going on with the graph. Kinda confusing. 


Final_v1-v3:

The arrow looks like a play button and I thought it was for the scatter plot, should choose another arrow. What's going on in the scatter plot is still not very clear.

I like how the colors match and that you can click on the boxplots. 

```



##### Andrew Lee:
```
Scatter plot only:

I don't like the way home runs is mixed in with batting average. I feel that the chart should be simpler and using size to encode home runs doesn't allow you to see the density as clearly.

The graphs seem unbalanced. Needs a prompt or text message telling the users that they can filter the graphs by. The labels can be a large font, it is too small compared to the graph.
Need a legend for the red dots.

Could make use of more of the width of the screen, maybe up to 1600px or more.

Final_v2.html:

Variable selections - should add a border around the boxplot variable selections and label as such

The box plot and the buttons on the right are informative and interactive. It helps illustrate the effect of handedness on the other variables, which is larger than one might expect. The red dots in the scatter plots indicating home runs are interesting, but unfortunately not that informative given the lack career length and games in the dataset. Additionally, though one can easily explore handedness versus the other variables, there is unfortunately only one graph that does not involve handedness.


Final_v3.html:

There is an issue with the boxplots not displaying the whiskers properly. 'Show all' seems confusing because when you first click it, it doens't do anything.


```


#### Richard:

```
Final_v2.html:

Batting stats comparision of baseball player Batting performance of baseball players. The title should tell you 

The buttons are a bit confusing in their position. maybe move to the right of the boxplot

A legend is still useful, even though everything is colorcoded. Even the obvious things should be labeled or generally are labeled. 

A title for the pie chart: Proportion of players by handedness or something shorter. Put the labels on the pie chart.

Handedness to batting hand? Not a common term for baseball.

Size of dots have inherent meaning, and Home run is not one of them in baseball, not intuitive, maybe the size of the players but not very useful in representing.

For reference instead of additional context in the starting text

Not immediately noticable that it's interactive maybe put it in the title or make it more obvious that it is interactive.

Don't know where to begin. Maybe a bit of a guide. A bit of information overload.

Size of player instead of Size. Make things more clear at a glance.

Batting Average should display 3 significant digits.



```


## Resources

Andrew Lee

http://stackoverflow.com/questions/14106864/linking-jquery-in-html

http://www.w3schools.com/jsref/event_onclick.asp

http://www.w3schools.com/jsref/jsref_slice_string.asp

http://stackoverflow.com/questions/294250/how-do-i-retrieve-an-html-elements-actual-width-and-height

https://help.github.com/articles/markdown-basics/

http://bl.ocks.org/jensgrubert/7789216

http://bl.ocks.org/mbostock/4061502

https://groups.google.com/forum/#!topic/d3-js/aQSWnEDFxIc

http://community.sitepoint.com/t/what-does-before-and-after-mean/8261

http://stackoverflow.com/questions/19302318/radio-buttons-in-d3-how-to-align-text-correctly-and-select-a-default

http://bost.ocks.org/mike/block/

http://www.d3noob.org/2013/07/arranging-more-than-one-d3js-graph-on.html

http://stackoverflow.com/questions/24446465/d3-dashed-line-from-a-datapoint-to-an-axis-seen-in-dimplejs-org

https://github.com/mbostock/d3/wiki/Selections

http://www.w3schools.com/tags/tag_iframe.asp

https://github.com/mbostock/d3/wiki/Ordinal-Scales

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor

https://github.com/mbostock/d3/wiki/CSV

https://github.com/mbostock/d3/wiki/Quantitative-Scales

http://stackoverflow.com/questions/14775942/how-do-you-divide-each-number-in-an-array-by-a-variable-in-javascript

http://bl.ocks.org/mbostock/4060606

https://www.reddit.com/r/datasets

http://bl.ocks.org/joshsee/raw/027fca34feda36101528/

https://en.wikipedia.org/wiki/Handedness#cite_note-6

http://www.baseball-reference.com/players/w/wrighji03.shtml

http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/

http://tomhicks.github.io/code/2014/08/11/some-of-this.html

https://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#methods-1

http://stackoverflow.com/questions/14986435/d3-csv-data-loading

http://stackoverflow.com/questions/19116103/selecting-d3-data-subset-based-on-column

http://bl.ocks.org/mbostock/3884955

https://groups.google.com/forum/#!msg/d3-js/pl297cFtIQk/Eso4q_eBu1IJ

http://www.w3schools.com/charsets/ref_utf_misc_symbols.asp

http://character-code.com/arrows-html-codes.php

http://stackoverflow.com/questions/8356187/utf-8-special-characters-not-displaying

http://stackoverflow.com/questions/12882885/how-to-add-nbsp-using-d3-js-selection-text-method

http://stackoverflow.com/questions/8865458/how-to-align-text-vertically-center-in-div-with-css

http://stackoverflow.com/questions/11656788/d3-js-nvd3-js-axis-and-label-precision-formatting

http://www.usatoday.com/story/sports/mlb/2014/08/29/mlb-hitting-300/14801965/










