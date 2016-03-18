var ListConcepts = React.createClass({

  render: function(){
    var concepts = Object.keys(this.props.concepts).map(function(concept){

      var conceptId = this.props.concepts[concept]._id
      console.log(conceptId);
      return <li> {concept} </li>;
    }.bind(this));
    return (
      <div>
        <h3> Explore concepts </h3>
        <ul>
          {concepts}
        </ul>
      </div>
    )
  }
})

module.exports = ListConcepts