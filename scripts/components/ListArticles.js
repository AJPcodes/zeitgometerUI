var ListArticles = React.createClass({

  render: function(){
    var articles = this.props.articles.map(function(article){
      return <li> {article.title} </li>;
    });
    return (
      <div>
        <h3> Recent Articles </h3>
        <ul>
          {articles}
        </ul>
      </div>
    )
  }
})

module.exports = ListArticles