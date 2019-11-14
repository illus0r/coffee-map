import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoiZXJvaGluYWVsZW5hIiwiYSI6InNWVFJmZFUifQ.ZjRE101FtM3fXPJiw2Fq9g';

class Map extends Component {
	componentDidMount () {

		let map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/light-v9',
			center: [37.617635, 55.755814],
			minZoom: 9
		});

		this.translate(map)
		this.map=map
		this.zoomThreshold =11
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		let geojsonPoints = this.props.pointsData
		let geojsonConturs = this.props.contursData


		if (geojsonPoints) {
			console.log('geojson^ ', geojsonPoints)

		this.map.on('load', () => {
			// Add the data to your map as a layer
			this.map.addLayer({
				id: 'locations',
				type: 'symbol',
				source: geojsonPoints,
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
			this.map.on('click', 'locations', (e) => {
				let currentFeature = e.features[0]
				this.map.flyTo({
					center: currentFeature.geometry.coordinates,
					zoom: 12
				});
			});
	}

		if (geojsonConturs){
			this.map.on('load', () => {
				this.map.addSource('cafeRating', {
				'type': 'geojson',
				'data': geojsonConturs
			});

				this.map.addLayer({
				'id': 'cafeRating',
				'source': 'cafeRating',
				'type': 'fill',
				'maxzoom': this.zoomThreshold,
				//'filter': ['==', 'isState', true],
				'paint': {
					'fill-color': [
						'interpolate',
						['linear'],
						['get', 'value'],
						0, '#F2F12D',
						10, '#EED322',
						20, '#E6B71E',
						30, '#DA9C20',
						40, '#CA8323',
						50, '#B86B25',
						75, '#A25626',
						85, '#8B4225',
						100, '#723122'
					],
					'fill-opacity': 0.3,
					'fill-outline-color': '#000'
				}
			}, 'waterway-label');
		});
			this.map.on('click', 'cafeRating', (e) => {
				const coordinates  = e.features[0].geometry.coordinates[0]
				debugger
				const bounds = coordinates.reduce(function(bounds, coord) {
					return bounds.extend(coord);
				}, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
				debugger
				this.map.flyTo({
					center: bounds.getCenter(),
					zoom: 12
				});
			});
		}
		createCafePopUp(this.map)
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

function createCafePopUp(map) {

	let popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false
	});

	map.on('mouseenter', 'locations', function(e) {

		let coordinates = e.features[0].geometry.coordinates.slice();
		let description = e.features[0].properties.description;

		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		popup.setLngLat(coordinates)
			.setHTML(description)
			.addTo(map);
	});

	map.on('mouseleave', 'locations', function() {
		popup.remove();
	});
}
