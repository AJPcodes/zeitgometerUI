(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\app.js":[function(require,module,exports){
var ArticlesContainer = require('./components/ArticlesContainer')


ReactDOM.render(React.createElement(ArticlesContainer, null), document.getElementById('content'))

},{"./components/ArticlesContainer":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ArticlesContainer.js"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ArticlesContainer.js":[function(require,module,exports){
var ListArticles = require('./ListArticles')

var recentArticlesAPI = "http://zeitgometerapi.heroku.com/article/recent"

var ArticlesContainer  = React.createClass({displayName: "ArticlesContainer",

  getInitialState: function() {
    return {
      articles: [],
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(recentArticlesAPI, function (result) {
      this.setState({
        articles: result.data,
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, " Zeitgometer "), 
        React.createElement(ListArticles, {articles: this.state.articles})
      )
    )
  }
})

module.exports = ArticlesContainer

},{"./ListArticles":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ListArticles.js"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ListArticles.js":[function(require,module,exports){
var ListArticles = React.createClass({displayName: "ListArticles",

  render: function(){
    var articles = this.props.articles.map(function(article){
      return React.createElement("li", null, " ", article.title, " ");
    });
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, " Recent Articles "), 
        React.createElement("ul", null, 
          articles
        )
      )
    )
  }
})

module.exports = ListArticles

},{}]},{},["C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\app.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOlxcVXNlcnNcXEFsbGVuXFx3b3Jrc3BhY2VcXHplaXRnb21ldGVyVUlcXHNjcmlwdHNcXGFwcC5qcyIsIkM6XFxVc2Vyc1xcQWxsZW5cXHdvcmtzcGFjZVxcemVpdGdvbWV0ZXJVSVxcc2NyaXB0c1xcY29tcG9uZW50c1xcQXJ0aWNsZXNDb250YWluZXIuanMiLCJDOlxcVXNlcnNcXEFsbGVuXFx3b3Jrc3BhY2VcXHplaXRnb21ldGVyVUlcXHNjcmlwdHNcXGNvbXBvbmVudHNcXExpc3RBcnRpY2xlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDO0FBQ2pFOztBQUVBLFFBQVEsQ0FBQyxNQUFNLENBQUMsb0JBQUMsaUJBQWlCLEVBQUEsSUFBRSxDQUFBLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7OztBQ0h4RSxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7O0FBRTVDLElBQUksaUJBQWlCLEdBQUcsaURBQWlEOztBQUV6RSxJQUFJLHdDQUF3QyxpQ0FBQTs7RUFFMUMsZUFBZSxFQUFFLFdBQVc7SUFDMUIsT0FBTztNQUNMLFFBQVEsRUFBRSxFQUFFO0tBQ2IsQ0FBQztBQUNOLEdBQUc7O0VBRUQsaUJBQWlCLEVBQUUsV0FBVztJQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxNQUFNLEVBQUU7TUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNaLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSTtPQUN0QixDQUFDLENBQUM7S0FDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLEdBQUc7O0VBRUQsb0JBQW9CLEVBQUUsV0FBVztJQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQy9CLEdBQUc7O0VBRUQsTUFBTSxFQUFFLFVBQVU7SUFDaEI7TUFDRSxvQkFBQSxLQUFJLEVBQUEsSUFBQyxFQUFBO1FBQ0gsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxlQUFrQixDQUFBLEVBQUE7UUFDdEIsb0JBQUMsWUFBWSxFQUFBLENBQUEsQ0FBQyxRQUFBLEVBQVEsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVMsQ0FBQSxDQUFHLENBQUE7TUFDM0MsQ0FBQTtLQUNQO0dBQ0Y7QUFDSCxDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRzs7O0FDbENqQixJQUFJLGtDQUFrQyw0QkFBQTs7RUFFcEMsTUFBTSxFQUFFLFVBQVU7SUFDaEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsT0FBTyxDQUFDO01BQ3RELE9BQU8sb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxHQUFBLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBQyxHQUFNLENBQUEsQ0FBQztLQUNuQyxDQUFDLENBQUM7SUFDSDtNQUNFLG9CQUFBLEtBQUksRUFBQSxJQUFDLEVBQUE7UUFDSCxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLG1CQUFzQixDQUFBLEVBQUE7UUFDMUIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQTtVQUNELFFBQVM7UUFDUCxDQUFBO01BQ0QsQ0FBQTtLQUNQO0dBQ0Y7QUFDSCxDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQXJ0aWNsZXNDb250YWluZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvQXJ0aWNsZXNDb250YWluZXInKVxyXG5cclxuXHJcblJlYWN0RE9NLnJlbmRlcig8QXJ0aWNsZXNDb250YWluZXIvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSkiLCJ2YXIgTGlzdEFydGljbGVzID0gcmVxdWlyZSgnLi9MaXN0QXJ0aWNsZXMnKVxyXG5cclxudmFyIHJlY2VudEFydGljbGVzQVBJID0gXCJodHRwOi8vemVpdGdvbWV0ZXJhcGkuaGVyb2t1LmNvbS9hcnRpY2xlL3JlY2VudFwiXHJcblxyXG52YXIgQXJ0aWNsZXNDb250YWluZXIgID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXJ0aWNsZXM6IFtdLFxyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnNlcnZlclJlcXVlc3QgPSAkLmdldChyZWNlbnRBcnRpY2xlc0FQSSwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBhcnRpY2xlczogcmVzdWx0LmRhdGEsXHJcbiAgICAgIH0pO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG5cclxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnNlcnZlclJlcXVlc3QuYWJvcnQoKTtcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz4gWmVpdGdvbWV0ZXIgPC9oMz5cclxuICAgICAgICA8TGlzdEFydGljbGVzIGFydGljbGVzPXt0aGlzLnN0YXRlLmFydGljbGVzfSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFydGljbGVzQ29udGFpbmVyIiwidmFyIExpc3RBcnRpY2xlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGFydGljbGVzID0gdGhpcy5wcm9wcy5hcnRpY2xlcy5tYXAoZnVuY3Rpb24oYXJ0aWNsZSl7XHJcbiAgICAgIHJldHVybiA8bGk+IHthcnRpY2xlLnRpdGxlfSA8L2xpPjtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDM+IFJlY2VudCBBcnRpY2xlcyA8L2gzPlxyXG4gICAgICAgIDx1bD5cclxuICAgICAgICAgIHthcnRpY2xlc31cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RBcnRpY2xlcyJdfQ==
