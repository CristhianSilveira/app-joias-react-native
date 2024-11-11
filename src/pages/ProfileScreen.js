import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation, setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser); // Seta os dados do async para user
      } catch (error) {
        console.log('Erro ao carregar os dados do usuário', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      navigation.replace('Login');
      setIsLoading(false);
    }, 2000);
  };

  const handleSelectPhoto = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
  console.log('Resposta da galeria:', response);
  if (response.didCancel) {
    console.log('O usuário cancelou a seleção da imagem');
  } else if (response.errorCode) {
    console.log('Erro ao selecionar a imagem: ', response.errorMessage);
  } else {
    setUserPhoto(response.assets[0].uri);
  }
});
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B29928" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffdb38" />
          <Text style={styles.loadingText}>Saindo...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Perfil do Usuário</Text>
          <View style={styles.photoContainer}>
            <Image
              source={
                userPhoto
                  ? { uri: userPhoto }
                  : require('../assets/default-avatar.png')
              }
              style={styles.photo}
            />
            <TouchableOpacity
              onPress={handleSelectPhoto}
              style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>Trocar Foto</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.info}>
                Nome:{' '}
                <Text style={styles.infoText}>{user.name}</Text>
                {'\n'}Email:{' '}
                <Text style={styles.infoText}>{user.email}</Text>
                {'\n'}Endereço:{' '}
                <Text style={styles.infoText}>{user.endereco}</Text>
                {'\n'}Bairro:{' '}
                <Text style={styles.infoText}>{user.bairro}</Text>
                {'\n'}N°:{' '}
                <Text style={styles.infoText}>{user.numero}</Text>
                {'\n'}Estado:{' '}
                <Text style={styles.infoText}>{user.estado}</Text>
                {'\n'}CEP:{' '}
                <Text style={styles.infoText}>{user.cep}</Text>
            </Text>
          </View>

          <Button title="Deslogar" onPress={handleLogout} color="#B29928" />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#877a4e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  photoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  changePhotoButton: {
    marginBottom: 20,
    backgroundColor: '#B29928',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  changePhotoText: {
    fontSize: 16,
    color: '#fff',
  },
  userInfo: {
    marginBottom: 20,
  },
  info:{
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  infoText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#ffdb38',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#ffdb38',
  },
});

export default ProfileScreen;
