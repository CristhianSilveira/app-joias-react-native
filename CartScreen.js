import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const CartScreen = ({ carrinho = [], setCarrinho }) => {
  const total = carrinho.reduce((sum, item) => sum + (parseFloat(item.preco.replace('R$ ', '').replace('.', '').replace(',', '.')) * item.quantidade), 0 );

  const formatMessage = () => {
    let message = 'Olá, gostaria de realizar uma compra:\n\n';
    carrinho.forEach(item => {
      message += `${item.nome} - ${item.preco} (Quantidade: ${item.quantidade})\n`;
    });
    message += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;
    return message;
  };

  const handleCheckout = () => {
    if (carrinho.length === 0) {
      Alert.alert("Carrinho Vazio","Seu carrinho está vazio! Adicione itens para continuar.", [{ text: "OK" }]
      );
    } else {
      const phoneNumber = '5521972074352';
      const message = formatMessage();
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      Linking.openURL(url).catch(err => console.error('Erro ao abrir o WhatsApp', err));
    }
  };

  const handleRemoveItem = (produto) => {
    setCarrinho((prevCarrinho) => {
      const produtoExistente = prevCarrinho.find(item => item.id === produto.id);
      if (produtoExistente.quantidade > 1) {
        return prevCarrinho.map(item =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade - 1 } : item
        );
      } else {
        return prevCarrinho.filter(item => item.id !== produto.id);
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.nome}</Text>
      <Text style={styles.itemPrice}>{item.preco}</Text>
      <Text style={styles.itemQuantity}>{item.quantidade}x</Text>
      <TouchableOpacity onPress={() => handleRemoveItem(item)}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      <FlatList
        data={carrinho}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2).replace('.', ',')}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#877a4e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  itemName: {
    fontSize: 16,
  },
  itemQuantity: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    color: '#B29928',
  },
  totalContainer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#B29928',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CartScreen;