(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\app.js":[function(require,module,exports){
var ArticlesContainer = require('./components/ArticlesContainer')
var ConceptsContainer = require('./components/ConceptsContainer')


ReactDOM.render(
  React.createElement("div", null, 
    React.createElement(ArticlesContainer, null), 
    React.createElement(ConceptsContainer, null)
  )
  , document.getElementById('content'))


var initializersMaterialize = require('./materialize')()
},{"./components/ArticlesContainer":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ArticlesContainer.js","./components/ConceptsContainer":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ConceptsContainer.js","./materialize":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\materialize.js"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ArticleConcepts.js":[function(require,module,exports){
var ArticleConcepts = React.createClass({displayName: "ArticleConcepts",

  render: function(){
    console.log(this.props)
    if (this.props.concepts) {
      var concepts = this.props.concepts.map(function(concept){
      console.log(concept)
        return React.createElement("div", null, concept.concept.label, " ", concept.score);
        });
        return (React.createElement("div", null, 
                concepts
                )
        )
    } else {
      return React.createElement("div", null)
    }
    }
})

module.exports = ArticleConcepts
},{}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ArticlesContainer.js":[function(require,module,exports){
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
var ArticleConcepts = require('./ArticleConcepts')

var ListArticles = React.createClass({displayName: "ListArticles",

  render: function(){
    var articles = this.props.articles.map(function(article){
      return  React.createElement("li", null, 
                React.createElement("div", {className: "collapsible-header"}, article.title), 
                React.createElement("div", {className: "collapsible-body"}, 
                  React.createElement(ArticleConcepts, {concepts: article.concepts})
                )
              );
    });
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, " Recent Articles "), 
          React.createElement("ul", {className: "collapsible popout", "data-collapsible": "accordion"}, 
            articles
          )
      )
    )
  }
})

module.exports = ListArticles

},{"./ArticleConcepts":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ArticleConcepts.js"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ListConcepts.js":[function(require,module,exports){
var ListConcepts = React.createClass({displayName: "ListConcepts",

  render: function(){
    var concepts = Object.keys(this.props.concepts).map(function(concept){

      var conceptId = this.props.concepts[concept]._id
      return  React.createElement("li", null, 
                React.createElement("div", {className: "collapsible-header"}, concept), 
                React.createElement("div", {className: "collapsible-body"}, React.createElement("p", null, "Lorem ipsum dolor sit amet."))
              );
    }.bind(this));
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, " Recent Articles "), 
          React.createElement("ul", {className: "collapsible popout", "data-collapsible": "accordion"}, 
            concepts
          )
      )
    )
  }
})

