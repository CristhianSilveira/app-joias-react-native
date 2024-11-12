import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-elements'; 


import HomeScreen from './src/pages/HomeScreen';
import CartScreen from './src/pages/CartScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import LoginScreen from './src/pages/LoginScreen';
import SignupScreen from './src/pages/SignupScreen';
import SobreScreen from './src/pages/SobreScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = ({setIsAuthenticated, adicionarAoCarrinho, carrinho, setCarrinho, }) => (
  <Tab.Navigator
    initialRouteName="Início"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Início') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Carrinho') {
          iconName = focused ? 'cart' : 'cart-outline';
        } else if (route.name === 'Perfil') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Sobre') {
          iconName = focused ? 'information-circle' : 'information-circle-outline';
        }

        if (route.name === 'Carrinho') {
          return (
            <View>
              <Icon name={iconName} size={size} color={color} />
              {carrinho.length > 0 && (
                <Badge
                  value={carrinho.length}
                  status="error"
                  containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
              )}
            </View>
          );
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Início">
      {(props) => (
        <HomeScreen {...props} carrinho={carrinho} adicionarAoCarrinho={adicionarAoCarrinho} />
      )}
    </Tab.Screen>
    <Tab.Screen name="Perfil">
      {(props) => (
        <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} />
      )}
    </Tab.Screen>
    <Tab.Screen name="Carrinho">
      {(props) => (
        <CartScreen {...props} carrinho={carrinho} setCarrinho={setCarrinho} />
      )}
    </Tab.Screen>
    <Tab.Screen name="Sobre" component={SobreScreen} />
  </Tab.Navigator>
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