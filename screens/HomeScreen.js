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
import { useFocusEffect } from '@react-navigation/native';

function HomeScreen({ navigation }) {

  const [fadeAnim] = useState(new Animated.Value(1));
  const [elevationAnim] = useState(new Animated.Value(0));
  const [userName, setUserName] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  let initialMount = true;

  useFocusEffect(
    React.useCallback(() => {
      if (initialMount) {
        setLoading(true);
        fetchUserData();
        initialMount = false;
      }
  
      return () => {};
    }, [])
  );


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
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDoc);
      
          if (userSnap.exists()) {
            const userName = userSnap.data().name || null;
            const userProfile = userSnap.data().profile || null;
      
            setUserName(userName);
            setUserProfileImage(userProfile);
            setLoading(false);
          }
        }
      }
      return () => unsub();

    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold' }}>Loading..</Text>
      </View>
    );
  }


  return (
    <ImageBackground source={require('../assets/homebg.png')} style={styles.container}>
      <ImageBackground source={require('../assets/nav3.png')} style={styles.headerImage}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 30 }}>
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

          {/* Profile User Icon to the Right */}
          <TouchableOpacity onPress={() => { navigateToScreen('Profile') }} style={styles.profileIcon}>
            {userProfileImage ? (
              <Image source={{ uri: userProfileImage }} style={{ width: 40, height: 40, borderRadius: 20 }} />
            ) : (
              <Image source={require('../assets/icons/leaderboardIcon.png')} style={{ width: 40, height: 40, borderRadius: 0 }} />
            )}
          </TouchableOpacity>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logoText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 35,
    marginLeft: 65,
  },
  logoTextBig: {
    fontFamily: 'Roc',
    fontSize: 50,
    marginLeft: 60,
  },
  subText1: {
    fontFamily: 'Montserrat-Light',
    fontSize: 12,
    marginLeft: 85,
  },
  subText2: {
    fontFamily: 'Montserrat-Light',
    fontSize: 12,
    marginLeft: 110,
  },
  welcomeText: {
    marginTop: 10,
    paddingRight: 10,
    fontFamily: 'Codec',
    fontSize: 20,
  }
  ,
  profileIcon: {
    marginTop: 25,
    marginRight: 15,
  },
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
  welcomeContainer: {
    marginLeft: 10,
    marginTop: 20,
    paddingLeft: 10,
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


export default HomeScreen;
