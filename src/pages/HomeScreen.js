import { View, Text, StyleSheet, FlatList, Image, Button, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const produtos = [
  {
    id: '1',
    nome: 'Anel X',
    preco: 'R$ 65,00',
    imagem: 'https://cdn.dooca.store/150052/products/bzd5giwqp26bwi4rmcikdhgx3sf6t8by7kun_1600x1600+fill_ffffff.png?v=1708917871',
    categoria: 'Anéis',
  },
  {
    id: '2',
    nome: 'Anel Pai Nosso',
    preco: 'R$ 220,00',
    imagem: 'https://cdn.dooca.store/150052/products/2hfozepnqkmdlytlja2rdhyzqeew1ha0oupi_1600x1600+fill_ffffff.png?v=1708917343',
    categoria: 'Anéis',
  },
  {
    id: '3',
    nome: 'Anel Mandala',
    preco: 'R$ 150,00',
    imagem: 'https://cdn.dooca.store/150052/products/bsbupirwzeoz1i0wltsenklwks2bhybvgsav_1600x1600+fill_ffffff.png?v=1708917851',
    categoria: 'Anéis',
  },
  {
    id: '4',
    nome: 'Anel Boho',
    preco: 'R$ 250,00',
    imagem: 'https://cdn.dooca.store/150052/products/obwnruioqr8dczpt1hsswkscmtlhda0ea2hq_1600x1600+fill_ffffff.png?v=1708917847',
    categoria: 'Anéis',
  },
  {
    id: '5',
    nome: 'Brinco de Corrente Estrela',
    preco: 'R$ 78,00',
    imagem: 'https://cdn.dooca.store/150052/products/lxjse1bk9xmouzqvcxkl0bpjwg9graqsa47u_1600x1600+fill_ffffff.png?v=1708917780',
    categoria: 'Brincos',
  },
  {
    id: '6',
    nome: 'Brinco Anzol Lua',
    preco: 'R$ 95,00',
    imagem: 'https://cdn.dooca.store/150052/products/jyqbjskbxlwqx18rshgavovywt5og9xnni8n_1600x1600+fill_ffffff.png?v=1708917749',
    categoria: 'Brincos',
  },
  {
    id: '7',
    nome: 'Brinco Franja',
    preco: 'R$ 105,00',
    imagem: 'https://cdn.dooca.store/150052/products/wlt2mbfrvgzlbslemv8tz5qu5zza0vnmlpfp_1600x1600+fill_ffffff.png?v=1708917708',
    categoria: 'Brincos',
  },
  {
    id: '8',
    nome: 'Brinco Trio Estrela Zircônia',
    preco: 'R$ 85,00',
    imagem: 'https://cdn.dooca.store/150052/products/93zpo5aws1p3hqwynfhuisjbuggbg0sptoku_620x620+fill_ffffff.png?v=1708917784',
    categoria: 'Brincos',
  },
  {
    id: '9',
    nome: 'Pulseira Grumet',
    preco: 'R$ 85,00',
    imagem: 'https://cdn.dooca.store/150052/products/gmtpcqlwxeld7z7cqgtbagiq0behdl2wd08i_1600x1600+fill_ffffff.png?v=1708917556',
    categoria: 'Pulseiras',
  },
  {
    id: '10',
    nome: 'Pulseira Elo Português',
    preco: 'R$ 280,00',
    imagem: 'https://cdn.dooca.store/150052/products/bk2tyasas6wipgyxse0futczsq2vpy9gzlom_1600x1600+fill_ffffff.png?v=1708917857',
    categoria: 'Pulseiras',
  },
  {
    id: '11',
    nome: 'Cordão Aro em V',
    preco: 'R$ 240,00',
    imagem: 'https://cdn.dooca.store/150052/products/ne68b5ppd2emdctv0wxzmwp27qz8qijoplfk_1600x1600+fill_ffffff.png?v=1708917316',
    categoria: 'Colares',
  },
];

const CategoriaScreen = ({ categoria, adicionarAoCarrinho }) => {
  const produtosFiltrados = produtos.filter(item => item.categoria === categoria);

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
      <Text style={styles.title}>{categoria}</Text>
      <FlatList
        data={produtosFiltrados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const HomeScreen = ({ carrinho = [], adicionarAoCarrinho }) => {
  return (
    <Tab.Navigator
  screenOptions={{
    // Cor do texto das abas
    tabBarLabelStyle: { 
      fontSize: 12, 
      fontWeight: 'bold', 
      color: '#ffffff'
    },
    tabBarIndicatorStyle: { 
      backgroundColor: '#FFFFFF' // Altere a cor do indicador da aba ativa
    },
    tabBarStyle: { 
      backgroundColor: '#7d6c1d' // Altere a cor de fundo da barra superior
    },
  }}
>
  <Tab.Screen name="Anéis">
    {() => <CategoriaScreen categoria="Anéis" adicionarAoCarrinho={adicionarAoCarrinho} />}
  </Tab.Screen>
  <Tab.Screen name="Brincos">
    {() => <CategoriaScreen categoria="Brincos" adicionarAoCarrinho={adicionarAoCarrinho} />}
  </Tab.Screen>
  <Tab.Screen name="Pulseiras">
    {() => <CategoriaScreen categoria="Pulseiras" adicionarAoCarrinho={adicionarAoCarrinho} />}
  </Tab.Screen>
  <Tab.Screen name="Colares">
    {() => <CategoriaScreen categoria="Colares" adicionarAoCarrinho={adicionarAoCarrinho} />}
  </Tab.Screen>
</Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#c9be95',
  },
  title: {
    fontSize: 18,
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
    width: 85,
    height: 85,
    borderRadius: 30,
    resizeMode: 'center',
    overflow: 'hidden',
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
