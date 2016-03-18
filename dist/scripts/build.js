(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\app.js":[function(require,module,exports){
var ArticlesContainer = require('./components/ArticlesContainer')
var ConceptsContainer = require('./components/ConceptsContainer')


ReactDOM.render(React.createElement("div", null, 
  React.createElement(ArticlesContainer, null), 
  React.createElement(ConceptsContainer, null), " "), document.getElementById('content'))

},{"./components/ArticlesContainer":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ArticlesContainer.js","./components/ConceptsContainer":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ConceptsContainer.js"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ArticlesContainer.js":[function(require,module,exports){
var ListArticles = require('./ListArticles')

var recentArticlesAPI = "http://zeitgometerapi.heroku.com/article/recent"

var ArticlesContainer  = React.createClass({displayName: "ArticlesContainer",

  getInitialState: function() {
    return {
      articles: [{'title': 'Gathering Articles, please wait'}]
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(recentArticlesAPI, function (result) {
      this.setState({
        articles: result.data
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

},{"./ListArticles":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ListArticles.js"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ConceptsContainer.js":[function(require,module,exports){
var ListConcepts = require('./ListConcepts')

var popularConceptsAPI = "http://zeitgometerapi.heroku.com/popular"

var ConceptsContainer  = React.createClass({displayName: "ConceptsContainer",

  getInitialState: function() {
    return {
      concepts: [{'title': 'Gathering Articles, please wait'}]
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(popularConceptsAPI, function (result) {
      this.setState({
        concepts: result.data
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, " Zeitgometer Concepts"), 
        React.createElement(ListConcepts, {concepts: this.state.concepts})
      )
    )
  }
})

module.exports = ConceptsContainer

},{"./ListConcepts":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ListConcepts.js"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ListArticles.js":[function(require,module,exports){
var ListArticles = React.createClass({displayName: "ListArticles",

  render: function(){
    var articles = this.props.articles.map(function(article){
      return React.createElement("li", {key: article.id}, " ", article.title, " ");
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

},{}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ListConcepts.js":[function(require,module,exports){
var ListConcepts = React.createClass({displayName: "ListConcepts",

  render: function(){
    var concepts = Object.keys(this.props.concepts).map(function(concept){

      var conceptId = this.props.concepts[concept]._id
      console.log(conceptId);
      return React.createElement("li", null, " ", concept, " ");
    }.bind(this));
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, " Explore concepts "), 
        React.createElement("ul", null, 
          concepts
        )
      )
    )
  }
})

module.exports = ListConcepts

},{}]},{},["C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\app.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOlxcVXNlcnNcXEFsbGVuXFx3b3Jrc3BhY2VcXHplaXRnb21ldGVyVUlcXHNjcmlwdHNcXGFwcC5qcyIsIkM6XFxVc2Vyc1xcQWxsZW5cXHdvcmtzcGFjZVxcemVpdGdvbWV0ZXJVSVxcc2NyaXB0c1xcY29tcG9uZW50c1xcQXJ0aWNsZXNDb250YWluZXIuanMiLCJDOlxcVXNlcnNcXEFsbGVuXFx3b3Jrc3BhY2VcXHplaXRnb21ldGVyVUlcXHNjcmlwdHNcXGNvbXBvbmVudHNcXENvbmNlcHRzQ29udGFpbmVyLmpzIiwiQzpcXFVzZXJzXFxBbGxlblxcd29ya3NwYWNlXFx6ZWl0Z29tZXRlclVJXFxzY3JpcHRzXFxjb21wb25lbnRzXFxMaXN0QXJ0aWNsZXMuanMiLCJDOlxcVXNlcnNcXEFsbGVuXFx3b3Jrc3BhY2VcXHplaXRnb21ldGVyVUlcXHNjcmlwdHNcXGNvbXBvbmVudHNcXExpc3RDb25jZXB0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDO0FBQ2pFLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDO0FBQ2pFOztBQUVBLFFBQVEsQ0FBQyxNQUFNLENBQUMsb0JBQUEsS0FBSSxFQUFBLElBQUMsRUFBQTtFQUNuQixvQkFBQyxpQkFBaUIsRUFBQSxJQUFFLENBQUEsRUFBQTtFQUNwQixvQkFBQyxpQkFBaUIsRUFBQSxJQUFFLENBQUEsRUFBQSxHQUFPLENBQUEsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQzs7O0FDTmpFLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQzs7QUFFNUMsSUFBSSxpQkFBaUIsR0FBRyxpREFBaUQ7O0FBRXpFLElBQUksd0NBQXdDLGlDQUFBOztFQUUxQyxlQUFlLEVBQUUsV0FBVztJQUMxQixPQUFPO01BQ0wsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztLQUN6RCxDQUFDO0FBQ04sR0FBRzs7RUFFRCxpQkFBaUIsRUFBRSxXQUFXO0lBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLE1BQU0sRUFBRTtNQUM5RCxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ1osUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJO09BQ3RCLENBQUMsQ0FBQztLQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbEIsR0FBRzs7RUFFRCxvQkFBb0IsRUFBRSxXQUFXO0lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDL0IsR0FBRzs7RUFFRCxNQUFNLEVBQUUsVUFBVTtJQUNoQjtNQUNFLG9CQUFBLEtBQUksRUFBQSxJQUFDLEVBQUE7UUFDSCxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLGVBQWtCLENBQUEsRUFBQTtRQUN0QixvQkFBQyxZQUFZLEVBQUEsQ0FBQSxDQUFDLFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUFBLENBQUcsQ0FBQTtNQUMzQyxDQUFBO0tBQ1A7R0FDRjtBQUNILENBQUMsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHOzs7QUNsQ2pCLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQzs7QUFFNUMsSUFBSSxrQkFBa0IsR0FBRywwQ0FBMEM7O0FBRW5FLElBQUksd0NBQXdDLGlDQUFBOztFQUUxQyxlQUFlLEVBQUUsV0FBVztJQUMxQixPQUFPO01BQ0wsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztLQUN6RCxDQUFDO0FBQ04sR0FBRzs7RUFFRCxpQkFBaUIsRUFBRSxXQUFXO0lBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLE1BQU0sRUFBRTtNQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ1osUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJO09BQ3RCLENBQUMsQ0FBQztLQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbEIsR0FBRzs7RUFFRCxvQkFBb0IsRUFBRSxXQUFXO0lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDL0IsR0FBRzs7RUFFRCxNQUFNLEVBQUUsVUFBVTtJQUNoQjtNQUNFLG9CQUFBLEtBQUksRUFBQSxJQUFDLEVBQUE7UUFDSCxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLHVCQUEwQixDQUFBLEVBQUE7UUFDOUIsb0JBQUMsWUFBWSxFQUFBLENBQUEsQ0FBQyxRQUFBLEVBQVEsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVMsQ0FBQSxDQUFHLENBQUE7TUFDM0MsQ0FBQTtLQUNQO0dBQ0Y7QUFDSCxDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRzs7O0FDbENqQixJQUFJLGtDQUFrQyw0QkFBQTs7RUFFcEMsTUFBTSxFQUFFLFVBQVU7SUFDaEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsT0FBTyxDQUFDO01BQ3RELE9BQU8sb0JBQUEsSUFBRyxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBRSxPQUFPLENBQUMsRUFBSSxDQUFBLEVBQUEsR0FBQSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUMsR0FBTSxDQUFBLENBQUM7S0FDcEQsQ0FBQyxDQUFDO0lBQ0g7TUFDRSxvQkFBQSxLQUFJLEVBQUEsSUFBQyxFQUFBO1FBQ0gsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxtQkFBc0IsQ0FBQSxFQUFBO1FBQzFCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUE7VUFDRCxRQUFTO1FBQ1AsQ0FBQTtNQUNELENBQUE7S0FDUDtHQUNGO0FBQ0gsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUc7OztBQ2pCakIsSUFBSSxrQ0FBa0MsNEJBQUE7O0VBRXBDLE1BQU0sRUFBRSxVQUFVO0FBQ3BCLElBQUksSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLE9BQU8sQ0FBQzs7TUFFbkUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRztNQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO01BQ3ZCLE9BQU8sb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxHQUFBLEVBQUUsT0FBTyxFQUFDLEdBQU0sQ0FBQSxDQUFDO0tBQzdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDZDtNQUNFLG9CQUFBLEtBQUksRUFBQSxJQUFDLEVBQUE7UUFDSCxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLG9CQUF1QixDQUFBLEVBQUE7UUFDM0Isb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQTtVQUNELFFBQVM7UUFDUCxDQUFBO01BQ0QsQ0FBQTtLQUNQO0dBQ0Y7QUFDSCxDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQXJ0aWNsZXNDb250YWluZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvQXJ0aWNsZXNDb250YWluZXInKVxyXG52YXIgQ29uY2VwdHNDb250YWluZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvQ29uY2VwdHNDb250YWluZXInKVxyXG5cclxuXHJcblJlYWN0RE9NLnJlbmRlcig8ZGl2PlxyXG4gIDxBcnRpY2xlc0NvbnRhaW5lci8+XHJcbiAgPENvbmNlcHRzQ29udGFpbmVyLz4gPC9kaXY+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpKSIsInZhciBMaXN0QXJ0aWNsZXMgPSByZXF1aXJlKCcuL0xpc3RBcnRpY2xlcycpXHJcblxyXG52YXIgcmVjZW50QXJ0aWNsZXNBUEkgPSBcImh0dHA6Ly96ZWl0Z29tZXRlcmFwaS5oZXJva3UuY29tL2FydGljbGUvcmVjZW50XCJcclxuXHJcbnZhciBBcnRpY2xlc0NvbnRhaW5lciAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhcnRpY2xlczogW3sndGl0bGUnOiAnR2F0aGVyaW5nIEFydGljbGVzLCBwbGVhc2Ugd2FpdCd9XVxyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnNlcnZlclJlcXVlc3QgPSAkLmdldChyZWNlbnRBcnRpY2xlc0FQSSwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBhcnRpY2xlczogcmVzdWx0LmRhdGFcclxuICAgICAgfSk7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2VydmVyUmVxdWVzdC5hYm9ydCgpO1xyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgzPiBaZWl0Z29tZXRlciA8L2gzPlxyXG4gICAgICAgIDxMaXN0QXJ0aWNsZXMgYXJ0aWNsZXM9e3RoaXMuc3RhdGUuYXJ0aWNsZXN9IC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXJ0aWNsZXNDb250YWluZXIiLCJ2YXIgTGlzdENvbmNlcHRzID0gcmVxdWlyZSgnLi9MaXN0Q29uY2VwdHMnKVxyXG5cclxudmFyIHBvcHVsYXJDb25jZXB0c0FQSSA9IFwiaHR0cDovL3plaXRnb21ldGVyYXBpLmhlcm9rdS5jb20vcG9wdWxhclwiXHJcblxyXG52YXIgQ29uY2VwdHNDb250YWluZXIgID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY29uY2VwdHM6IFt7J3RpdGxlJzogJ0dhdGhlcmluZyBBcnRpY2xlcywgcGxlYXNlIHdhaXQnfV1cclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zZXJ2ZXJSZXF1ZXN0ID0gJC5nZXQocG9wdWxhckNvbmNlcHRzQVBJLCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGNvbmNlcHRzOiByZXN1bHQuZGF0YVxyXG4gICAgICB9KTtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zZXJ2ZXJSZXF1ZXN0LmFib3J0KCk7XHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDM+IFplaXRnb21ldGVyIENvbmNlcHRzPC9oMz5cclxuICAgICAgICA8TGlzdENvbmNlcHRzIGNvbmNlcHRzPXt0aGlzLnN0YXRlLmNvbmNlcHRzfSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbmNlcHRzQ29udGFpbmVyIiwidmFyIExpc3RBcnRpY2xlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGFydGljbGVzID0gdGhpcy5wcm9wcy5hcnRpY2xlcy5tYXAoZnVuY3Rpb24oYXJ0aWNsZSl7XHJcbiAgICAgIHJldHVybiA8bGkga2V5PXthcnRpY2xlLmlkfT4ge2FydGljbGUudGl0bGV9IDwvbGk+O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz4gUmVjZW50IEFydGljbGVzIDwvaDM+XHJcbiAgICAgICAgPHVsPlxyXG4gICAgICAgICAge2FydGljbGVzfVxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGlzdEFydGljbGVzIiwidmFyIExpc3RDb25jZXB0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGNvbmNlcHRzID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5jb25jZXB0cykubWFwKGZ1bmN0aW9uKGNvbmNlcHQpe1xyXG5cclxuICAgICAgdmFyIGNvbmNlcHRJZCA9IHRoaXMucHJvcHMuY29uY2VwdHNbY29uY2VwdF0uX2lkXHJcbiAgICAgIGNvbnNvbGUubG9nKGNvbmNlcHRJZCk7XHJcbiAgICAgIHJldHVybiA8bGk+IHtjb25jZXB0fSA8L2xpPjtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz4gRXhwbG9yZSBjb25jZXB0cyA8L2gzPlxyXG4gICAgICAgIDx1bD5cclxuICAgICAgICAgIHtjb25jZXB0c31cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RDb25jZXB0cyJdfQ==
