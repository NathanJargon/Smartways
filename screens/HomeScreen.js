<<<<<<< HEAD
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../screens/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Animated, TouchableHighlight  } from 'react-native';
import { ImageBackground } from 'react-native';
import JapanFishPalette from './JapanFishPalette';
import Background from '../components/Background';
import { FontAwesome as Icon } from '@expo/vector-icons';

function HomeScreen({ navigation }) {

  const [fadeAnim] = useState(new Animated.Value(1));
  const [elevationAnim] = useState(new Animated.Value(0));
  const [userName, setUserName] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Animated.timing(elevationAnim, {
      toValue: 5,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []); 

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
  
      const unsubscribe = onSnapshot(userDoc, (doc) => {
        const userProfile = doc.data().profile || null;
        const userName = doc.data().name || null;
  
        setUserProfileImage(userProfile);
        setUserName(userName);
      });
  
      // Clean up the subscription on unmount
      return () => unsubscribe();
    }
  }, []);
  
  const navigateToScreen = (screenName) => {
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      navigation.navigate(screenName);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false,
      }).start();
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue != null) {
          const userData = JSON.parse(jsonValue);
          const userDoc = doc(db, 'users', userData.user.uid);
          const userSnap = await getDoc(userDoc);
  
          if (userSnap.exists()) {
            const userName = userSnap.data().name || null;
            const userProfile = userSnap.data().profile || null;
  
            setUserName(userName);
            setUserProfileImage(userProfile);
            setLoading(false);
          }
        } else {
          fetchUserName(); // Fetch from Firestore if not in AsyncStorage
        }
      } catch(e) {
        // error reading value
        console.error(e);
      }
    }
  
    fetchUserData();
  }, []);

  
  return (
    <Background style={styles.container}>
      <ImageBackground source={require('../assets/nav3.png')} style={styles.headerImage}>

        {/* Profile User Icon to the Right */}
        <TouchableOpacity onPress={() => { navigateToScreen('Profile') }} style={styles.profileIcon}>
          {userProfileImage ? (
            <Image source={{ uri: userProfileImage }} style={{ width: 40, height: 40, borderRadius: 20 }} />
          ) : (
            <Image source={{ uri: userProfileImage }} style={{ width: 40, height: 40, borderRadius: 20 }} />
          )}
        </TouchableOpacity>
  
        {/* Welcome Message to the Left */}
        <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          {userName ? `Welcome, ${userName}!` : 'Welcome,'}
        </Text>
          <Text style={styles.logoText}>Welcome to</Text>
          <Text style={styles.logoTextBig}>KARBON</Text>
          <Text style={styles.subText1}>Your journey to a sustainable</Text>
          <Text style={styles.subText2}>tomorrow starts here.</Text>
        </View>
      </ImageBackground>
  
      <View style={{ marginTop: 120 }}>
        <ScrollView
          contentContainerStyle={[styles.scrollContainer]}
          scrollEventThrottle={16}
        >
          <View style={styles.row}>
            {/* Box 1 */}
            <TouchableOpacity
              activeOpacity={0.6}
              underlayColor={JapanFishPalette.text8}
              onPress={() => navigateToScreen("Calculator")}
            >
              <Animated.View
                style={[
                  styles.box1,
                  {
                    opacity: fadeAnim,
                    elevation: elevationAnim,
                  },
                ]}
              >
                <ImageBackground source={require('../assets/nav5.png')} style={styles.box1}>
                <Text style={styles.text10}>Record and</Text>
                  <Text style={styles.text11}>calculate your</Text>
                  <Text style={styles.text12}>carbon emissions</Text>
                </ImageBackground>
              </Animated.View>
            </TouchableOpacity>

            {/* Box 2 */}
            <TouchableOpacity
              activeOpacity={0.6}
              underlayColor={JapanFishPalette.text8}
              onPress={() => navigateToScreen("Map")}
            >
              <Animated.View
                style={[
                  styles.box2,
                  {
                    opacity: fadeAnim,
                    elevation: elevationAnim,
                  },
                ]}
              >
                <ImageBackground source={require('../assets/nav7.png')} style={styles.box2}>
                  <Text style={styles.text21}>Know the fastest</Text>
                  <Text style={styles.text22}>and cleanest</Text>
                  <Text style={styles.text23}>route to your</Text>
                  <Text style={styles.text24}>destination</Text>
                </ImageBackground>
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Box 3 */}
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.6}
              underlayColor={JapanFishPalette.text8}
              onPress={() => navigateToScreen("Statistics")}
            >
              <Animated.View
                style={[
                  styles.box3,
                  {
                    opacity: fadeAnim,
                    elevation: elevationAnim,
                  },
                ]}
              >
                <ImageBackground source={require('../assets/nav5.png')} style={styles.box3}>
                  <Text style={styles.text31}>View your records</Text>
                  <Text style={styles.text32}>and data of your</Text>
                  <Text style={styles.text33}>carbon footprint</Text>
                </ImageBackground>
              </Animated.View>
            </TouchableOpacity>

            {/* Box 4 */}
            <TouchableOpacity
              activeOpacity={0.6}
              underlayColor={JapanFishPalette.text8}
              onPress={() => navigateToScreen("Profile")}
            >
              <Animated.View
                style={[
                  styles.box4,
                  {
                    opacity: fadeAnim,
                    elevation: elevationAnim,
                  },
                ]}
              >
                <ImageBackground source={require('../assets/nav7.png')} style={styles.box4}>
                  <Text style={styles.text41}>Edit your</Text>
                  <Text style={styles.text42}>personal profile</Text>
                </ImageBackground>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    top: 90,
    width: '120%',
    height: 225,
  },
  profileIcon: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
  welcomeContainer: {
    marginLeft: 10,
    marginTop: 20,
    paddingLeft: 10,
  },
  welcomeText: {
    position: 'absolute',
    fontFamily: 'Codec',
    fontSize: 18,
    top: 10,
    color: 'black',
  },
  logoText: {
    position: 'absolute',
    fontFamily: 'Roc',
    fontSize: 40,
    left: 50,
    top: 50,
    marginTop: 5,
    color: 'black',
  },
  logoTextBig: {
    position: 'absolute',
    fontFamily: 'Roc',
    fontSize: 50,
    left: 60,
    top: 100,
    textAlign: 'center',
    color: 'black',
  },
  subText1: {
    position: 'absolute',
    fontFamily: 'Montserrat-Light',
    fontSize: 15,
    left: 70,
    top: 150,
    textAlign: 'center',
    marginTop: 5,
    color: 'black',
  },
  subText2: {
    position: 'absolute',
    fontFamily: 'Montserrat-Light',
    fontSize: 15,
    left: 95,
    top: 170,
    textAlign: 'center',
    marginTop: 5,
    color: 'black',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  touchableHighlight: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5, 
    marginBottom: 10, 
  },  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  box1: {
    width: 140,
    height: 170,
    backgroundColor: JapanFishPalette.text4,
    borderRadius: 12,
    overflow: 'hidden',
    margin: 10,
  },
  text10: {
    position: 'absolute',
    bottom: 55,
    left: 5,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text11: {
    position: 'absolute',
    bottom: 35,
    left: 5,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text12: {
    position: 'absolute',
    bottom: 15,
    left: 5,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  box2: {
    width: 140,
    height: 170,
    backgroundColor: JapanFishPalette.text3,
    margin: 0,
    borderRadius: 12,
    overflow: 'hidden'
  },
  text21: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
    overflow: 'hidden'
  },
  text22: {
    position: 'absolute',
    top: 30,
    right: 10,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text23: {
    position: 'absolute',
    top: 50,
    right: 10,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text24: {
    position: 'absolute',
    top: 70,
    right: 10,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  box3: {
    width: 140,
    height: 170,
    backgroundColor: JapanFishPalette.text3,
    borderRadius: 12,
    overflow: 'hidden'
  },
  text31: {
    position: 'absolute',
    top: 10,
    left: 12,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text32: {
    position: 'absolute',
    top: 30,
    left: 15,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text33: {
    position: 'absolute',
    top: 50,
    left: 15,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  box4: {
    width: 140,
    height: 170,
    backgroundColor: JapanFishPalette.text4,
    borderRadius: 12,
    overflow: 'hidden',
    margin: -10,
  },
  text41: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text42: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
});


=======
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Animated } from 'react-native';
import { ImageBackground } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { ProgressCircle } from 'react-native-svg-charts';

function HomeScreen({ navigation }) {
  const [isStarted, setIsStarted] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const carbonFootprint = 456; 
  const maxFootprint = 1000; 

  const handlePress = () => {
    if (!isStarted) {
      navigation.navigate('Education');
    } else {
      navigation.navigate('Articles');
    }
    setIsStarted(true);
  };
  
  const newshandlePress = () => {
    if (!isWatched) {
      navigation.navigate('Carbon Footprint Assessment');
    } else {
      navigation.navigate('Real Time');
    }
    setIsWatched(true);
  };


  return (
    <ImageBackground source={require('autocarb/assets/homebg.png')} style={styles.container}>
      <ScrollView
        contentContainerStyle={[ styles.scrollContainer ]}
        scrollEventThrottle={16}
      >
        <View style={styles.contentContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
          />
  
            <View style={styles.carbonFootprintBox}>
            <Text style={[styles.boxTitle, styles.absoluteBoxTitleTop1]}>You're on track to</Text>
            <Text style={[styles.boxTitle, styles.absoluteBoxTitleTop2]}>decrease emissions by</Text>
            <ProgressCircle
              style={styles.progressCircle}
              progress={carbonFootprint / maxFootprint}
              progressColor={'#4caf50'}
            >
              <Text style={styles.percentageText}>{`${Math.round((carbonFootprint / maxFootprint) * 100)}%`}</Text>
            </ProgressCircle>
            <Text style={[styles.boxTitle, styles.absoluteBoxTitle2]}>this month</Text>
          </View>

          <View style={styles.buttonContainer}>

            <TouchableOpacity
              style={styles.pointsContainer1}
              onPress={handlePress}
              >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Icon name="arrow-left" size={24} color="#4caf50" style={styles.iconLeft} />
                <View>
                    {isStarted ? (
                      <>
                        <Text style={styles.pointsText}>{ ' Get' }</Text>
                        <Text style={styles.pointsText}>{ 'Updated!' }</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.pointsText}>{ " Let's get" }</Text>
                        <Text style={styles.pointsText}>{ 'Started!' }</Text>
                      </>
                    )}
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
            style={styles.pointsContainer2}
            onPress={newshandlePress}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                {isWatched ? (
                  <>
                    <Text style={styles.pointsText}>{ 'Check real-time' }</Text>
                    <Text style={styles.pointsText}>{ 'updates!' }</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.pointsText}>{ 'Calculate your' }</Text>
                    <Text style={styles.pointsText}>{ 'Carbon Footprint!' }</Text>
                  </>
                )}
              </View>
              <Icon name="arrow-right" size={24} color="#4caf50" style={styles.iconRight} />
            </View>
          </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressCircle: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  percentageText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft: 70,
    marginTop: 65,
    color: '#4caf50',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: -250,
    marginLeft: -29,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 450,
    height: 450,
    marginRight: -30,
    marginBottom: -180,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  pointsContainer1: {
    borderColor: '#4caf50',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    marginRight: 10,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 55,
  },

  pointsContainer2: {
    borderColor: '#4caf50',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    marginRight: 5,
    borderRadius: 20,
    marginBottom: 20,
    paddingRight: 45,
  },
  pointsText: {
    color: '#4caf50',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  iconarrow: {
    margin: 30,
  },
  pointsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 100,
    textAlign: 'center',
  },
  pointsValue: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  leaderboardContainer: {
    marginTop: 20,
  },
  leaderboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  leaderboardEntry: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  pointsTitle: {
    color: '#4caf50',
    fontSize: 10,
    textAlign: 'center',
  },
  pointsValue: {
    color: '#4caf50',
    fontSize: 20,
    textAlign: 'center',
  },
  pointsBox: {
    borderColor: '#4caf50',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    marginLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
    width: '70%',
    height: 77,
  },
  carbonFootprintBox: {
    borderColor: '#4caf50',
    borderWidth: 0,
    padding: 10,
    margin: 10,
    marginLeft: 20,
    borderRadius: 20,
    width: '60%',
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  absoluteBoxTitleTop1: {
    position: 'absolute',
    top: 40, 
    left: 80,
    fontSize: 12,
  },
  absoluteBoxTitleTop2: {
    position: 'absolute',
    top: 55, 
    left: 65,
    fontSize: 12,
  },
  absoluteBoxTitle2: {
    position: 'absolute',
    top: 145, 
    left: 78,
    fontSize: 20, 
  },
  boxValue: {
    fontSize: 34,
    color: '#4caf50',
    textAlign: 'center',
  },
  iconLeft: {
    position: 'absolute',
    right: 80,
    top: 10, 
  },
  
  iconRight: {
    position: 'absolute',
    left: 130, 
    top: 10, 
  },
});

>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
export default HomeScreen;
