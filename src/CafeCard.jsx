import React, {Component} from 'react';
import ReactDOM from "react-dom";
import closeBtn from './img/close.svg'

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
                <div className='cafeCard--header'>{this.props.target.properties.title}</div>
                <div className='cafeCard--closeBtn' onClick = {this.handleClose}><img src={closeBtn} width="19" height="18" /></div>


                {this.props.target.properties.description}
                <div>{info['FlampRating']}</div>
            </div>,
        document.getElementById('cafeCard'));
    }
}

export default CafeCard;
