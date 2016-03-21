var ListConcepts = require('./ListConcepts.jsx')
var request = require('superagent')

var apiUrl = "http://zeitgometerapi.heroku.com/popular"

var ConceptsContainer  = React.createClass({

  getInitialState: function() {
    return {
      concepts: [{'title': 'Gathering Articles, please wait'}]
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
          concepts: data.data
        });

      }.bind(this))
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