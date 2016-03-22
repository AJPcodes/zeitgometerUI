var RP = require('./ReactPlotly.jsx')

var ArticleConcepts = React.createClass({

  render: function(){
    // console.log(this.props)
    if (this.props.concepts) {
      var plotID = this.props.title
      var plotData = {
        x: [],
        y: [],
        type: 'bar',
        orientation: 'h'
      }

      var layout = {                     // all "layout" attributes: #layout
          title: 'Topics by relevance',  // more about "layout.title": #layout-title
          barmode: 'stack',
          xaxis: {
              title: 'Relevance',
              range: [75, 100],
              domain: [0, 1],
              zeroline: false,
              showline: false,
              showticklabels: true,
              showgrid: true
            }
        }


      var concepts = this.props.concepts.slice(0,15).forEach(function(concept){
        var score = concept.score.toFixed(2) * 100;
        // return <p><span className="badge">{concept.concept.label} {score}</span></p>;
          plotData.x.push(score),
          plotData.y.push(concept.concept.label)
      });

      var config = {
        showLink: false,
        displayModeBar: true
      };

      return (<div>
          <RP handle={plotID} data={[plotData]} layout={layout}/>
        </div>
      )

    }//end if

    else return (<div></div>)
  }//end render

}) //end

module.exports = ArticleConcepts


  // render() {
  //   let data = [
  //     {
  //       type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
  //       x: [1, 2, 3],     // more about "x": #scatter-x
  //       y: [6, 2, 3],     // #scatter-y
  //       marker: {         // marker is an object, valid marker keys: #scatter-marker
  //         color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
  //       }
  //     },
  //     {
  //       type: 'bar',      // all "bar" chart attributes: #bar
  //       x: [1, 2, 3],     // more about "x": #bar-x
  //       y: [6, 2, 3],     // #bar-y
  //       name: 'bar chart example' // #bar-name
  //     }
  //   ];
  //   let layout = {                     // all "layout" attributes: #layout
  //     title: 'simple example',  // more about "layout.title": #layout-title
  //     xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
  //       title: 'time'         // more about "layout.xaxis.title": #layout-xaxis-title
  //     },
  //     annotations: [            // all "annotation" attributes: #layout-annotations
  //       {
  //         text: 'simple annotation',    // #layout-annotations-text
  //         x: 0,                         // #layout-annotations-x
  //         xref: 'paper',                // #layout-annotations-xref
  //         y: 0,                         // #layout-annotations-y
  //         yref: 'paper'                 // #layout-annotations-yref
  //       }
  //     ]
  //   };
  //   let config = {
  //     showLink: false,
  //     displayModeBar: true
  //   };
  //   return (
  //     <Plotly className="whatever" data={data} layout={layout} config={config}/>
  //   );
  // }