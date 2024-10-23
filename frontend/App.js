import * as React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { UserProvider, UserContext } from './context/Appcontext'; // Importing the app context
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

// Custom Drawer Content to display username
function CustomDrawerContent(props) {
  const { user } = React.useContext(UserContext); // Access user from context

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20 }}>
        {user && (
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Hello, {user.username}!</Text>
        )}
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="Service" 
          drawerPosition="right"
          drawerContent={(props) => <CustomDrawerContent {...props} />} // Set custom drawer content
        >
          <Drawer.Screen 
            name="Service" 
            component={Service} 
            options={({ navigation, route }) => ({
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <SearchButton onPressSearch={() => route.params?.triggerSearch()} />
                  <CustomDrawerButton navigation={navigation} />
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
    </UserProvider>
  );
}
