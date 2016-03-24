var ArticlesContainer = require('./container/ArticlesContainer.jsx')
var ConceptsContainer = require('./container/ConceptsContainer.jsx')
var Navigation = require('./components/Navigation.jsx')

ReactDOM.render(
  <div>
    <Navigation/>
    <div className="container row" >
    <ArticlesContainer/>
    <ConceptsContainer/>
    </div>
  </div>
  , document.getElementById('content'))


