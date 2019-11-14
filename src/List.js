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

    }

    render() {
        let numbers = this.props.activePoints;
        const searchedText = this.state.searchText.toLowerCase()
        if (searchedText != null && numbers){
            numbers = numbers.filter(cafe => {
                if (cafe) {
                    const cafeName = cafe.properties.title.toLowerCase()
                    const cafeDesc = cafe.properties.description.toLowerCase()
                    return (cafeName.includes(searchedText) || cafeDesc.includes(searchedText))
                }
            })
        }
        if (!numbers) numbers = []
        const listItems = numbers.map((number, i) =>
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