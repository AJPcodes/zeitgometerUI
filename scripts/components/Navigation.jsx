var Navigation = React.createClass({

  render: function(){

    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Zeitgometer</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="#articlesTop">Articles</a></li>
            <li><a href="#conceptsTop">Concepts</a></li>
          </ul>
        </div>
      </nav>
    )
  }
})

module.exports = Navigation





