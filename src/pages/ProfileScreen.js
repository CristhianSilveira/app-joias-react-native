import { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  View
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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

        const storedPhotoUri = await AsyncStorage.getItem('userPhoto');
        if (storedPhotoUri) {
          setUserPhoto(storedPhotoUri);
        }
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

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setUserPhoto(uri);
      try {
        await AsyncStorage.setItem('userPhoto', uri);
      } catch (error) {
        console.log('Erro ao salvar a foto do usuário', error);
      }
    }
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
    <ScrollView contentContainerStyle={styles.container}>
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
              onPress={handleImagePicker}
              style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>Trocar Foto</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.info}>
              Nome:
              <Text style={styles.infoText}> {user.name}</Text>
            </Text>
            <Text style={styles.info}>
              Email:
              <Text style={styles.infoText}> {user.email}</Text>
            </Text>
            <Text style={styles.info}>
              Endereço:
              <Text style={styles.infoText}> {user.endereco}</Text>
            </Text>
            <Text style={styles.info}>
              Bairro:
              <Text style={styles.infoText}> {user.bairro}</Text>
            </Text>
            <Text style={styles.info}>
              N°:
              <Text style={styles.infoText}> {user.numero}</Text>
            </Text>
            <Text style={styles.info}>
              Estado:
              <Text style={styles.infoText}> {user.estado}</Text>
            </Text>
            <Text style={styles.info}>
              CEP:
              <Text style={styles.infoText}> {user.cep}</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogout}> 
            <Text style={styles.buttonText}>Deslogar</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#c9be95',
    alignItems: 'center',
    paddingTop: 50,
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#fff'
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
    textAlign: 'center',
    marginBottom: 20
  },
  info:{
    fontSize: 16,
    color: '#232323',
    fontWeight: 'bold',
    lineHeight: 22,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: 'normal',
    color: '#785e08',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 30,
    marginLeft: 10,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#B29928',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProfileScreen;
