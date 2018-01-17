import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/colors';

import MarketScreen from '../screens/market';
import OrdersScreen from '../screens/orders';
import WalletsScreen from '../screens/wallets';
import AccountScreen from '../screens/account';

export default TabNavigator(
    {
        Market: {
            screen: MarketScreen,
        },
        Orders: {
            screen: OrdersScreen,
        },
        Wallets: {
            screen: WalletsScreen,
        },
        Account: {
            screen: AccountScreen,
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
                }
                return (
                    <Ionicons
                        name={iconName}
                        size={28}
                        style={{ marginBottom: -3 }}
                        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
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
