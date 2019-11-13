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

		this.translate(map)
		this.map=map
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		let geojson = this.props.pointsData

		if (geojson) {
			console.log('geojson^ ', geojson)

		this.map.on('load', () => {
			// Add the data to your map as a layer
			this.map.addLayer({
				id: 'locations',
				type: 'symbol',
				source: geojson,
				layout: {
					'icon-image': ['concat', 'cafe', "-15"],
					'text-field': ['get', 'title'],
					'text-font': ["Open Sans Semibold", "Arial Unicode MS Bold"],
					'text-offset': [0, 0.6],
					'text-anchor': 'top',
					'icon-allow-overlap': true,
				}
			});
		});
	}
	}

	//Change language of label layers
	translate(map){
		map.on('styledata', function () {
			let label_layers = map.getStyle().layers
				.filter(el => el.id.includes('-label'))
			let leyer_names = label_layers.map(el => el.id)
			leyer_names.forEach(el => map.setLayoutProperty(el, 'text-field', ['get', 'name_ru']))
		})
	}

	render () {

		return (
			<div id="map" />
		)
	}
}
export default Map;
