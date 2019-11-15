import React, {Component} from 'react';

class Search extends Component {
    handleInputChange  = (event) => {
        this.props.searchText(event.target.value)
    };

    render() {
        return (
            <div className="searchbar">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    onChange={this.handleInputChange}
                />
            </div>
        );
    }
}

export default Search;
