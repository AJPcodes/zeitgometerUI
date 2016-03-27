var SearchBar = React.createClass({

    getInitialState: function(){
        return { searchString: '' };
    },

    handleChange: function(e){

        // If you comment out this line, the text box will not change its value.
        // This is because in React, an input cannot change independently of the value
        // that was assigned to it. In our case this is this.state.searchString.

        this.setState({searchString:e.target.value});
    },

    handleClick: function(concept){

        lookup = this.props.conceptLookup,
        lookup(concept._id)
    },



    render: function() {

        var libraries = this.props.items,
            handleClick = this.handleClick,
            searchString = this.state.searchString.trim().toLowerCase();


        if(libraries == null) {
            libraries = [<li> Loading Dictionary </li>]
        }

        if(searchString.length > 0){

            // We are searching. Filter the results.

            libraries = libraries.filter(function(l){
                return l.label.toLowerCase().match( searchString );
            });

            libraries = libraries.map(function(l){
                return <li onClick={function(){handleClick(l)}}>{l.label} </li>
            })


        return <div>
                    <input className="lime" type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search Concepts" />
                    <ul>
                        {libraries}
                    </ul>
                </div>;
        } else {
           return  <div>
                <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search Concepts" />
                <ul>
                    <li>Loading Dictionary</li>
                </ul>
            </div>;
        }

    }
});

module.exports = SearchBar