import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from './src/pages/HomeScreen';
import CartScreen from './src/pages/CartScreen';
import CategoryScreen from './src/pages/CategoryScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import LoginScreen from './src/pages/LoginScreen';
import SignupScreen from './src/pages/SignupScreen';
import SobreScreen from './src/pages/SobreScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const JewelryTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Início" component={HomeScreen} />
    <Tab.Screen name="Categorias" component={CategoryScreen} />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Início">
    <Drawer.Screen name="Início" component={JewelryTabs} />
    <Drawer.Screen name="Perfil" component={ProfileScreen} />
    <Drawer.Screen name="Carrinho" component={CartScreen} />
    <Drawer.Screen name="Sobre" component={SobreScreen} />
  </Drawer.Navigator>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          
          <Stack.Screen name="Main" component={DrawerNavigator} />
        ) : (
          <>
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => (
                <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;