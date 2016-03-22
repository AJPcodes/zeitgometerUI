var RP = React.createClass({
    displayName: 'Plot',

    propTypes: {
      handle: React.PropTypes.string.isRequired,
      data: React.PropTypes.array.isRequired,
      layout: React.PropTypes.object
    },
    componentDidMount: function componentDidMount() {
      this.plot(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      this.plot(nextProps);
    },
    plot: function plot(props) {
      var handle = props.handle,
          data = props.data,
          layout = props.layout;
      Plotly.plot(handle, data, layout);
    },
    render: function render() {
      return React.createElement(
        'div',
        { id: this.props.handle },
        'test'
      );
    }
  });

var trace1 = {
r: [6.80498578527, 3.38959601061, 5.38147211075, 8.05954021942, 5.31822922787, 2.98509993563, 1.96658700238, 6.76926540821, 4.07340189872, 6.50437182527, 7.556369819, 4.04745609407, 7.38666249607, 5.41362473698, 7.47071653116, 7.98211021694, 4.73781408009, 4.20645304293, 5.47860480459, 4.8245202807, 5.5996006099, 6.86679521708, 3.08567136626, 7.77181094323, 3.6877944351, 5.36035668519, 5.1404467393, 6.04544568093, 6.83392094019, 3.62076946254, 3.9894305834, 5.3118244995, 4.60821348028, 6.64058471615, 3.05518885448, 7.49256416375, 5.48507817779, 3.89779499662, 5.97624511403, 5.44706156091, 5.37703411681, 4.69080578773, 4.71164049118, 3.62991932939, 5.95766807637, 5.35712128439, 3.84923528282, 6.25050713632, 7.12224335715, 3.39940423384, 3.51055667227, 4.10099760366, 4.0963821002, 6.23358307481, 3.93948852677, 3.9254450774, 6.11813250146, 3.94045034629, 7.58301557326, 3.51320214534],
t: [-30.3529443619, -25.6114598545, -12.4252274527, 13.9613805187, -4.95093284067, -25.6922741909, 12.4687641616, -4.91376410703, -10.9673802876, 30.8141940549, 2.47495943114, 17.9755437524, 0.771130593362, 6.13748848563, -14.451963574, 28.1845341129, 12.538680066, -8.98323033713, 5.23128516476, -64.4890025358, 11.3574866818, 3.45407479151, 13.9243466131, -25.3640020468, -16.818006386, -10.2600510306, -13.2121341256, 2.5793388653, 8.71757496585, -10.6754987192, -2.92636601252, 25.1958807548, 40.5903293216, -9.12143363019, -24.2973623813, -3.17694450569, 10.8504984192, -31.3320597474, 4.84956746221, 15.0482769541, 3.29510469926, -6.19709187313, -8.77857413578, 29.5491741194, -5.13744879288, 23.0268604879, -6.63481657837, 2.75501499186, 21.7332501137, -24.8169949601, -7.83054706253, 28.3257962102, 12.3009774678, -21.56315724, -19.3355162838, 26.1464431708, -1.70607120268, 16.071723695, 2.05326630285, -5.09791161233],
mode: 'markers',
name: 'Trial 1',
marker: {
color: 'rgb(27,158,119)',
size: 110,
line: {color: 'white'},
opacity: 0.7
},
type: 'scatter'
};

var trace2 = {
r: [6.80498578527, 3.38959601061, 5.38147211075, 8.05954021942, 5.31822922787, 2.98509993563, 1.96658700238, 6.76926540821, 4.07340189872, 6.50437182527, 7.556369819, 4.04745609407, 7.38666249607, 5.41362473698, 7.47071653116, 7.98211021694, 4.73781408009, 4.20645304293, 5.47860480459, 4.8245202807, 5.5996006099, 6.86679521708, 3.08567136626, 7.77181094323, 3.6877944351, 5.36035668519, 5.1404467393, 6.04544568093, 6.83392094019, 3.62076946254, 3.9894305834, 5.3118244995, 4.60821348028, 6.64058471615, 3.05518885448, 7.49256416375, 5.48507817779, 3.89779499662, 5.97624511403, 5.44706156091, 5.37703411681, 4.69080578773, 4.71164049118, 3.62991932939, 5.95766807637, 5.35712128439, 3.84923528282, 6.25050713632, 7.12224335715, 3.39940423384, 3.51055667227, 4.10099760366, 4.0963821002, 6.23358307481, 3.93948852677, 3.9254450774, 6.11813250146, 3.94045034629, 7.58301557326, 3.51320214534],
t: [-30.3529443619, -25.6114598545, -12.4252274527, 13.9613805187, -4.95093284067, -25.6922741909, 12.4687641616, -4.91376410703, -10.9673802876, 30.8141940549, 2.47495943114, 17.9755437524, 0.771130593362, 6.13748848563, -14.451963574, 28.1845341129, 12.538680066, -8.98323033713, 5.23128516476, -64.4890025358, 11.3574866818, 3.45407479151, 13.9243466131, -25.3640020468, -16.818006386, -10.2600510306, -13.2121341256, 2.5793388653, 8.71757496585, -10.6754987192, -2.92636601252, 25.1958807548, 40.5903293216, -9.12143363019, -24.2973623813, -3.17694450569, 10.8504984192, -31.3320597474, 4.84956746221, 15.0482769541, 3.29510469926, -6.19709187313, -8.77857413578, 29.5491741194, -5.13744879288, 23.0268604879, -6.63481657837, 2.75501499186, 21.7332501137, -24.8169949601, -7.83054706253, 28.3257962102, 12.3009774678, -21.56315724, -19.3355162838, 26.1464431708, -1.70607120268, 16.071723695, 2.05326630285, -5.09791161233],
mode: 'markers',
name: 'Trial 2',
marker: {
color: 'rgb(27,158,119)',
size: 110,
line: {color: 'red'},
opacity: 0.7
},
type: 'scatter'
};


var layout = {
title: 'Hobbs-Pearson Trials',
font: {size: 15},
plot_bgcolor: 'rgb(223, 223, 223)',
angularaxis: {tickcolor: 'rgb(253,253,253)'}
};

var data2 = [trace1];
var data3 = [trace2];

var Demo = React.createClass({
  getInitialState: function () {
    return {
      name : 'Limelights',
      data2: data2
    };
  },
  componentDidMount: function () {
    setTimeout(function (){
      this.setState({data2: data3});
    }.bind(this), 5000);
  },
  render: function () {
    return (
      <div>
        <h2> Hello, {this.state.name}!</h2>
        <RP id="polarScatterPlot" handle="graph" data={this.state.data2} layout={layout}/>
      </div>
    );
  }
});

module.exports = Demo