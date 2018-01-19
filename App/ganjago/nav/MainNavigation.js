import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import colors from '../constants/colors';

import market from '../screens/market';
import orders from '../screens/orders';
import wallets from '../screens/wallets';
import accounts from '../screens/account';

export default TabNavigator(
    {
        Market: {
            screen: market,
        },
        Orders: {
            screen: orders,
        },
        Wallets: {
            screen: wallets,
        },
        Account: {
            screen: accounts,
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Market':
                        iconName =
                            Platform.OS === 'ios'
                                ? `ios-information-circle${focused ? '' : '-outline'}`
                                : 'md-information-circle';
                        break;
                    case 'Orders':
                        iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link';
                        break;
                    case 'Wallets':
                        iconName =
                            Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
                        break;
                    case 'Account':
                        iconName =
                            Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
                        break;
                }
                return (
                    <Ionicons
                        name={iconName}
                        size={28}
                        style={{ marginBottom: -2 }}
                        color={focused ? colors.tabIconSelected : colors.tabIconDefault}
                    />
                );
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
    }
);
