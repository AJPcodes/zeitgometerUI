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
     this.getData();
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  getData: function() {

    this.trendingLookup()

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

  conceptLookup: function(conceptId) {

    console.log('concept lookup called with', conceptId)
    var apiUrl = "http://zeitgometerapi.heroku.com/concept/" + conceptId

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

  trendingLookup: function() {

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

  },

  render: function(){
    return (
      <div className="col s10">
        <SearchBar items={this.state.conceptsList} conceptLookup={this.conceptLookup}/>
        <h3 id="conceptsTop" >Trending</h3>
        <ListConcepts concepts={this.state.concepts} />
      </div>
    )
  }
})

module.exports = ConceptsContainer