var ArticlesContainer = require('./container/ArticlesContainer.jsx')
var ConceptsContainer = require('./container/ConceptsContainer.jsx')
var Navigation = require('./components/Navigation.jsx')

ReactDOM.render(
  <div>
    <Navigation/>
    <ArticlesContainer/>
    <ConceptsContainer/>
  </div>
  , document.getElementById('content'))


