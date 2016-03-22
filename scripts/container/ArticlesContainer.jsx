var ListArticles = require('../components/ListArticles.jsx')
var request = require('superagent')

var apiUrl = "http://zeitgometerapi.heroku.com/article/recent"

var ArticlesContainer  = React.createClass({

  getInitialState: function() {
    return {
      articles: [{'title': 'Gathering Articles, please wait'}]
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
          articles: data.data
        });

      }.bind(this))
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function(){
    return (
      <div>
        <h3 id="articlesTop"> Articles </h3>
        <ListArticles articles={this.state.articles} />
      </div>
    )
  }
})

module.exports = ArticlesContainer