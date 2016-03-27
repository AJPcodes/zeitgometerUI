var ListConcepts = require('../components/ListConcepts.jsx')
var SearchBar = require('../components/SearchBar.jsx')
var request = require('superagent')

var trending = "http://zeitgometerapi.heroku.com/concept/trending"
var listAll = "http://zeitgometerapi.heroku.com/concept/listAll"

var ConceptsContainer  = React.createClass({

  getInitialState: function() {
    return {
      concepts: null,
      conceptsList: null
    };
  },

  componentDidMount: function() {
     request
      .post('/api')
      .send({ "apiEndpoint": trending})
      .set('Accept', "*/*")
      .end(function (err, res) {
        if (err) return console.error(err)

        var data = JSON.parse(res.text)
        this.setState({
          concepts: data.data.concepts
        });

      }.bind(this))

    request
      .post('/api')
      .send({ "apiEndpoint": listAll})
      .set('Accept', "*/*")
      .end(function (err, res) {
        if (err) return console.error(err)

        var data = JSON.parse(res.text)

        this.setState({
          conceptsList: data.data
        });

      }.bind(this))
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function(){
    return (
      <div className="col s10">
        <SearchBar items={this.state.conceptsList} />
        <h3 id="conceptsTop" >Trending</h3>
        <ListConcepts concepts={this.state.concepts} />
      </div>
    )
  }
})

module.exports = ConceptsContainer