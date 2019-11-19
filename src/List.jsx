import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Search from './Filters/Search.jsx'
import FilterEcoFriendly from './Filters/FilterEcoFriendly.jsx'
import FilterOpenNow from './Filters/FilterOpenNow.jsx'
import FilterAverageCheck from './Filters/FilterAverageCheck.jsx'
import lodash from 'lodash';

class List extends Component {
    state = {
        searchText: '',
        isEcoChecked: false,
        isOpenNowChecked: false,
        averageCheckBounds: [-Infinity, +Infinity],
        linesOfList: [],
        clicked: false
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!lodash.isEqual(this.props.visiblePoints, prevProps.visiblePoints)) {
            this.updateLinesOfList();
        }
        else('nothing to update')

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

        const {isEcoChecked, isOpenNowChecked, averageCheckBounds} = this.state;
        const today = new Date();
        const weekDay = today.getDay();
        const currentTimeStr = `${today.getHours()}:${today.getMinutes()}`;
        return linesOfList.filter((item) => {
            const workTime = JSON.parse(item.properties.workTime);
            const workingPeriods = workTime[weekDay - 1];
            const isWorkingNowCheck = !isOpenNowChecked || workingPeriods.some(([from, to]) =>
                to < from && currentTimeStr <= to ||
                from <= currentTimeStr && currentTimeStr <= to
            );
            // + проверка на эко-френдли и цену
            return isWorkingNowCheck;
        })
    }

    updateLinesOfList () {
        const linesOfList = this.getLinesOfList();
        this.setState({linesOfList});
        this.props.filteredItems(linesOfList)
    }

    onSearchTextChange = (e) => {
        const searchText = e.target.value;
        console.log(searchText)
        this.setState(
            {searchText},
            this.updateLinesOfList
        )
    };

    onEcoFilterToggle = () => {
        this.setState(
            ({isEcoChecked}) => ({isEcoChecked: !isEcoChecked}),
            this.updateLinesOfList
        );
    };

    onOpenNowFilterToggle = () => {
        this.setState(
            ({isOpenNowChecked}) => ({isOpenNowChecked: !isOpenNowChecked}),
            this.updateLinesOfList
        );
    };

    onAverageCheckBoundsChange = (averageCheckBounds) => {
        this.setState(
            {averageCheckBounds},
            this.updateLinesOfList
        );
    };

    handleClick = (number) => {
        this.props.activeItem(number)
        this.props.currentItem(number)
        //this.setState({clicked: true, activeItem: number});
        //this.onSearchTextChange(number.properties.title)
    }
/*
    handleClose = () => {
        this.setState({clicked: false});
        this.onSearchTextChange("")
    }*/

    render() {
        const {
            linesOfList,
            isEcoChecked,
            isOpenNowChecked,
            averageCheckBounds
        } = this.state;

        return ReactDOM.createPortal(
            <div className={'sidebar'}>
                {this.state.clicked ?
                    '1':
                    <div>
                        <Search onSearchTextChange={this.onSearchTextChange}/>
                        <FilterEcoFriendly
                            isChecked={isEcoChecked}
                            onToggle={this.onEcoFilterToggle}
                        />
                        <FilterOpenNow
                            isChecked={isOpenNowChecked}
                            onToggle={this.onOpenNowFilterToggle}
                        />
                        {/*<FilterAverageCheck
                            averageCheckBounds={averageCheckBounds}
                            onAverageCheckBoundsChange={this.onAverageCheckBoundsChange}
                        />*/}
                        <ul className={'scrollable'}>
                            {linesOfList.map((number, i) =>
                                <li
                                    className={'listItem'}
                                    key={i}
                                    onClick={() => this.handleClick(number) }
                                >
                                    {number.properties.title}
                                </li>
                            )}
                        </ul>
                    </div>
                }
            </div>,
            document.getElementById('cafeList')
        );
    }
}

export default List;
