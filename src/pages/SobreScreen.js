import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SobreScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn.dooca.store/150052/files/img-9065.jpeg?v=1709764821' }} 
        style={styles.logo}
      />
      <Text style={styles.title}>Sobre Nossa Loja</Text>
      <Text style={styles.description}>
        Somos uma loja on-line de pratas 925, peças com qualidade e garantia vitalícia de nossas pratas. "Persiga seus sonhos com determinação, pois são eles que moldam o caminho do seu sucesso."


Enviamos para todo Brasil
@biancabiaprata • Rio de Janeiro - RJ
      </Text>
      <Text style={styles.contact}>
        <Text style={styles.contactTitle}>Contato:</Text>
        {'\n'}Telefone: +55 21 97207‑4352{'\n'}Email: biancafish2006@yahoo.com.br
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  contact: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  contactTitle: {
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  addressTitle: {
    fontWeight: 'bold',
  },
});

export default SobreScreen;