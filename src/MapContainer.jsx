import React, {Component} from 'react';
import Map from './Map';
import * as d3 from 'd3-fetch';
import data from './data_test.csv'

class MapContainer extends Component {
    state = {
        points: []
    }

    async componentDidMount() {
        ///  GET DATA HERE
        await d3.csv(data).then((data) => {

            let geoJSON = makeGeoJSON(data)

            this.setState({points: geoJSON})
        });


    }


    render() {
        //return "container"
        return (<Map pointsData={this.state.points}/>);
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
                description: 'Washington, D.C.'
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

export default MapContainer;
