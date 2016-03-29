var ArticleConcepts = require('./ArticleConcepts.jsx')
var getById = "http://zeitgometerapi.heroku.com/article/"
var request = require('superagent')

var ListConcepts = React.createClass({

  getInitialState: function() {
    return {modalData: null};
  },

  openGraph: function(modalID) {
    console.log('open graph')
    this.getArticleById(modalID)
    $("#" + modalID).openModal()
  },

  closeGraph: function(modalID) {
    console.log('close graph')
    $("#" + modalID).closeModal()
  },


  getArticleById: function(articleId) {

     request
      .post('/api')
      .send({ "apiEndpoint": (getById + articleId)})
      .set('Accept', "*/*")
      .end(function (err, res) {
        if (err) return console.error(err)

        var data = JSON.parse(res.text)
        this.setState({
          modalData: data.data
        });

      }.bind(this))
  },

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

          if (this.state.modalData && this.state.modalData._id  === article._id) {
            graphData = this.state.modalData.concepts

          return  <div>
                    <h6> {article.title}:</h6>
                    <p><a href={article.url} target="blank"> Read it on {article.website} </a> or
                     view a <a className="waves-effect waves-light .modal-trigger" href={"#" + article._id} onClick={function(){this.openGraph(article._id)}.bind(this)}> Concept Graph</a>
                    </p>
                    <div id={article._id} className="modal">
                      <div className="modal-content">
                        <h4>{article.title}</h4>
                        <ArticleConcepts title={article.title} articleId={article._id} concepts={graphData}/>
                      </div>
                        <div className="modal-footer">
                          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={function() {this.closeGraph(article._id)}.bind(this)}>Close</a>
                        </div>
                    </div>
                  </div>;


          } else {
            graphData = null

            return <div>
                    <h6> {article.title}:</h6>
                    <p><a href={article.url} target="blank"> Read it on {article.website} </a> or
                     view a <a className="waves-effect waves-light .modal-trigger" href={"#" + article._id} onClick={function(){this.openGraph(article._id)}.bind(this)}> Concept Graph</a>
                    </p>
                    <div id={article._id} className="modal">
                      <div className="modal-content">
                        <h4>{article.title}</h4>
                        <p>Loading Graph Data</p>
                      </div>
                        <div className="modal-footer">
                          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={function() {this.closeGraph(article._id)}.bind(this)}>Close</a>
                        </div>
                    </div>
                  </div>;

          }


        }.bind(this)) //end map

        return  <li>
                  <div className="collapsible-header"><p>Concept: {concept}</p>  <p>Mentions: {numArticles}</p></div>
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