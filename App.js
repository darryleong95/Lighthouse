import React from 'react';
import { createAppContainer } from 'react-navigation';
import { BottomNavigator } from './navigation';

const NavigationStack = createAppContainer(BottomNavigator);

export const App = () => {
  console.disableYellowBox = true;
  return (
    <NavigationStack />
  )
}