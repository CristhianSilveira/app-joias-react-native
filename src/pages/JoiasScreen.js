import { View, Text, StyleSheet } from 'react-native';

const JewelryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página de Joias</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default JewelryScreen;