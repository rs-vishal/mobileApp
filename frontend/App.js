import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; // You can use any icon library
import Login from './screens/Login';
import Register from './screens/Register';
import Service from './screens/Service';

const Drawer = createDrawerNavigator();

// Custom drawer button component that opens the drawer
function CustomDrawerButton({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Ionicons name="menu" size={24} color="black" style={{ marginRight: 15 }} /> 
    </TouchableOpacity>
  );
}

// Search button component
function SearchButton({ onPressSearch }) {
  return (
    <TouchableOpacity onPress={onPressSearch}>
      <Ionicons name="search" size={24} color="black" style={{ marginRight: 15 }} />
    </TouchableOpacity>
  );
}

// Back button component
function BackButton({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 15 }} />
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Service" 
        drawerPosition="right"
      >
        <Drawer.Screen 
          name="Service" 
          component={Service} 
          options={({ navigation, route }) => ({
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <CustomDrawerButton navigation={navigation} />
                <SearchButton onPressSearch={() => route.params?.triggerSearch()} />
              </View>
            ),
            headerLeft: () => <BackButton navigation={navigation} />,
          })}
        />
        <Drawer.Screen 
          name="Login" 
          component={Login} 
          options={({ navigation }) => ({
            headerRight: () => (
              <CustomDrawerButton navigation={navigation} />
            ), 
            headerLeft: () => null, 
          })}
        />
        <Drawer.Screen 
          name="Register" 
          component={Register} 
          options={({ navigation }) => ({
            headerRight: () => (
              <CustomDrawerButton navigation={navigation} />
            ), 
            headerLeft: () => null,  
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
