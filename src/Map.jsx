import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXJvaGluYWVsZW5hIiwiYSI6InNWVFJmZFUifQ.ZjRE101FtM3fXPJiw2Fq9g';

class Map extends Component {
	componentDidMount () {
		let map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [37.617635, 55.755814],
			minZoom: 9
		});

		map.on('styledata', function () {
			let label_layers = map.getStyle().layers
				.filter(el => el.id.includes('-label'))
			let leyer_names = label_layers.map(el => el.id)
			leyer_names.forEach(el => map.setLayoutProperty(el, 'text-field', ['get', 'name_ru']))
		})

		this.map=map

	}
	render () {
		return (
			<div id="map" />
		)
	}
}
export default Map;
