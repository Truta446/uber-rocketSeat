import React, { Component } from 'react';
import { Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default class Search extends Component {
    state = {
        searchFocused: false
    }
    
    render() {
        const { searchFocused } = this.state;
        const { onLocationSelected } = this.props;

        return (
            <GooglePlacesAutocomplete
                placeholder="Para onde?"
                placeholderTextColor="#333"
                onPress={ onLocationSelected }
                query={{
                    key: "AIzaSyCvgaWVrtb2ecpQNQ8Ctw6q4eMtj-we7q4",
                    language: "pt"
                }}
                textInputProps={{
                    onFocus: () => { this.setState({ searchFocused: true }) },
                    onFocus: () => { this.setState({ searchFocused: false }) },
                    autoCapitalize: "none",
                    autoCorrect: false
                }}
                listViewDisplayed={ searchFocused }
                fetchDetails
                enabledPoweredByContainer={false}
                styles={{
                    container: {
                        position: "absolute",
                        top: Platform.select({ ios: 60, android: 40 }),
                        width: "100%"
                    },
                    textInputContainer: {
                        flex: 1,
                        backgroundColor: "transparent",
                        height: 54,
                        marginHorizontal: 20,
                        borderTopWidth: 0,
                        borderBottomWidth: 0
                    },
                    textInput: {
                        height: 54,
                        margin: 0,
                        borderRadius: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 20,
                        paddingRight: 20,
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        elevation: 5, //sombra android
                        shadowColor: "#000", //sombra android
                        shadowOpacity: 0.1, //sombra ios
                        shadowOffset: { x: 0, y: 0 }, //sombra ios
                        shadowRadius: 15, //sombra ios
                        borderWidth: 1,
                        borderColor: "#DDD",
                        fontSize: 18
                    },
                    listView: {
                        borderWidth: 1,
                        borderColor: "#DDD",
                        backgroundColor: "#FFF",
                        marginHorizontal: 20,
                        elevation: 5, //sombra android
                        shadowColor: "#000", //sombra android
                        shadowOpacity: 0.1, //sombra ios
                        shadowOffset: { x: 0, y: 0 }, //sombra ios
                        shadowRadius: 15, //sombra ios
                        marginTop: 10
                    },
                    description: {
                        fontSize: 16
                    },
                    row: {
                        padding: 20,
                        height: 58
                    }
                }}
            />
        );
    }
}