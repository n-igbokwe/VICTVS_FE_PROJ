import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Datalist} from './components/data'
import {DetailsScreen} from './components/detailsScreen'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={Datalist}
        options={{title: 'Exams'}}
        >
        </Stack.Screen>
        <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        option={{title : 'Details'}}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
