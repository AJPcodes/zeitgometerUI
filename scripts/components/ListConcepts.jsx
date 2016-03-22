var ListConcepts = React.createClass({

  render: function(){
    var concepts = Object.keys(this.props.concepts).map(function(concept){

      var conceptId = this.props.concepts[concept]._id
      var articles = this.props.concepts[concept].articles
      var numArticles = 0;
      if (articles) {
        numArticles = articles.length
      }

      return  <li>
                <div className="collapsible-header">{concept} <span className="badge">{numArticles}</span></div>
                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
              </li>;
    }.bind(this));
    return (
      <div>
          <ul className="collapsible popout" data-collapsible="accordion">
            {concepts}
          </ul>
      </div>
    )
  }
})

module.exports = ListConcepts