module.exports = ListConcepts

},{}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\materialize.js":[function(require,module,exports){
module.exports = function() {

    $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  });

};

},{}]},{},["C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\app.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOlxcVXNlcnNcXEFsbGVuXFx3b3Jrc3BhY2VcXHplaXRnb21ldGVyVUlcXHNjcmlwdHNcXGFwcC5qcyIsIkM6XFxVc2Vyc1xcQWxsZW5cXHdvcmtzcGFjZVxcemVpdGdvbWV0ZXJVSVxcc2NyaXB0c1xcY29tcG9uZW50c1xcQXJ0aWNsZUNvbmNlcHRzLmpzIiwiQzpcXFVzZXJzXFxBbGxlblxcd29ya3NwYWNlXFx6ZWl0Z29tZXRlclVJXFxzY3JpcHRzXFxjb21wb25lbnRzXFxBcnRpY2xlc0NvbnRhaW5lci5qcyIsIkM6XFxVc2Vyc1xcQWxsZW5cXHdvcmtzcGFjZVxcemVpdGdvbWV0ZXJVSVxcc2NyaXB0c1xcY29tcG9uZW50c1xcQ29uY2VwdHNDb250YWluZXIuanMiLCJDOlxcVXNlcnNcXEFsbGVuXFx3b3Jrc3BhY2VcXHplaXRnb21ldGVyVUlcXHNjcmlwdHNcXGNvbXBvbmVudHNcXExpc3RBcnRpY2xlcy5qcyIsIkM6XFxVc2Vyc1xcQWxsZW5cXHdvcmtzcGFjZVxcemVpdGdvbWV0ZXJVSVxcc2NyaXB0c1xcY29tcG9uZW50c1xcTGlzdENvbmNlcHRzLmpzIiwiQzpcXFVzZXJzXFxBbGxlblxcd29ya3NwYWNlXFx6ZWl0Z29tZXRlclVJXFxzY3JpcHRzXFxtYXRlcmlhbGl6ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDO0FBQ2pFLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDO0FBQ2pFOztBQUVBLFFBQVEsQ0FBQyxNQUFNO0VBQ2Isb0JBQUEsS0FBSSxFQUFBLElBQUMsRUFBQTtJQUNILG9CQUFDLGlCQUFpQixFQUFBLElBQUUsQ0FBQSxFQUFBO0lBQ3BCLG9CQUFDLGlCQUFpQixFQUFBLElBQUUsQ0FBQTtFQUNoQixDQUFBO0FBQ1IsSUFBSSxRQUFRLENB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QUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUc7OztBQ3RCakIsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXOztJQUV4QixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVU7SUFDNUIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztNQUM1QixTQUFTLEdBQUcsS0FBSztLQUNsQixDQUFDLENBQUM7QUFDUCxHQUFHLENBQUMsQ0FBQzs7Q0FFSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQXJ0aWNsZXNDb250YWluZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvQXJ0aWNsZXNDb250YWluZXInKVxyXG52YXIgQ29uY2VwdHNDb250YWluZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvQ29uY2VwdHNDb250YWluZXInKVxyXG5cclxuXHJcblJlYWN0RE9NLnJlbmRlcihcclxuICA8ZGl2PlxyXG4gICAgPEFydGljbGVzQ29udGFpbmVyLz5cclxuICAgIDxDb25jZXB0c0NvbnRhaW5lci8+XHJcbiAgPC9kaXY+XHJcbiAgLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpKVxyXG5cclxuXHJcbnZhciBpbml0aWFsaXplcnNNYXRlcmlhbGl6ZSA9IHJlcXVpcmUoJy4vbWF0ZXJpYWxpemUnKSgpXHJcbiIsInZhciBBcnRpY2xlQ29uY2VwdHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMpXHJcbiAgICBpZiAodGhpcy5wcm9wcy5jb25jZXB0cykge1xyXG4gICAgICB2YXIgY29uY2VwdHMgPSB0aGlzLnByb3BzLmNvbmNlcHRzLm1hcChmdW5jdGlvbihjb25jZXB0KXtcclxuICAgICAgY29uc29sZS5sb2coY29uY2VwdClcclxuICAgICAgICByZXR1cm4gPGRpdj57Y29uY2VwdC5jb25jZXB0LmxhYmVsfSB7Y29uY2VwdC5zY29yZX08L2Rpdj47XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2PlxyXG4gICAgICAgICAgICAgICAge2NvbmNlcHRzfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIDxkaXY+PC9kaXY+XHJcbiAgICB9XHJcbiAgICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFydGljbGVDb25jZXB0c1xyXG5cclxuIiwidmFyIExpc3RBcnRpY2xlcyA9IHJlcXVpcmUoJy4vTGlzdEFydGljbGVzJylcclxuXHJcbnZhciByZWNlbnRBcnRpY2xlc0FQSSA9IFwiaHR0cDovL3plaXRnb21ldGVyYXBpLmhlcm9rdS5jb20vYXJ0aWNsZS9yZWNlbnRcIlxyXG5cclxudmFyIEFydGljbGVzQ29udGFpbmVyICA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGFydGljbGVzOiBbeyd0aXRsZSc6ICdHYXRoZXJpbmcgQXJ0aWNsZXMsIHBsZWFzZSB3YWl0J31dXHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2VydmVyUmVxdWVzdCA9ICQuZ2V0KHJlY2VudEFydGljbGVzQVBJLCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGFydGljbGVzOiByZXN1bHQuZGF0YVxyXG4gICAgICB9KTtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zZXJ2ZXJSZXF1ZXN0LmFib3J0KCk7XHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDM+IFplaXRnb21ldGVyIDwvaDM+XHJcbiAgICAgICAgPExpc3RBcnRpY2xlcyBhcnRpY2xlcz17dGhpcy5zdGF0ZS5hcnRpY2xlc30gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBcnRpY2xlc0NvbnRhaW5lciIsInZhciBMaXN0Q29uY2VwdHMgPSByZXF1aXJlKCcuL0xpc3RDb25jZXB0cycpXHJcblxyXG52YXIgcG9wdWxhckNvbmNlcHRzQVBJID0gXCJodHRwOi8vemVpdGdvbWV0ZXJhcGkuaGVyb2t1LmNvbS9wb3B1bGFyXCJcclxuXHJcbnZhciBDb25jZXB0c0NvbnRhaW5lciAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjb25jZXB0czogW3sndGl0bGUnOiAnR2F0aGVyaW5nIEFydGljbGVzLCBwbGVhc2Ugd2FpdCd9XVxyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnNlcnZlclJlcXVlc3QgPSAkLmdldChwb3B1bGFyQ29uY2VwdHNBUEksIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgY29uY2VwdHM6IHJlc3VsdC5kYXRhXHJcbiAgICAgIH0pO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG5cclxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnNlcnZlclJlcXVlc3QuYWJvcnQoKTtcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz4gWmVpdGdvbWV0ZXIgQ29uY2VwdHM8L2gzPlxyXG4gICAgICAgIDxMaXN0Q29uY2VwdHMgY29uY2VwdHM9e3RoaXMuc3RhdGUuY29uY2VwdHN9IC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29uY2VwdHNDb250YWluZXIiLCJ2YXIgQXJ0aWNsZUNvbmNlcHRzID0gcmVxdWlyZSgnLi9BcnRpY2xlQ29uY2VwdHMnKVxyXG5cclxudmFyIExpc3RBcnRpY2xlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGFydGljbGVzID0gdGhpcy5wcm9wcy5hcnRpY2xlcy5tYXAoZnVuY3Rpb24oYXJ0aWNsZSl7XHJcbiAgICAgIHJldHVybiAgPGxpPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsYXBzaWJsZS1oZWFkZXJcIj57YXJ0aWNsZS50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2libGUtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICA8QXJ0aWNsZUNvbmNlcHRzIGNvbmNlcHRzPXthcnRpY2xlLmNvbmNlcHRzfS8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2xpPjtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDM+IFJlY2VudCBBcnRpY2xlcyA8L2gzPlxyXG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImNvbGxhcHNpYmxlIHBvcG91dFwiIGRhdGEtY29sbGFwc2libGU9XCJhY2NvcmRpb25cIj5cclxuICAgICAgICAgICAge2FydGljbGVzfVxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMaXN0QXJ0aWNsZXMiLCJ2YXIgTGlzdENvbmNlcHRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgY29uY2VwdHMgPSBPYmplY3Qua2V5cyh0aGlzLnByb3BzLmNvbmNlcHRzKS5tYXAoZnVuY3Rpb24oY29uY2VwdCl7XHJcblxyXG4gICAgICB2YXIgY29uY2VwdElkID0gdGhpcy5wcm9wcy5jb25jZXB0c1tjb25jZXB0XS5faWRcclxuICAgICAgcmV0dXJuICA8bGk+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbGxhcHNpYmxlLWhlYWRlclwiPntjb25jZXB0fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsYXBzaWJsZS1ib2R5XCI+PHA+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQuPC9wPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvbGk+O1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgzPiBSZWNlbnQgQXJ0aWNsZXMgPC9oMz5cclxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjb2xsYXBzaWJsZSBwb3BvdXRcIiBkYXRhLWNvbGxhcHNpYmxlPVwiYWNjb3JkaW9uXCI+XHJcbiAgICAgICAgICAgIHtjb25jZXB0c31cclxuICAgICAgICAgIDwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGlzdENvbmNlcHRzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgJCgnLmNvbGxhcHNpYmxlJykuY29sbGFwc2libGUoe1xyXG4gICAgICBhY2NvcmRpb24gOiBmYWxzZSAvLyBBIHNldHRpbmcgdGhhdCBjaGFuZ2VzIHRoZSBjb2xsYXBzaWJsZSBiZWhhdmlvciB0byBleHBhbmRhYmxlIGluc3RlYWQgb2YgdGhlIGRlZmF1bHQgYWNjb3JkaW9uIHN0eWxlXHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbn07Il19
