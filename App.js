import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/pages/HomeScreen';
import CartScreen from './src/pages/CartScreen';
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
    <Tab.Screen name="Perfil" component={ProfileScreen} />
  </Tab.Navigator>
);

const DrawerNavigator = ({setIsAuthenticated, adicionarAoCarrinho, carrinho, setCarrinho, }) => (
  <Drawer.Navigator initialRouteName="Início">
    <Drawer.Screen name="Início">
      {(props) => (
        <HomeScreen {...props} carrinho={carrinho} adicionarAoCarrinho={adicionarAoCarrinho} />
      )}
    </Drawer.Screen>
    <Drawer.Screen name="Perfil">
      {(props) => (
        <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} />
      )}
    </Drawer.Screen>
    <Drawer.Screen name="Carrinho">
      {(props) => (
        <CartScreen {...props} carrinho={carrinho} setCarrinho={setCarrinho} />
      )}
    </Drawer.Screen>
    <Drawer.Screen name="Sobre" component={SobreScreen} />
  </Drawer.Navigator>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => {
      const produtoExistente = prevCarrinho.find(item => item.id === produto.id);
      if (produtoExistente) {
        return prevCarrinho.map(item =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prevCarrinho, { ...produto, quantidade: 1 }];
      }
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main">
            {(props) => (
              <DrawerNavigator
                {...props}
                setIsAuthenticated={setIsAuthenticated}
                adicionarAoCarrinho={adicionarAoCarrinho}
                carrinho={carrinho}
                setCarrinho={setCarrinho}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;