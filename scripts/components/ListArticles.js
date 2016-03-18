var ArticleConcepts = require('./ArticleConcepts')

var ListArticles = React.createClass({

  render: function(){
    var articles = this.props.articles.map(function(article){
      return  <li>
                <div className="collapsible-header">{article.title}</div>
                <div className="collapsible-body">
                  <ArticleConcepts concepts={article.concepts}/>
                </div>
              </li>;
    });
    return (
      <div>
        <h3> Recent Articles </h3>
          <ul className="collapsible popout" data-collapsible="accordion">
            {articles}
          </ul>
      </div>
    )
  }
})

module.exports = ListArticles