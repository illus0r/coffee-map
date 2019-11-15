import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Search from './Search'

class List extends Component {
    state={
        searchText:"",
    }

    searchHandler = (value) =>{
        this.setState({searchText: value})
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (JSON.stringify(prevProps.filteredItemsList) != JSON.stringify(this.numbers) ) {
            this.props.filteredItems(this.numbers)
            if (!this.numbers)  this.props.filteredItems(this.props.visiblePoints)
        }

        if (prevProps.filteredItemsList==undefined &&  this.props.filteredItemsList==undefined ) {
            this.props.filteredItems(this.numbers)
        }

    }


    render() {
        let linesOfList = this.props.visiblePoints;
        const searchedText = this.state.searchText.toLowerCase()
        if (searchedText != null && linesOfList){
            linesOfList = linesOfList.filter(cafe => {
                if (cafe) {
                    const cafeName = cafe.properties.title.toLowerCase()
                    const cafeDesc = cafe.properties.description.toLowerCase()
                    return (cafeName.includes(searchedText) || cafeDesc.includes(searchedText))
                }
            })
        }
        if (!linesOfList) linesOfList = []
        this.numbers = linesOfList

        const listItems = linesOfList.map((number, i) =>
            <li key={i} onClick={()=>this.props.activeItem(number)}>{number.properties.title}</li>
        );

        return ReactDOM.createPortal(
            <div>
                <Search searchText={this.searchHandler}/>
                <ul>{listItems}</ul>
            </div>,
            document.getElementById('list')
        );
    }
}

export default List;