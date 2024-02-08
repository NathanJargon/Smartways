import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Switch, ImageBackground, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

function CarbonFootprintScreen() {
  let [fontsLoaded, error] = useFonts({
    'Codec': require('../assets/fonts/Codec.ttf'),
    'Horizon': require('../assets/fonts/Horizon.ttf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat Light.otf'),
    'Roc': require('../assets/fonts/Roc.otf')
  });
  
  if (!fontsLoaded) {
    console.log("Fonts are not loaded");
  }
  
  if (error) {
    console.error("Error loading fonts: ", error);
  }
  
  const [litersValue, setLitersValue] = useState('');
  const [kilometersValue, setKilometersValue] = useState('');
  const [animation] = useState(new Animated.Value(0));
  const allInputsFilled = litersValue !== '' && kilometersValue !== '';
  const [glowAnim] = useState(new Animated.Value(0));
  const [carbonFootprint, setCarbonFootprint] = useState(0);

  const calculateCarbonFootprint = () => {
    const gallons = parseFloat(litersValue) * 0.264172;
    const miles = parseFloat(kilometersValue) * 0.62137;

    const milesPerGallon = miles / gallons;

    const totalCarbonFootprint = ((8.89 * Math.pow(10, -3)) / gallons) * (1 / milesPerGallon) * (1 / 0.993);

    return totalCarbonFootprint.toFixed(3);
  };


  const handleCalculate = () => {
    Keyboard.dismiss();
    const totalCarbonFootprint = calculateCarbonFootprint();
    setCarbonFootprint(totalCarbonFootprint);
    startGlowAnimation();
  };

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  
  const buttonGlow = {
    backgroundColor: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['green', '#00ff00']
    }),
    shadowColor: '#00ff00',
    shadowOpacity: glowAnim,
    shadowRadius: 10,
    elevation: 5,
  };
  
  const startGlowAnimation = () => {
    Animated.timing(glowAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false, 
    }).start();
  };

  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardStatus(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardStatus(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <ImageBackground source={require('../assets/assessbg.png')} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
      <Animated.View style={{ padding: 20, opacity: keyboardStatus ? 0 : 1 }}>
        <Text style={styles.text1}>Karbon</Text>
        <Text style={styles.text21}>You have emitted a</Text>
        <Text style={styles.text22}>total of</Text>
        <Text style={styles.text3}>{carbonFootprint}</Text>
        <Text style={styles.text4}>
          metric tons
        </Text>
        <Text style={styles.text4}>
          CO
          <Text style={styles.text5}>2</Text>
          E/mile
        </Text>
      </Animated.View>

      <View style={styles.container}>
            <View style={styles.row}>
        <View style={[styles.inputBox, styles.rightMargin]}>
          <Text style={styles.label}>Gallon</Text>
          <TextInput
            style={styles.input}
            value={litersValue}
            onChangeText={setLitersValue}
            placeholder="Liters"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Miles</Text>
          <TextInput
            style={styles.input}
            value={kilometersValue}
            onChangeText={setKilometersValue}
            placeholder="Kilometers"
            keyboardType="numeric"
          />
        </View>
      </View>
    <Animated.View style={[styles.button, allInputsFilled && buttonGlow]}>
      <TouchableOpacity onPress={handleCalculate} disabled={!allInputsFilled}>
        <Text style={styles.buttonText}>Calculate Carbon Emission</Text>
      </TouchableOpacity>
    </Animated.View>

      <Animated.View style={{ opacity: animation }}>
      <Text style={{ fontSize: 20 }}>
        Your total carbon footprint is:
      </Text>
      <Text style={{ fontSize: 20}}>{carbonFootprint}</Text>
      <Text style={{ fontSize: 20 }}>
        metric tons CO
        <Text style={{ fontSize: 10, bottom: -2 }}>2</Text>
        E/mile
      </Text>
      </Animated.View>
    </View>
    </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  text1: {
    fontSize: 45,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roc',
    paddingTop: 30,
  },
  text21: {
    paddingTop: 10,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  text22: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  text3: {
    fontSize: 60,
    color: 'white',
    textAlign: 'center',
  },
  text4: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  text5: {
    fontSize: 10,
    bottom: -2,
    color: 'white',
    textAlign: 'center',
  },  
  rightMargin: {
    marginRight: 30,
    marginLeft: -20,
  },
  inputBox: {
    width: '53%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '10%',
  },
  inputContainer: {
    width: '40%',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#4caf50',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#74D178',
    marginTop: 20,
    borderRadius: 20,
  },
  buttonGlow: {
    backgroundColor: 'green',
    shadowColor: '#00ff00',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default CarbonFootprintScreen;