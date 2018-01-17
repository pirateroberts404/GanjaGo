import React from 'react';
import {Platform, StatusBar,StyleSheet, Text, View, Image} from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import RootNavigation from './nav/RootNavigation';

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  state = {
      isLoadingDone: false,
  };

    render() {
        // if (!this.state.isLoadingDone) {
        //     return (
        //         <AppLoading
        //             startAsync={this._loadAssetsAsync}
        //             onError={this._handleLoadingError}
        //             onFinish={this._handleFinishLoading}
        //         />
        //     );
        // } else {
            return (
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
                    <RootNavigation/>
                </View>
            );
        // }
    }
}

_loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
        require('./assets/account.png'),
        // require('./assets/market.png'),
        // require('./assets/orders.png'),
        // require('./assets/wallet.png'),
    ]);

    const fontAssets = cacheFonts([require('./assets/SpaceMono-Regular.ttf')]);

    await Promise.all([...imageAssets, ...fontAssets]);
};

_handleLoadingError = error => {
    console.warn(error);
};

_handleFinishLoading = () => {
    this.setState({ isLoadingDone: true });
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
