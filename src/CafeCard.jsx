import React, {Component} from 'react';

class CafeCard extends Component {
    handleClose = () => {
        this.props.closeCard();
    }

    render() {
        return (
            <div className="cafeCard">
                Cafe Card
                <a onClick = {this.handleClose} className={'closeBtn'}> Close </a><br />
                {this.props.content.properties.title}
                {this.props.content.properties.description}
            </div>
        );
    }
}

export default CafeCard;
