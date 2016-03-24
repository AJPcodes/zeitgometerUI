var ArticleConcepts = require('./ArticleConcepts.jsx')

var ListArticles = React.createClass({




  render: function(){

    if (this.props.articles === null) {
      return (
        <div>
            <ul className="collapsible popout" data-collapsible="accordion">
              Getting Data
            </ul>
        </div>
      )
    } else {

      var articles = this.props.articles.map(function(article){
        return  <li>
                  <div className="collapsible-header">
                    <h4>{article.title}</h4>
                    <p> <a href={article.url} target="blank">Read it on {article.website.toUpperCase()}</a></p>
                  </div>
                  <div className="collapsible-body">
                    <ArticleConcepts title={article.title} concepts={article.concepts}/>
                  </div>
                </li>;
      });
      return (
        <div>
            <ul className="collapsible popout" data-collapsible="accordion">
              {articles}
            </ul>
        </div>
      )
    }
  }
})

module.exports = ListArticles