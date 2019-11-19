import React, {Component} from 'react';
import {csv, json}  from 'd3-fetch';
import {interpolateMagma} from 'd3-scale-chromatic';
import {scaleSequential} from 'd3-scale';
import {sum, mean} from 'd3-array';
import {nest} from 'd3-collection';
import Map from './Map';
import List from '../List';
import data from '../data/data_test.csv'
import moscow from '../data/mo.geojson'
import CafeCard from "../CafeCard";
import BarCharts from "../BarCharts";

const getColorMagma =  scaleSequential([3, 5], d => interpolateMagma(d/2+0.25)).clamp(true);

class MapContainer extends Component {
    state = {
        points: null,
        conturs: null,
        activeItem: null,
        currentItem: null,
        visiblePoints: null,
        filteredItemsList: [],
        rawData:[],
        zoomValue:9,
    };

    componentDidMount() {
        ///  GET DATA HERE
        // async await вроде не нужен
        csv(data).then((data) => {
            json(moscow).then((geoMoscow) => {

                const geoJSON = makeGeoJSON(data);

                const regionRating =  nest()
                    .key(d=>d['Район города'])
                    .rollup(els => mean(els, d => (+d['FlampRating'].replace(',', '.') || NaN)))
                    .entries(data);
                addValues(geoMoscow, regionRating);

                this.setState({
                    rawData: data,
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

    selectedPointHandler = (value) => {
        this.setState({currentItem: value})
    };

    activeItemHandler = (value) => {
        this.setState({activeItem: value})
    };

    currentItemHandler = (value) => {
        this.setState({currentItem: value})
    };

    clearActiveItemHandler = () =>{
        this.setState({activeItem: null})
    };

    filteredItemsHandler = (list) => {
        this.setState({filteredItems: list})
    };

    handleClose = () => {
        this.setState({currentItem: null});
        //this.searchHandler("")
    }

    zoomValueHandler = (value) => {
        this.setState({zoomValue: value});
    }


    render() {
        return (
            <div>
                {this.state.currentItem ?
                    <CafeCard target = {this.state.currentItem}
                              all = {this.state.rawData}
                              closeCard = {() => this.handleClose()}
                    /> : null}

                {this.state.zoomValue < 8 ?
                    <BarCharts
                    /> : null}

                <List visiblePoints={this.state.visiblePoints}
                      activeItem={this.activeItemHandler} // to fly on map, it will be null after flight
                      currentItem={this.currentItemHandler} // to open card
                      filteredItems={this.filteredItemsHandler}
                      filteredItemsList={this.state.filteredItems}/>

                <Map pointsData={this.state.points}
                     contursData={this.state.conturs}
                     visiblePoints={this.visiblePointsHandler}
                     activeItem={this.state.activeItem}
                     selectedPoint={this.selectedPointHandler}
                     clearActiveItem={this.clearActiveItemHandler}
                     filteredItemsList={this.state.filteredItems}
                     zoomValue={this.zoomValueHandler}/>
            </div>
        );
    }
}

function makeGeoJSON(data) {
    const features = data.map((d, i) => {
        let rating = +d['FlampRating'].replace(',', '.') || 0
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [+d['Longitude'], +d['Latitude']]
            },
            properties: {
                id: i,
                rawId: d['Id карточки'],
                title: d['Наименование организации'],
                description: d['Улица'] + ', ' + d['Номер дома'],
                rating: rating,
                color: (rating) ? getColorMagma(rating) : 'gray',
            }
        }
        }
    );

    const geoJSON = {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": features.sort((a,b)=>a.properties.rating-b.properties.rating),
        }
    };

    return geoJSON
}

function addValues(data ,rating) {
    data.features.forEach(feature => {
        const rate = rating.find(el => el.key === feature.properties.NAME)
        feature.properties.value = rate ? rate.value : undefined
        feature.properties.color = rate ? getColorMagma(rate.value) : 'gray'

    })
}




export default MapContainer;
