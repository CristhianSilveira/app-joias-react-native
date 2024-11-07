import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const categories = [
  {
    id: '1',
    name: 'Anéis',
    image: 'https://example.com/ring.jpg', // Colocar imagem nos exemplos
  },
  {
    id: '2',
    name: 'Pulseiras',
    image: 'https://example.com/bracelet.jpg', // 
  },
  {
    id: '3',
    name: 'Colares',
    image: 'https://example.com/necklace.jpg', //
  },
  {
    id: '4',
    name: 'Brincos',
    image: 'https://example.com/earring.jpg', // 
  },
  
];

const CategoryScreen = ({ navigation }) => {
  const handleCategorySelect = (category) => {
    //falta melhorar isso aq
    alert(`Selecionou a categoria: ${category.name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias de Produtos</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategorySelect(item)}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 3, // Para sombra em Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  categoryImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default CategoryScreen;