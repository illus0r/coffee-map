import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './styles.scss'

import MapContainer from "./MapContainer";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {selectedPoint: null}
	}

	render () {
		const {selectedPoint} = this.state;
		return (
			<div>
				<MapContainer
					selectedPoint={selectedPoint}
				/>
			</div>
		)
	}

}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
