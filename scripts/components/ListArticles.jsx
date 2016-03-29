var ArticleConcepts = require('./ArticleConcepts.jsx')

var ListArticles = React.createClass({

  componentDidMount: function() {
      $('.modal-trigger').leanModal();
  },


  openGraph: function(modalID) {
    console.log('open graph')
    $("#" + modalID).openModal()
  },

  closeGraph: function(modalID) {
    console.log('close graph')
    $("#" + modalID).closeModal()
  },

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
                  </div>
                  <div className="collapsible-body">
                    <p> <a href={article.url} target="blank">Read it on {article.website.toUpperCase()}</a>   or   view a <a className="waves-effect waves-light .modal-trigger" href={"#" + article._id} onClick={function(){this.openGraph(article._id)}.bind(this)}> Concept Graph</a>
                    </p>
                    <div id={article._id} className="modal">
                      <div className="modal-content">
                        <h4>{article.title}</h4>
                        <ArticleConcepts title={article.title} concepts={article.concepts}/>
                      </div>
                        <div className="modal-footer">
                          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={function() {this.closeGraph(article._id)}.bind(this)}>Close</a>
                        </div>
                    </div>
                  </div>
                </li>;
      }.bind(this));
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

