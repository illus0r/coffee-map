import React, {Component} from 'react';
import ReactDOM from "react-dom";

class CafeCard extends Component {
    handleClose = () => {
        this.props.closeCard();
    }

    render() {
        const info = this.props.all.find( el => el['Id карточки'] === this.props.target.properties.rawId)
        return ReactDOM.createPortal(
            <div className="cafeCard">
                Cafe Card
                <a onClick = {this.handleClose} className={'closeBtn'}> Close </a><br />
                {this.props.target.properties.title}
                {this.props.target.properties.description}
                <div>{info['FlampRating']}</div>
            </div>,
        document.getElementById('cafeCard'));
    }
}

export default CafeCard;
