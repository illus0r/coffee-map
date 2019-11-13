import React, {Component} from 'react';
import Map from './Map';
import * as d3 from 'd3-fetch';
import data from './data_test.csv'
import moscow from './mo.geojson'

class MapContainer extends Component {
    state = {
        points: []
    }

    async componentDidMount() {
        ///  GET DATA HERE
        await d3.csv(data).then((data) => {
            d3.json(moscow).then((geoMoscow) => {
                let geoJSON = makeGeoJSON(data)
                addValues(geoMoscow)

                this.setState({points: geoJSON, conturs:geoMoscow})
            })

        });


    }


    render() {
        //return "container"
        return (<Map pointsData={this.state.points} contursData={this.state.conturs}/>);
    }
}

function makeGeoJSON(data) {
    let features = data.map(d => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [+d['Координаты, долгота'], +d['Координаты, широта']]
            },
            properties: {
                title: d['Наименование организации'],
                description: d['Улица']+', '+d['Номер дома']
            }
        }
    })

    let geoJSON = {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": features,
        }
    }

    return geoJSON
}

function addValues(data) {
    data.features.forEach (feature =>{
        feature.properties.value=+(Math.random()*100).toFixed(2)
    })

}

export default MapContainer;
