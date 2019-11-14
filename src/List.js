import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class List extends Component {

    render() {
        let numbers = this.props.activePoints;
        if (!numbers) numbers = []
        const listItems = numbers.map((number, i) =>
            <li key={i} onClick={()=>this.props.activeItem(number)}>{number.properties.title}</li>
        );

        return ReactDOM.createPortal(
            <ul>{listItems}</ul>,
            document.getElementById('list')
        );
    }
}

export default List;