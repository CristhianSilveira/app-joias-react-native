import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const produtos = [
  { id: '1', nome: 'Anel de Ouro', preco: 'R$ 500,00', imagem: 'https://example.com/anel-ouro.jpg' },
  { id: '2', nome: 'Colar de Prata', preco: 'R$ 300,00', imagem: 'https://example.com/colar-prata.jpg' },
  { id: '3', nome: 'Pulseira de Diamantes', preco: 'R$ 1500,00', imagem: 'https://example.com/pulseira-diamantes.jpg' },
  { id: '4', nome: 'Brincos de Pérola', preco: 'R$ 250,00', imagem: 'https://example.com/brincos-perola.jpg' },
];

const HomeScreen = () => {
  const [carrinho, setCarrinho] = useState([]);
  const navigation = useNavigation();

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
    Alert.alert('Sucesso', `${produto.nome} foi adicionado ao carrinho!`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imagem }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.nome}</Text>
        <Text style={styles.itemPrice}>{item.preco}</Text>
        <Button
          title="Adicionar ao Carrinho"
          onPress={() => adicionarAoCarrinho(item)}
          color="#B29928"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Loja de Joias!</Text>
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Button
        title="Ir para o Carrinho"
        onPress={() => navigation.navigate('Carrinho', { carrinho })}
        color="#B29928"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
});

export default HomeScreen;