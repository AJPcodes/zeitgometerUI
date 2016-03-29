var Navigation = React.createClass({

  render: function(){

    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Zeitgometer</a>
            <ul id="nav-mobile" className="right">
              <li><a href="#articlesTop">Articles</a></li>
              <li><a href="#conceptsTop">Concepts</a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
})

module.exports = Navigation





