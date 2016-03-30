var SearchBar = React.createClass({

    getInitialState: function(){
        return { searchString: '' };
    },

    handleChange: function(e){

        this.setState({searchString:e.target.value});
    },

    handleClick: function(concept){

        this.setState({searchString: ''});
        lookup = this.props.conceptLookup,
        lookup(concept._id)
    },



    render: function() {

        var libraries = this.props.items,
            handleClick = this.handleClick,
            searchString = this.state.searchString.trim().toLowerCase();


        if(libraries == null) {
            libraries = [<li></li>]
        }

        if(searchString.length > 0){

            // We are searching. Filter the results.

            libraries = libraries.filter(function(l){
                return l.label.toLowerCase().match( searchString );
            });

            libraries = libraries.map(function(l){
                return <li onClick={function(){handleClick(l)}}><p> {l.label} </p></li>
            })


        return <div>
                    <input id="conceptSearchbar" className="lime" type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search Concepts" />
                    <ul>
                        {libraries}
                    </ul>
                </div>;
        } else {
           return  <div>
                <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search Concepts" />
                <ul>
                </ul>
            </div>;
        }

    }
});

module.exports = SearchBar