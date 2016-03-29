var ListArticles = require('../components/ListArticles.jsx')
var request = require('superagent')

var recent = "http://zeitgometerapi.heroku.com/article/recent"
var getById = "http://zeitgometerapi.heroku.com/article/"

var ArticlesContainer  = React.createClass({

  getInitialState: function() {
    return {
      articles: null
    };
  },

  componentDidMount: function() {

    this.getArticles(recent)

  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  getArticles: function(apiEndpoint) {
     request
      .post('/api')
      .send({ "apiEndpoint": apiEndpoint})
      .set('Accept', "*/*")
      .end(function (err, res) {
        if (err) return console.error(err)

        var data = JSON.parse(res.text)
        this.setState({
          articles: data.data
        });

      }.bind(this))
  },

  getArticleById: function(articleId) {

    this.getArticles(getById + articleId)

  },

  render: function(){
    return (
      <div className="col s10 z-depth-2" id="articlesTop" >
        <h2 > Articles </h2>
        <ListArticles articles={this.state.articles} />
      </div>
    )
  }
})

module.exports = ArticlesContainer