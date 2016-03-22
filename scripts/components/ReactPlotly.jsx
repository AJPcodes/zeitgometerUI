var RP = React.createClass({
    displayName: 'Plot',

    propTypes: {
      handle: React.PropTypes.string.isRequired,
      data: React.PropTypes.array.isRequired,
      layout: React.PropTypes.object,
      config: React.PropTypes.object
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
          layout = props.layout,
          config = props.config;
      Plotly.plot(handle, data, layout, config);
    },
    render: function render() {
      return React.createElement(
        'div',
        { id: this.props.handle }
      );
    }
  });

module.exports = RP