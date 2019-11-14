import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language'

mapboxgl.accessToken = 'pk.eyJ1IjoiZXJvaGluYWVsZW5hIiwiYSI6InNWVFJmZFUifQ.ZjRE101FtM3fXPJiw2Fq9g';

class Map extends Component {
    componentDidMount() {

        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v9',
            center: [37.617635, 55.755814],
            minZoom: 9
        });

        this.translate(map)
        this.map = map
        this.zoomThreshold = 11
        console.log(this.props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //do it once
        if (prevProps.pointsData != this.props.pointsData && prevProps.contursData != this.props.contursData) {
            let geojsonPoints = this.props.pointsData
            let geojsonConturs = this.props.contursData


            if (geojsonPoints) {
                //console.log('geojson^ ', geojsonPoints)

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
                            "text-size": {
                                "stops": [
                                    [0, 0],
                                    [10, 0],
                                    [14, 20]
                                ]
                            },
                            'icon-allow-overlap': true,
                            'text-allow-overlap':true,
                        }
                    });
                });
                this.map.on('click', 'locations', (e) => {
                    let currentFeature = e.features[0]
                    this.map.flyTo({
                        center: currentFeature.geometry.coordinates,
                        zoom: 11
                    });
                });
            }

            if (geojsonConturs) {
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
                    const coordinates = e.features[0].geometry.coordinates[0]
                    const bounds = coordinates.reduce(function (bounds, coord) {
                        return bounds.extend(coord);
                    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
                    this.map.flyTo({
                        center: bounds.getCenter(),
                        zoom: 11
                    });
                });
            }
            createCafePopUp(this.map)


            this.map.on('moveend', () => {
                var features = this.map.queryRenderedFeatures({layers: ['locations']});
                if (features) {
                    //var uniqueFeatures = getUniqueFeatures(features, "iata_code");
                    this.props.activePoints(features)
                }
            });
        }

        if (this.props.activeItem){
            this.map.flyTo({
                center: this.props.activeItem.geometry.coordinates,
                speed: 3,
                zoom: 13
            });
            this.props.clearActiveItem()
        }
    }

    //Change language of label layers
    translate(mapa) {
        mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js');
        mapa.addControl(new MapboxLanguage({
            defaultLanguage: 'ru'
        }));
    }

    render() {
        return (<div id="map"/>)
    }
}

export default Map;

function createCafePopUp(map) {

    let popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'locations', function (e) {

        let coordinates = e.features[0].geometry.coordinates.slice();
        let description = e.features[0].properties.description;
        let title = e.features[0].properties.title;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup.setLngLat(coordinates)
            .setHTML(title + '<br>' +description)
            .addTo(map);
    });

    map.on('mouseleave', 'locations', function () {
        popup.remove();
    });
}
