import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const produtos = [
  {
    id: '1',
    nome: 'Anel X',
    preco: 'R$ 65,00',
    imagem: 'https://cdn.dooca.store/150052/products/bzd5giwqp26bwi4rmcikdhgx3sf6t8by7kun_1600x1600+fill_ffffff.png?v=1708917871',
  },
  {
    id: '2',
    nome: 'Anel Pai Nosso',
    preco: 'R$ 220,00',
    imagem: 'https://cdn.dooca.store/150052/products/2hfozepnqkmdlytlja2rdhyzqeew1ha0oupi_1600x1600+fill_ffffff.png?v=1708917343',
  },
  {
    id: '3',
    nome: 'Anel mandala',
    preco: 'R$ 150,00',
    imagem: 'https://cdn.dooca.store/150052/products/bsbupirwzeoz1i0wltsenklwks2bhybvgsav_1600x1600+fill_ffffff.png?v=1708917851',
  },
  {
    id: '4',
    nome: 'Anel Boho',
    preco: 'R$ 250,00',
    imagem: 'https://cdn.dooca.store/150052/products/obwnruioqr8dczpt1hsswkscmtlhda0ea2hq_1600x1600+fill_ffffff.png?v=1708917847',
  },
  {
    id: '5',
    nome: 'Brinco Corrente Estrela',
    preco: 'R$ 78,00',
    imagem: 'https://cdn.dooca.store/150052/products/lxjse1bk9xmouzqvcxkl0bpjwg9graqsa47u_1600x1600+fill_ffffff.png?v=1708917780',
  },
  {
    id: '6',
    nome: 'Brinco Anzol Lua',
    preco: 'R$ 95,00',
    imagem: 'https://cdn.dooca.store/150052/products/jyqbjskbxlwqx18rshgavovywt5og9xnni8n_1600x1600+fill_ffffff.png?v=1708917749',
  },
  {
    id: '7',
    nome: 'Brinco Franja',
    preco: 'R$ 105,00',
    imagem: 'https://cdn.dooca.store/150052/products/wlt2mbfrvgzlbslemv8tz5qu5zza0vnmlpfp_1600x1600+fill_ffffff.png?v=1708917708',
  },
  {
    id: '8',
    nome: 'Brinco Trio Estrela Zircônia ',
    preco: 'R$ 85,00',
    imagem: 'https://cdn.dooca.store/150052/products/93zpo5aws1p3hqwynfhuisjbuggbg0sptoku_620x620+fill_ffffff.png?v=1708917784',
  },
  {
    id: '9',
    nome: 'Pulseira Grumet',
    preco: 'R$ 85,00',
    imagem: 'https://cdn.dooca.store/150052/products/gmtpcqlwxeld7z7cqgtbagiq0behdl2wd08i_1600x1600+fill_ffffff.png?v=1708917556',
  },
  {
    id: '10',
    nome: 'Pulseira Elo Português',
    preco: 'R$ 280,00',
    imagem: 'https://cdn.dooca.store/150052/products/bk2tyasas6wipgyxse0futczsq2vpy9gzlom_1600x1600+fill_ffffff.png?v=1708917857',
  },
  {
    id: '11',
    nome: 'Arco em V',
    preco: 'R$ 240,00',
    imagem: 'https://cdn.dooca.store/150052/products/ne68b5ppd2emdctv0wxzmwp27qz8qijoplfk_1600x1600+fill_ffffff.png?v=1708917316',
  },
];

const HomeScreen = ({ carrinho = [], adicionarAoCarrinho }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imagem }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.nome}</Text>
        <Text style={styles.itemPrice}>{item.preco}</Text>
        <Button
          title="Adicionar ao Carrinho"
          onPress={() => {
            adicionarAoCarrinho(item);
            Alert.alert('Sucesso', `${item.nome} foi adicionado ao carrinho!`);
          }}
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

      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Carrinho', { carrinho })}>
        <Text style={styles.buttonText}>Ir para o Carrinho</Text>
      </TouchableOpacity>
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
  checkoutButton: {
    backgroundColor: '#B29928',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;