import React, {Component} from 'react';
import ReactDOM from "react-dom";

class CafeCard extends Component {
    constructor(props) {
        super(props);
        const fullInformation = this.props.all.find( el => el['Id карточки'] === this.props.target.properties.rawId)
        this.state = { info: fullInformation};
    }

    handleClose = () => {
        this.props.closeCard();
    }

    componentDidUpdate=(prevProps, prevState, snapshot)=> {
        this.info = this.props.all.find( el => el['Id карточки'] === this.props.target.properties.rawId)
    }

    render() {
        const info = this.state.info
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
