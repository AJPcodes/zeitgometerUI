var ListConcepts = React.createClass({

  render: function(){

    if (this.props.concepts === null) {

      return (
        <div>
            <ul className="collapsible popout" data-collapsible="accordion">
            Getting Data
            </ul>
        </div>
      ) //end return

    } else {

      var conceptKeys = Object.keys(this.props.concepts);

      //sory by number of articles
      conceptKeys.sort(function(a,b) {
        if (this.props.concepts[a].size > this.props.concepts[b].size) {
          return -1
        } else if (this.props.concepts[a].size < this.props.concepts[b].size) {
          return 1
        } else {
          return 0;
        }
      }.bind(this))





      var concepts = conceptKeys.map(function(concept){

        var conceptId = this.props.concepts[concept]._id
        var articles = this.props.concepts[concept].articles
        var numArticles = 0;
        if (articles) {
          numArticles = articles.length
        }

        mappedArticles = articles.map(function(article) {

          return  <div>
                    <h6> {article.title} </h6>
                    <p> <a href={article.url} target="blank"> Read it on {article.website} </a></p>
                  </div>;

        }) //end map

        return  <li>
                  <div className="collapsible-header">{concept} <span className="badge">{numArticles}</span></div>
                  <div className="collapsible-body">{mappedArticles}</div>
                </li>;

      }.bind(this)); //end map concepts


      return (
        <div>
            <ul className="collapsible popout" data-collapsible="accordion">
              {concepts}
            </ul>
        </div>
      ) //end return
    } //end render
  }
}) //end class declaration

module.exports = ListConcepts