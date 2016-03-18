var ListConcepts = React.createClass({

  render: function(){
    var concepts = Object.keys(this.props.concepts).map(function(concept){

      var conceptId = this.props.concepts[concept]._id
      return  <li>
                <div className="collapsible-header">{concept}</div>
                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
              </li>;
    }.bind(this));
    return (
      <div>
        <h3> Recent Articles </h3>
          <ul className="collapsible popout" data-collapsible="accordion">
            {concepts}
          </ul>
      </div>
    )
  }
})

module.exports = ListConcepts