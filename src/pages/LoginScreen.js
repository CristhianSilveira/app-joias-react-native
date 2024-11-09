import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem('user'); //Pega os dados do async user
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        if (email === parsedUser.email && password === parsedUser.password) {
          Alert.alert('Sucesso', 'Login realizado com sucesso!');
          setTimeout(() => {
          setIsAuthenticated(true);
          navigation.navigate('Main');
        }, 1000);
          
        } else {
          Alert.alert('Erro', 'E-mail ou senha incorretos.');
        }
      } else {
        Alert.alert('Erro', 'Nenhum usuário cadastrado.');
      }
    } catch (error) {
      console.error('Erro ao verificar dados de login:', error);
      Alert.alert('Erro', 'Houve um erro ao tentar fazer o login.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo-joias.png')} style={styles.logo} />

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Alterna a exibição da senha
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showPasswordButton}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'} // Ícone de "olho" para exibir e ocultar
            size={20}
            color="#B29928"
          />
        </TouchableOpacity>
      </View>

      <Button title="Entrar" onPress={handleLogin} color="#B29928" />

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.switchText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#c9be95',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 16,
  },
  passwordInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingRight: 40,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    color: '#B29928',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;