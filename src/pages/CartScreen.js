import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';

const CartScreen = ({ route }) => {
  const carrinho = route?.params?.carrinho || [];

  const total = carrinho.reduce((sum, item) => sum + parseFloat(item.preco.replace('R$ ', '').replace('.', '').replace(',', '.')), 0);

  const formatMessage = () => {
    let message = 'Olá, gostaria de realizar uma compra:\n\n';
    carrinho.forEach(item => {
      message += `${item.nome} - ${item.preco}\n`;
    });
    message += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;
    return message;
  };

  // Função para abrir o WhatsApp com a mensagem formatada
  const handleCheckout = () => {
    const phoneNumber = '5511998765432'; // Substitua pelo número de WhatsApp do atendente
    const message = formatMessage();
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url)
      .catch(err => console.error('Erro ao abrir o WhatsApp', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      <FlatList
        data={carrinho}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemPrice}>{item.preco}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
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
    backgroundColor: '#f5f5f5',
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