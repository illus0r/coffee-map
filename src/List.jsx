import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx'
import lodash from 'lodash';

class List extends Component {
    state = {
        searchText: '',
        linesOfList: []
    };

    searchHandler = (value) => {
        this.setState(
            {searchText: value},
            () => {
                const linesOfList = this.getLinesOfList();
                this.updateLinesOfList(linesOfList)
            }
        )
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!lodash.isEqual(this.props.visiblePoints, prevProps.visiblePoints)) {
            const linesOfList = this.getLinesOfList();
            this.updateLinesOfList(linesOfList);
        }

    }

    getLinesOfList() {
        let linesOfList = this.props.visiblePoints;
        const searchedText = this.state.searchText.toLowerCase();
        if (searchedText != null && linesOfList){
            linesOfList = linesOfList.filter(cafe => {
                if (cafe) {
                    const cafeName = cafe.properties.title.toLowerCase();
                    const cafeDesc = cafe.properties.description.toLowerCase();
                    return (cafeName.includes(searchedText) || cafeDesc.includes(searchedText))
                }
            })
        }
        if (!linesOfList) linesOfList = [];
        return linesOfList;
    }

    updateLinesOfList (linesOfList) {
        this.setState({linesOfList});
        this.props.filteredItems(linesOfList)
    }

    render() {
        const {linesOfList} = this.state;

        return ReactDOM.createPortal(
            <div>
                <Search searchText={this.searchHandler}/>
                <ul>
                    {linesOfList.map((number, i) =>
                        <li
                            key={i}
                            onClick={() => this.props.activeItem(number)}
                        >
                            {number.properties.title}
                        </li>
                    )}
                </ul>
            </div>,
            document.getElementById('list')
        );
    }
}

export default List;
