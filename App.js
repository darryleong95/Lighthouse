/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { BottomNavigator } from './navigation';

const NavigationStack = createAppContainer(BottomNavigator);

export const App = () => {
  return (
    <NavigationStack />
  )
}