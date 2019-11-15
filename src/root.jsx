import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Map from './Map/index.jsx';
import './styles.scss'


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {selectedPoint: null}
	}

	render () {
		const {selectedPoint} = this.state;
		return (
			<div>
				<Map
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
