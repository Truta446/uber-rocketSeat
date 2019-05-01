import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections 
        destination={ destination }
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyCvgaWVrtb2ecpQNQ8Ctw6q4eMtj-we7q4"
        strokeWidth={3}
        strokeColor="#222"
    />
);

export default Directions;