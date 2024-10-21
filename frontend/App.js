import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login'; 
import Register from './components/Register';  
import Service from './components/Service';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Service" component={Service} options={{
          headerShown:false,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
