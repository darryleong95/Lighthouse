import React from 'react'
import Cases from './src/screens/Cases.js';
import CaseDetails from './src/screens/CaseDetails.js';
import AddCase from './src/screens/AddCase.js';
import { Pending } from './src/screens/Pending';
import { createStackNavigator } from 'react-navigation-stack';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

const CasesNavigator = createStackNavigator(
    {
        Cases: Cases,
        CaseDetails: CaseDetails,
        AddCase: AddCase
      },
      {
        initialRouteName: 'Cases',
      },
);

export const BottomNavigator = createMaterialBottomTabNavigator({
    Cases: {
        screen: CasesNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <SimpleLineIcons name={'emotsmile'} size={20} color={tintColor} />
        }
    },
    Pending: {
        screen: Pending,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <SimpleLineIcons name={'notebook'} size={20} color={tintColor} />
        }
    },
    Pending: {
        screen: Pending,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <SimpleLineIcons name={'notebook'} size={20} color={tintColor} />
        }
    }
}, {
    defaultNavigationOptions: {
        tabBarColor: 'white'
    },
    initialRouteName: 'Cases',
    order: ['Cases', 'Pending'],
    activeColor: 'darkorange',
    inactiveColor: 'gray',
    barStyle: { backgroundColor: 'white', padding: 0, borderTopColor: '#c7c7c7', borderTopWidth: 0.5 }
})