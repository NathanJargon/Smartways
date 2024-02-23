import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/image1.png')} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/arrow_back_white.png')} style={styles.backButtonImage} />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo-white-trans.png')} style={styles.logo} />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Powered by</Text>
        <Image source={require('../assets/icons/logo-white.png')} style={styles.footerImage} />
      </View>
      <ImageBackground source={require('../assets/appBackground.png')} style={styles.bottomContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: 'white', underlineColor:'transparent', background: 'transparent', outlineColor: 'transparent' }}}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: 'white', underlineColor:'transparent', background: 'transparent', outlineColor: 'transparent' }}}
        />
        <TouchableOpacity style={styles.button} onPress={() => console.log('Pressed')}>
          <ImageBackground source={require('../assets/buttonContainer.jpg')} style={styles.buttonImage}>
            <Text style={styles.buttonText}>Login</Text>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    position: 'absolute', // Add this line
    top: windowHeight / 10, // Add this line to move the logo up
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: windowWidth / 0.9,
    height: windowWidth / 0.9,
    resizeMode: 'contain',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: windowWidth / 2 - (windowWidth / 7) / 0.8,
  },
  footerText: {
    marginRight: windowWidth / 50,
    fontSize: 16,
    color: 'white',
  },
  footerImage: {
    resizeMode: 'contain',
    width: windowWidth / 7,
    height: windowHeight / 5,
  },
  bottomContainer: {
    width: windowWidth,
    height: windowHeight / 2.5,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: windowWidth - 100,
    height: windowHeight / 15,
    alignItems: 'center',
    marginBottom: windowHeight / 60,
    borderRadius: 20,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  input: {
    width: windowWidth - 100,
    height: windowHeight / 15,
    marginBottom: windowHeight / 60,
    backgroundColor: 'transparent',
    color: 'white',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: windowHeight / 60,
  },
  signupText: {
    color: 'white',
  },
  signupButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: windowHeight / 20,
    left: windowWidth / 20,
  },
  backButtonImage: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    resizeMode: 'contain',
  },
});

export default Login;