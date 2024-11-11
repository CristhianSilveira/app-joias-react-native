import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [cepError, setCepError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const cepRegex = /^\d{5}\d{3}$/;

  useEffect(() => {
    if (cepRegex.test(cep)) {
      buscaCep();
    }
  }, [cep]);

  const buscaCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setCepError('CEP não encontrado.');
      } else {
        setEndereco(data.logradouro);
        setBairro(data.bairro);
        setEstado(data.estado);
        setCepError('');
      }
    } catch (error) {
      setCepError('Erro ao buscar o CEP.');
    }
  };

  const handleSignup = async () => {
    let isValid = true;
    setNameError('');
    setCepError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!name) {
      setNameError('O nome é obrigatório.');
      isValid = false;
    }

    if (!cep) {
      setCepError('O CEP é obrigatório.');
      isValid = false;
    } else if (!cepRegex.test(cep)) {
      setCepError('O CEP não é válido.');
      isValid = false;
    }

    if (!email) {
      setEmailError('O e-mail é obrigatório.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('O e-mail não é válido.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('A senha é obrigatória.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('A senha deve conter no mínimo 6 caracteres.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('As senhas não coincidem.');
      isValid = false;
    }

    if (isValid) {
      try {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({ name, cep, endereco, numero, estado, bairro, email, password })
        );
        Alert.alert('Cadastro Realizado', 'Usuário registrado com sucesso!');
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Erro', 'Houve um erro ao salvar as informações.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
        maxLength={8}
        keyboardType="numeric"
      />
      {cepError ? <Text style={styles.errorText}>{cepError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />

      <TextInput
        style={styles.input}
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
      />

      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        minLength={6}
        secureTextEntry
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        minLength={6}
        secureTextEntry
      />
      {confirmPasswordError ? (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      ) : null}

      <Button title="Cadastrar" onPress={handleSignup} color="#B29928" />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchText}>Já tem uma conta? Login</Text>
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
    backgroundColor: '#877a4e',
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
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 20,
  },
  switchText: {
    color: '#ffdb38',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default SignupScreen;
