(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\app.js":[function(require,module,exports){
var FriendsContainer = React.createClass({displayName: "FriendsContainer",
  getInitialState: function(){
    return {
      name: 'Tyler McGinnis',
      friends: ['Jake Lingwall', 'Murphy Randall', 'Merrick Christensen']
    }
  },
  addFriend: function(friend){
    this.setState({
      friends: this.state.friends.concat([friend])
    });
  },
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, " Name: ", this.state.name, " "), 
        React.createElement(AddFriend, {addNew: this.addFriend}), 
        React.createElement(ShowList, {names: this.state.friends})
      )
    )
  }
});

var AddFriend = React.createClass({displayName: "AddFriend",
  getInitialState: function(){
    return {
      newFriend: ''
    }
  },
  updateNewFriend: function(e){
    this.setState({
      newFriend: e.target.value
    });
  },
  handleAddNew: function(){
    this.props.addNew(this.state.newFriend);
    this.setState({
      newFriend: ''
    });
  },
  render: function(){
    return (
        React.createElement("div", null, 
          React.createElement("input", {type: "text", value: this.state.newFriend, onChange: this.updateNewFriend}), 
          React.createElement("button", {onClick: this.handleAddNew}, " Add Friend ")
        )
    );
  }
});

var ShowList = React.createClass({displayName: "ShowList",
  render: function(){
    var listItems = this.props.names.map(function(friend){
      return React.createElement("li", null, " ", friend, " ");
    });
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, " Friends "), 
        React.createElement("ul", null, 
          listItems
        )
      )
    )
  }
});

