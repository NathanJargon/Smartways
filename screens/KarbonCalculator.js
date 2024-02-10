import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Switch, ImageBackground, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import JapanFishPalette from './JapanFishPalette.js';
import Background from '../components/Background';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db, collection } from '../screens/FirebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion, FieldValue, collectionGroup, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import moment from 'moment';

function CarbonFootprintScreen() {
  let [fontsLoaded, error] = useFonts({
    'Codec': require('../assets/fonts/Codec.ttf'),
    'Horizon': require('../assets/fonts/Horizon.ttf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat Light.otf'),
    'Roc': require('../assets/fonts/Roc.otf')
  });
  
  
  const [litersValue, setLitersValue] = useState('');
  const [kilometersValue, setKilometersValue] = useState('');
  const [animation] = useState(new Animated.Value(0));
  const allInputsFilled = litersValue !== '' && kilometersValue !== '';
  const [glowAnim] = useState(new Animated.Value(0));
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [lastPressedDate, setLastPressedDate] = useState(null);



  const calculateCarbonFootprint = () => {
    const gallons = parseFloat(litersValue) * 0.264172;
    const miles = parseFloat(kilometersValue) * 0.62137;

    const milesPerGallon = miles / gallons;

    const totalCarbonFootprint = ((8.89 * Math.pow(10, -3)) / gallons) * (1 / milesPerGallon) * (1 / 0.993);
    //console.log(totalCarbonFootprint);
    return totalCarbonFootprint.toFixed(3);
  };

  useEffect(() => {
    const fetchLastPressedDate = async () => {
      const date = await AsyncStorage.getItem('lastPressedDate');
      setLastPressedDate(date);
    };
  
    fetchLastPressedDate();
  }, []);

  const handleCalculate = async () => {
    Keyboard.dismiss();
    const totalCarbonFootprint = calculateCarbonFootprint();
    setCarbonFootprint(totalCarbonFootprint);
    startGlowAnimation();
  
    // Get the current date
    const currentDate = moment().format('YYYY-MM-DD');
  
    // Check if the calculate button was already pressed today
    if (!lastPressedDate || !moment(lastPressedDate).isSame(currentDate, 'day')) {
      // If it wasn't pressed today, then push the data to the emission log
      // and update the last pressed date
  
      const uid = auth.currentUser.uid;
  
      // Push data to the user's emission log and update the last pressed date
      const emissionLog = { day: currentDate, value: totalCarbonFootprint };
      const userDoc = doc(db, 'users', uid);
      await updateDoc(userDoc, {
        emissionlogs: arrayUnion(emissionLog),
        lastPressedDate: currentDate
      });
  
      // Save the current date as the last pressed date in AsyncStorage
      await AsyncStorage.setItem('lastPressedDate', currentDate);
      setLastPressedDate(currentDate);
    }
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
    <Background style={styles.backgroundImage}>


      <Image source={require('../assets/assessbg.png')} style={styles.topImage} />


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
          GHGs
        </Text>
      </Animated.View>

      <View style={styles.container}>
        <View style={styles.row}>
        <View style={[styles.rightMargin]}>
          <ImageBackground source={require('../assets/nav7.png')} style={styles.imageBackground}>
            <Text style={styles.label1}>Gallon</Text>
            <TextInput
              style={styles.input}
              value={litersValue}
              onChangeText={setLitersValue}
              placeholder="Liters"
              keyboardType="numeric"
            />
          </ImageBackground>
        </View>

        <View>
          <ImageBackground source={require('../assets/nav5.png')} style={styles.imageBackground2}>
            <Text style={styles.label2}>Miles</Text>
            <TextInput
              style={styles.input2}
              value={kilometersValue}
              onChangeText={setKilometersValue}
              placeholder="Kilometers"
              keyboardType="numeric"
            />
          </ImageBackground>
        </View>
      </View>
      <Animated.View style={[styles.button, allInputsFilled && buttonGlow]}>
      <TouchableOpacity
        onPress={handleCalculate}
        disabled={!allInputsFilled}
      >
        <Text style={styles.buttonText}>Calculate and Record</Text>
      </TouchableOpacity>
      </Animated.View>

      <Text style={styles.lowerText}>Can only record once a day!</Text>

      <Animated.View style={{ opacity: animation }}>
      <Text style={{ fontSize: 20 }}>
        Your total carbon footprint is:
      </Text>
      <Text style={{ fontSize: 20, }}>{carbonFootprint}</Text>
      <Text style={{ fontSize: 20 }}>
        metric tons CO
        <Text style={{ fontSize: 10, bottom: -2 }}>2</Text>
        E/mile
      </Text>
      </Animated.View>
    </View>
    </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5,
    top: 70,
  },
  lowerText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Montserrat-Light',
    paddingTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  input2: {
    width: '90%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  label1: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Codec',
  },
  label2: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Codec',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '10%',
  },
  imageBackground: {
    width: 150,
    height: 200,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageBackground2: {
    width: 150,
    height: 200,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  topImage: {
    position: 'absolute',
    bottom: -755,
  },
  text1: {
    fontSize: 45,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roc',
    paddingTop: 0,
  },
  text21: {
    paddingTop: 0,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Codec',
  },
  text22: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Codec',
  },
  text3: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Codec',
    bottom: 10,
  },
  text4: {
    fontSize: 25,
    bottom: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Codec',
  },
  text5: {
    fontSize: 10,
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
    backgroundColor: JapanFishPalette.text6,
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
  inputContainer: {
    width: '40%',
  },
  button: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7ED957',
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
  buttonText: {
    fontSize: 12,
    top: 2,
    fontFamily: 'Codec',
  }
});

export default CarbonFootprintScreen;