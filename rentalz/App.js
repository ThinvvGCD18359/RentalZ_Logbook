import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './screens/home';
import RentForm from './screens/rentForm';
import ListForm from './screens/listForm';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator title="RentalZ">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="RentForm" component={RentForm} />
      <Drawer.Screen name="ListForm" component={ListForm} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;