var ListConcepts = require('../components/ListConcepts.jsx')
var request = require('superagent')

var apiUrl = "http://zeitgometerapi.heroku.com/concept/trending"

var ConceptsContainer  = React.createClass({

  getInitialState: function() {
    return {
      concepts: null
    };
  },

  componentDidMount: function() {
     request
      .post('/api')
      .send({ "apiEndpoint": apiUrl})
      .set('Accept', "*/*")
      .end(function (err, res) {
        if (err) return console.error(err)

        var data = JSON.parse(res.text)
        this.setState({
          concepts: data.data.concepts
        });

      }.bind(this))
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function(){
    return (
      <div className="col s10">
        <h3 id="conceptsTop" >Concepts</h3>
        <ListConcepts concepts={this.state.concepts} />
      </div>
    )
  }
})

module.exports = ConceptsContainer