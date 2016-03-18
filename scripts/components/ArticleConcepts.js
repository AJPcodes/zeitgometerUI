var ArticleConcepts = React.createClass({

  render: function(){
    console.log(this.props)
    if (this.props.concepts) {
      var concepts = this.props.concepts.map(function(concept){
        return <div>{concept.concept.label} {concept.score}</div>;
        });
        return (<div>
                {concepts}
                </div>
        )
    } else {
      return <div></div>
    }
    }
})

module.exports = ArticleConcepts

