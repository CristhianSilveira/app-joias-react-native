import {
  Text,
  StyleSheet,
  Image,
  Linking,
  ScrollView,
} from 'react-native';

const SobreScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: 'https://cdn.dooca.store/150052/files/img-9065.jpeg?v=1709764821',
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>BiancaBiaPrata</Text>

      <Text style={styles.description}>
        Somos uma loja on-line de pratas 925, oferecendo peças com qualidade e
        garantia vitalícia. "Persiga seus sonhos com determinação, pois são eles
        que moldam o caminho do seu sucesso."
        {'\n\n'}Enviamos para todo o Brasil • Rio de Janeiro - RJ
      </Text>

      <Text style={styles.contactTitle}>Contato:</Text>
      <Text style={styles.contact}>
        Site:{' '}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://biancabiaprata.bagypro.com/')
          }>
          biancabiaprata.bagypro.com
        </Text>
        {'\n'}Instagram:{' '}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://www.instagram.com/biancabiaprata/')
          }>
          @biancabiaprata
        </Text>
        {'\n'}Telefone:{' '}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('tel:+5521972074352')}>
          +55 21 97207‑4352
        </Text>
        {'\n'}Email:{' '}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('mailto:biancafish2006@yahoo.com.br')}>
          biancafish2006@yahoo.com.br
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#c9be95',
    alignItems: 'center',
    paddingTop: 50,
    marginTop: 40
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffdb38',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#785e08',
    lineHeight: 22,
    fontWeight: 'bold',
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#232323',
    marginTop: 20,
    marginBottom: 20,
  },
  contact: {
    fontSize: 16,
    color: '#232323',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  link: {
    color: '#785e08',
    textDecorationLine: 'underline',
    fontWeight: 'normal',
  },
});

export default SobreScreen;