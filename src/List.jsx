import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx'
import CafeCard from './CafeCard.jsx'
import lodash from 'lodash';

class List extends Component {
    state = {
        searchText: '',
        linesOfList: [],
        clicked: false
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

    handleClick = (number) => {
        this.props.activeItem(number)
        this.setState({clicked: true, activeItem: number});
        this.searchHandler(number.properties.title)
    }

    handleClose = () => {
        this.setState({clicked: false});
        this.searchHandler("")
    }

    render() {
        const {linesOfList} = this.state;

        return ReactDOM.createPortal(
            <div className={'sidebar'}>
                {this.state.clicked ?
                    <CafeCard content={this.state.activeItem}
                              closeCard={() => this.handleClose()}
                    /> :
                    <div><Search
                        style={{display: this.state.clicked ? 'none' : null}}
                        searchText={this.searchHandler}
                    /><ul>
                    {linesOfList.map((number, i) =>
                        <li
                            key={i}
                            onClick={() => this.handleClick(number) }
                        >
                            {number.properties.title}
                        </li>
                    )}
                    </ul></div>
                }
            </div>,
            document.getElementById('list')
        );
    }
}

export default List;
