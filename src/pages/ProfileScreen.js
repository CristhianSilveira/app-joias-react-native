import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Aqui você pode adicionar lógica para limpar a sessão do usuário, se necessário.
    navigation.navigate('Login'); // Altere 'Login' para o nome correto da sua tela de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      {/* Adicione informações do usuário aqui */}
      <Button title="Sair" onPress={handleLogout} color="#B29928" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfileScreen;