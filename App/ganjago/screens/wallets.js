import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

export default class wallets extends React.Component {
    static navigationOptions = {
        title: 'Wallets',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <ScrollView style={styles.container}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.sample_text}>This is some text</Text>
                    </View>
                </ScrollView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    sample_text: {
        color: '#ff59ab',
        paddingTop: 15,
    },
    contentContainer: {
        paddingTop: 30,
    },
});
