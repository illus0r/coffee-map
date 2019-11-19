import React, {Component} from 'react';
import ReactDOM from "react-dom";

class BarCharts extends Component {


    render() {
        return ReactDOM.createPortal(
            <div className="barCharts">
                Bar Charts
            </div>,
            document.getElementById('barCharts'));
    }
}

export default BarCharts;
