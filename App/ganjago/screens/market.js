import React from 'react';
import {
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Location, Permissions } from 'expo';

export default class market extends React.Component {
    state = {
        title: 'Deliver to: unknown',
        singleLocation: null,
        subscription: null,
        searching: false,
        watchLocation: null,
        polyfill: false,
    };

    _findSingleLocation = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            return;
        }

        try {
            this.setState({ searching: true });
            let result = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true,
            });
            this.setState({ singleLocation: result });
        } finally {
            this.setState({ searching: false });
        }
    };

    _findSingleLocationWithPolyfill = () => {
        this.setState({ searching: true });
        navigator.geolocation.getCurrentPosition(
            location => {
                this.setState({ singleLocation: location, searching: false });
            },
            err => {
                console.log({ err });
                this.setState({ searching: false });
            },
            { enableHighAccuracy: true }
        );
    };

    _startWatchingLocation = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            return;
        }

        let subscription = await Location.watchPositionAsync(
            {
                enableHighAccuracy: true,
                timeInterval: 1000,
                distanceInterval: 1,
            },
            location => {
                console.log(`Got location: ${JSON.stringify(location.coords)}`);
                this.setState({ watchLocation: location });
            }
        );

        this.setState({ subscription });
    };

    _startWatchingLocationWithPolyfill = () => {
        let watchId = navigator.geolocation.watchPosition(
            location => {
                console.log(`Got location: ${JSON.stringify(location.coords)}`);
                this.setState({watchLocation: location});
            },
            err => {
                console.log({err});
            },
            {
                enableHighAccuracy: true,
                timeInterval: 1000,
                distanceInterval: 1,
            }
        );
        let subscription = {
            remove() {
                navigator.geolocation.clearWatch(watchId);
            },
        };

        this.setState({ subscription });
    };

    _stopWatchingLocation = async () => {
        this.state.subscription.remove();
        this.setState({ subscription: null, watchLocation: null });
    };

    render_loc = async () => {
        if (this.state.singleLocation){
            return (
                <View style={{ padding: 10 }}>
                    {this._findSingleLocationWithPolyfill()}
                    <Text>
                        {this.state.polyfill
                            ? 'navigator.geolocation.getCurrentPosition'
                            : 'Location.getCurrentPositionAsync'}
                        :
                    </Text>
                    <Text>Latitude: {this.state.singleLocation.coords.latitude}</Text>
                    <Text>Longitude: {this.state.singleLocation.coords.longitude}</Text>
                </View>
            );
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.getStartedText}>
                            This text is in welcome container{'\n'}
                            current location:{'\n' + this.render_loc()}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
