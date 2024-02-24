import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Animated, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

function HomeScreen({ navigation }) {
  const [bottomContent, setBottomContent] = useState('default');
  const bottomHeight = useRef(new Animated.Value(windowHeight / 3.5)).current;

  const animateHeightChange = (newHeight) => {
    Animated.timing(bottomHeight, {
      toValue: newHeight,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };


  return (
    <ImageBackground source={require('../assets/image1.png')} style={styles.container}>
      <AnimatedImageBackground source={require('../assets/appBackground.png')} style={[styles.bottomContainer, { height: bottomHeight }]}>

        {bottomContent === 'default' ? (
          <>
            <TouchableOpacity style={styles.button} onPress={() => { setBottomContent('login'); animateHeightChange(windowHeight / 1.5); }}>
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
            <Button mode="contained" onPress={() => console.log('Pressed')}>
              Submit
            </Button>
          </View>
        )}
      </AnimatedImageBackground>
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
    marginBottom: 10,
  },
});

export default HomeScreen;