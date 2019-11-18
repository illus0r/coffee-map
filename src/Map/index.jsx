import React, {Component} from 'react';
import {csv, json}  from 'd3-fetch';
import {interpolateMagma} from 'd3-scale-chromatic';
import Map from './Map';
import List from '../List';
import data from '../data/data_test.csv'
import moscow from '../data/mo.geojson'

class MapContainer extends Component {
    state = {
        points: null,
        conturs: null,
        activeItem: null,
        visiblePoints: null,
        filteredItemsList: [],
    };

    componentDidMount() {
        ///  GET DATA HERE
        // async await вроде не нужен
        csv(data).then((data) => {
            json(moscow).then((geoMoscow) => {
                const geoJSON = makeGeoJSON(data);
                addValues(geoMoscow);
                this.setState({
                    points: geoJSON,
                    conturs: geoMoscow,
                    visiblePoints: geoJSON.data.features,
                    filteredItemsList: geoJSON.data.features
                })
            })

        });
    }

    visiblePointsHandler = (value) => {
        this.setState({visiblePoints: value})
    };

    activeItemHandler = (value) => {
        this.setState({activeItem: value})
    };

    clearActiveItemHandler = () =>{
        this.setState({activeItem: null})
    };

    filteredItemsHandler = (list) => {
        //console.log(this.state.filteredItems, list)
        this.setState({filteredItems: list})
    };


    render() {
        return (
            <div>
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
            </div>
        );
    }
}

function makeGeoJSON(data) {
    const features = data.map((d, i) => {
        //console.log(d['FlampRating'].replace(',', '.'),  1 / +d['FlampRating'], interpolateMagma(1 / +d['FlampRating'].replace(',', '.') || 0))
        let rating = d['FlampRating'].replace(',', '.')

        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [+d['Longitude'], +d['Latitude']]
            },
            properties: {
                id: i,
                title: d['Наименование организации'],
                description: d['Улица'] + ', ' + d['Номер дома'],
                rating: d['FlampRating'],
                color: (rating) ? interpolateMagma(1 / +d['FlampRating'].replace(',', '.')) : 'gray',
            }
        }
        }
    );

    const geoJSON = {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": features,
        }
    };

    return geoJSON
}

function addValues(data) {
    data.features.forEach(feature => {
        feature.properties.value = +(Math.random() * 100).toFixed(2)
    })

}

export default MapContainer;