ReactDOM.render(React.createElement(FriendsContainer, null), document.getElementById('content'));

},{}]},{},["C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\app.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOlxcVXNlcnNcXEFsbGVuXFx3b3Jrc3BhY2VcXHplaXRnb21ldGVyVUlcXHNjcmlwdHNcXGFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksc0NBQXNDLGdDQUFBO0VBQ3hDLGVBQWUsRUFBRSxVQUFVO0lBQ3pCLE9BQU87TUFDTCxJQUFJLEVBQUUsZ0JBQWdCO01BQ3RCLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsQ0FBQztLQUNwRTtHQUNGO0VBQ0QsU0FBUyxFQUFFLFNBQVMsTUFBTSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUM7TUFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDN0MsQ0FBQyxDQUFDO0dBQ0o7RUFDRCxNQUFNLEVBQUUsVUFBVTtJQUNoQjtNQUNFLG9CQUFBLEtBQUksRUFBQSxJQUFDLEVBQUE7UUFDSCxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLFNBQUEsRUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxHQUFNLENBQUEsRUFBQTtRQUNsQyxvQkFBQyxTQUFTLEVBQUEsQ0FBQSxDQUFDLE1BQUEsRUFBTSxDQUFFLElBQUksQ0FBQyxTQUFVLENBQUEsQ0FBRyxDQUFBLEVBQUE7UUFDckMsb0JBQUMsUUFBUSxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVEsQ0FBQSxDQUFHLENBQUE7TUFDbkMsQ0FBQTtLQUNQO0dBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxJQUFJLCtCQUErQix5QkFBQTtFQUNqQyxlQUFlLEVBQUUsVUFBVTtJQUN6QixPQUFPO01BQ0wsU0FBUyxFQUFFLEVBQUU7S0FDZDtHQUNGO0VBQ0QsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUM7TUFDWixTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO0tBQzFCLENBQUMsQ0FBQztHQUNKO0VBQ0QsWUFBWSxFQUFFLFVBQVU7SUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDO01BQ1osU0FBUyxFQUFFLEVBQUU7S0FDZCxDQUFDLENBQUM7R0FDSjtFQUNELE1BQU0sRUFBRSxVQUFVO0lBQ2hCO1FBQ0ksb0JBQUEsS0FBSSxFQUFBLElBQUMsRUFBQTtVQUNILG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsTUFBQSxFQUFNLENBQUMsS0FBQSxFQUFLLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUMsQ0FBQyxRQUFBLEVBQVEsQ0FBRSxJQUFJLENBQUMsZUFBZ0IsQ0FBQSxDQUFHLENBQUEsRUFBQTtVQUNsRixvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxZQUFjLENBQUEsRUFBQSxjQUFxQixDQUFBO1FBQ3JELENBQUE7TUFDUjtHQUNIO0FBQ0gsQ0FBQyxDQUFDLENBQUM7O0FBRUgsSUFBSSw4QkFBOEIsd0JBQUE7RUFDaEMsTUFBTSxFQUFFLFVBQVU7SUFDaEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsTUFBTSxDQUFDO01BQ25ELE9BQU8sb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxHQUFBLEVBQUUsTUFBTSxFQUFDLEdBQU0sQ0FBQSxDQUFDO0tBQzVCLENBQUMsQ0FBQztJQUNIO01BQ0Usb0JBQUEsS0FBSSxFQUFBLElBQUMsRUFBQTtRQUNILG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsV0FBYyxDQUFBLEVBQUE7UUFDbEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQTtVQUNELFNBQVU7UUFDUixDQUFBO01BQ0QsQ0FBQTtLQUNQO0dBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxRQUFRLENBQUMsTUFBTSxDQUFDLG9CQUFDLGdCQUFnQixFQUFBLElBQUUsQ0FBQSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEZyaWVuZHNDb250YWluZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogJ1R5bGVyIE1jR2lubmlzJyxcclxuICAgICAgZnJpZW5kczogWydKYWtlIExpbmd3YWxsJywgJ011cnBoeSBSYW5kYWxsJywgJ01lcnJpY2sgQ2hyaXN0ZW5zZW4nXVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYWRkRnJpZW5kOiBmdW5jdGlvbihmcmllbmQpe1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGZyaWVuZHM6IHRoaXMuc3RhdGUuZnJpZW5kcy5jb25jYXQoW2ZyaWVuZF0pXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgzPiBOYW1lOiB7dGhpcy5zdGF0ZS5uYW1lfSA8L2gzPlxyXG4gICAgICAgIDxBZGRGcmllbmQgYWRkTmV3PXt0aGlzLmFkZEZyaWVuZH0gLz5cclxuICAgICAgICA8U2hvd0xpc3QgbmFtZXM9e3RoaXMuc3RhdGUuZnJpZW5kc30gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KTtcclxuXHJcbnZhciBBZGRGcmllbmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmV3RnJpZW5kOiAnJ1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdXBkYXRlTmV3RnJpZW5kOiBmdW5jdGlvbihlKXtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBuZXdGcmllbmQ6IGUudGFyZ2V0LnZhbHVlXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGhhbmRsZUFkZE5ldzogZnVuY3Rpb24oKXtcclxuICAgIHRoaXMucHJvcHMuYWRkTmV3KHRoaXMuc3RhdGUubmV3RnJpZW5kKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBuZXdGcmllbmQ6ICcnXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLm5ld0ZyaWVuZH0gb25DaGFuZ2U9e3RoaXMudXBkYXRlTmV3RnJpZW5kfSAvPlxyXG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUFkZE5ld30+IEFkZCBGcmllbmQgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG52YXIgU2hvd0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGxpc3RJdGVtcyA9IHRoaXMucHJvcHMubmFtZXMubWFwKGZ1bmN0aW9uKGZyaWVuZCl7XHJcbiAgICAgIHJldHVybiA8bGk+IHtmcmllbmR9IDwvbGk+O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz4gRnJpZW5kcyA8L2gzPlxyXG4gICAgICAgIDx1bD5cclxuICAgICAgICAgIHtsaXN0SXRlbXN9XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KTtcclxuXHJcblJlYWN0RE9NLnJlbmRlcig8RnJpZW5kc0NvbnRhaW5lci8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpKTsiXX0=
