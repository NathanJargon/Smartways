import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';

function HomeScreen({ navigation }) {
    return (
      <ImageBackground source={require('../assets/image1.png')} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo-white-trans.png')} style={styles.logo} />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Powered by</Text>
          <Image source={require('../assets/icons/logo-white.png')} style={styles.footerImage} />
        </View>
        <ImageBackground source={require('../assets/appBackground.png')} style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <ImageBackground source={require('../assets/buttonContainer.jpg')} style={styles.buttonImage}>
              <Text style={styles.buttonText}>Login</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <ImageBackground source={require('../assets/buttonContainer.jpg')} style={styles.buttonImage}>
              <Text style={styles.buttonText}>Create Account</Text>
            </ImageBackground>
          </TouchableOpacity>
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
    height: windowHeight / 3.5,
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
});

export default HomeScreen;