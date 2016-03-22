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
        { id: this.props.handle }
      );
    }
  });

module.exports = RP