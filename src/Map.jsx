import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXJvaGluYWVsZW5hIiwiYSI6InNWVFJmZFUifQ.ZjRE101FtM3fXPJiw2Fq9g';

class Map extends Component {
	componentDidMount () {
		this.map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [37.617635, 55.755814],
			minZoom: 9
		});
	}
	render () {
		return (
			<div id="map" />
		)
	}
}
export default Map;
