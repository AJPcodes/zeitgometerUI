var ListArticles = require('./ListArticles')

var recentArticlesAPI = "http://zeitgometerapi.heroku.com/article/recent"

var ArticlesContainer  = React.createClass({

  getInitialState: function() {
    return {
      articles: [],
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(recentArticlesAPI, function (result) {
      this.setState({
        articles: result.data,
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function(){
    return (
      <div>
        <h3> Zeitgometer </h3>
        <ListArticles articles={this.state.articles} />
      </div>
    )
  }
})

module.exports = ArticlesContainer