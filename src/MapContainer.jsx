import React, {Component} from 'react';
import Map from './Map';
import List from './List';
import * as d3 from 'd3-fetch';
import data from './data_test.csv'
import moscow from './mo.geojson'

class MapContainer extends Component {
    state = {
        points: [],
        conturs: [],
        activeItem: null,
        visiblePoints: null,
        filteredItemsList: [],

    }

    async componentDidMount() {
        ///  GET DATA HERE
        await d3.csv(data).then((data) => {
            d3.json(moscow).then((geoMoscow) => {
                let geoJSON = makeGeoJSON(data)
                addValues(geoMoscow)
                this.setState({points: geoJSON, conturs: geoMoscow, visiblePoints: geoJSON.data.features, filteredItemsList: geoJSON.data.features})
            })

        });
    }

    visiblePointsHandler = (value) => {
        this.setState({visiblePoints: value})
    }

    activeItemHandler = (value) => {
        this.setState({activeItem: value})
    }
    clearActiveItemHandler = () =>{
        this.setState({activeItem: null})
    }

    filteredItemsHandler = (list) => {

        //console.log(this.state.filteredItems, list)
        this.setState({filteredItems: list})
    }


    render() {
        //return "container"
        return (<div>
            <List visiblePoints={this.state.visiblePoints}
                  activeItem={this.activeItemHandler}
                  filteredItems={this.filteredItemsHandler}
                  filteredItemsList={this.state.filteredItems}/>

            <Map pointsData={this.state.points}
                 contursData={this.state.conturs}
                 visiblePoints={this.visiblePointsHandler}
                 activeItem={this.state.activeItem}
                 clearActiveItem={this.clearActiveItemHandler}
                 filteredItemsList={this.state.filteredItems}/>
        </div>);
    }
}

function makeGeoJSON(data) {
    let features = data.map((d,i) => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [+d['Координаты, долгота'], +d['Координаты, широта']]
            },
            properties: {
                id: i,
                title: d['Наименование организации'],
                description: d['Улица'] + ', ' + d['Номер дома'],
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
    data.features.forEach(feature => {
        feature.properties.value = +(Math.random() * 100).toFixed(2)
    })

}

export default MapContainer;
