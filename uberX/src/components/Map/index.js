import React, { Component, Fragment } from 'react';
import { View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Search from '../Search';
import Directions from '../Directions';
import { getPixelSize } from '../../helpers/utils';
import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';
import { LocationBox,   LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall, Back } from './styles';
import Geocoder from 'react-native-geocoding';
import Details from '../Details'

Geocoder.init("AIzaSyCvgaWVrtb2ecpQNQ8Ctw6q4eMtj-we7q4");

export default class Map extends Component {
    state = {
        region: null,
        destination: null,
        duration: null,
        location: null
    };

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            async ({coords: {latitude, longitude}}) => {
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(','));

                this.setState({
                    location,
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }
                })
            }, //sucesso
            () => {}, //erro
            {
                timeout: 2000, //2s para tentativa
                enabledHighAccuracy: true, //localização via GPS
                maximunAge: 1000 //cache
            }
        );
    }

    handleLocationSelected = (data, { geometry }) => {
        const {
            location: { lat: latitude, lng: longitude }
        } = geometry;

        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        })
    };

    handleBack = () => {
        this.setState({ destination: null });
    };

    render() {
        const { region, destination, duration, location } = this.state;

        return(
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{ flex: 1 }}
                    region={ region } 
                    showsUserLocation
                    loadingEnabled
                    ref={ el => this.mapView = el }
                >
                    { destination && (
                        <Fragment>
                            <Directions
                                origin={ region }
                                destination={ destination }
                                onReady={ result => {
                                    this.setState({ duration: Math.floor(result.duration) })
                                    this.mapView.fitToCoordinates(result.coordinates, {
                                        right: getPixelSize(50),
                                        left: getPixelSize(50),
                                        top: getPixelSize(50),
                                        bottom: getPixelSize(50)
                                    })
                                } }
                            />
                            <Marker
                                coordinate={ destination }
                                archor={{ x: 0, y: 0 }}
                                image={markerImage}
                            >
                                <LocationBox>
                                    <LocationText>{ destination.title }</LocationText>
                                </LocationBox>
                            </Marker>

                            <Marker
                                coordinate={ region }
                                archor={{ x: 0, y: 0 }}
                            >
                                <LocationBox>
                                    <LocationTimeBox>
                                        <LocationTimeText>{ duration }</LocationTimeText>
                                        <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                                    </LocationTimeBox>
                                    <LocationText>{ location }</LocationText>
                                </LocationBox>
                            </Marker>
                        </Fragment>
                    ) }
                </MapView>
                
                { destination ?
                    <Fragment>
                        <Back onPress={ this.handleBack }>
                            <Image source={ backImage } />
                        </Back>
                        <Details />
                    </Fragment> :
                    <Search onLocationSelected={ this.handleLocationSelected } />
                }
            </View>
        );
    }
};