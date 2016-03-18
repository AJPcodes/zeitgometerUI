var ListConcepts = require('./ListConcepts')

var popularConceptsAPI = "http://zeitgometerapi.heroku.com/popular"

var ConceptsContainer  = React.createClass({

  getInitialState: function() {
    return {
      concepts: [{'title': 'Gathering Articles, please wait'}]
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(popularConceptsAPI, function (result) {
      this.setState({
        concepts: result.data
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function(){
    return (
      <div>
        <h3> Zeitgometer Concepts</h3>
        <ListConcepts concepts={this.state.concepts} />
      </div>
    )
  }
})

module.exports = ConceptsContainer