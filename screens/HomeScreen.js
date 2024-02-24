import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

function HomeScreen({ navigation }) {
  const [bottomContent, setBottomContent] = useState('default');
  const [bottomHeight, setBottomHeight] = useState(windowHeight / 2.5);

  return (
    <ImageBackground source={require('../assets/image1.png')} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo-white-trans.png')} style={styles.logo} />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Powered by</Text>
          <Image source={require('../assets/icons/logo-white.png')} style={styles.footerImage} />
        </View>
      <ImageBackground source={require('../assets/appBackground.png')} style={[styles.bottomContainer, { height: bottomHeight }]}>
        {bottomContent === 'default' ? (
          <>
            <TouchableOpacity style={styles.button} onPress={() => { setBottomContent('login'); setBottomHeight(windowHeight / 2); }}>
              <ImageBackground source={require('../assets/buttonContainer.jpg')} style={styles.buttonImage}>
                <Text style={styles.buttonText}>Login</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <ImageBackground source={require('../assets/buttonContainer.jpg')} style={styles.buttonImage}>
                <Text style={styles.buttonText}>Create Account</Text>
              </ImageBackground>
            </TouchableOpacity>
          </>
        ) : (
          // Render entry forms when bottomContent is 'login'
          <View>
            <TouchableOpacity onPress={() => { setBottomContent('default'); setBottomHeight(windowHeight / 2.5); }}>
              <Image source={require('../assets/arrow_back_white.png')} style={styles.backButtonImage} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              label="Username"
              mode="outlined"
            />
            <TextInput
              style={styles.input}
              label="Password"
              mode="outlined"
              secureTextEntry
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
          </View>
        )}
      </ImageBackground>
    </ImageBackground>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logoContainer: {
    position: 'absolute', // Add this line
    top: windowHeight / 20, // Add this line to move the logo up
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
    position: 'absolute', // Add this line
    top: 0, // Add this line
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
  bottomContainer: {
    width: windowWidth,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center', // Add this line
    alignItems: 'center', // Add this line
  },
  signupText: {
    color: 'white',
  },
  signupButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButtonImage: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginBottom: windowHeight / 60,
    resizeMode: 'contain',
  },
});

export default HomeScreen;