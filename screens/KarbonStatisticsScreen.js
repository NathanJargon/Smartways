import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity, ImageBackground, Image, ScrollView, RefreshControl } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../screens/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

const KarbonStatisticsScreen = (props) => {
  const [date, setDate] = useState(new Date());
  const screenWidth = Dimensions.get('window').width;
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const year = date.getFullYear().toString();
  const [period, setPeriod] = useState('Daily');
  const [chartData, setChartData] = useState(null);
  const nth = 5;
  let labels = [];
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
  
      const unsubscribe = onSnapshot(userDoc, (doc) => {
        const userProfile = doc.data().profile || null;
        setUserProfileImage(userProfile);
      });
  
      // Clean up the subscription on unmount
      return () => unsubscribe();
    }
  }, []);
  

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDoc);
  
          if (userSnap.exists()) {
            const userName = userSnap.data().name || null;
            const userProfile = userSnap.data().profile || null;
  
            // Store the data in AsyncStorage
            await AsyncStorage.setItem('userName', userName);
            await AsyncStorage.setItem('userProfile', userProfile);
  
            setUserName(userName);
            setUserProfileImage(userProfile);
          }
        }
      } catch (error) {
      }
    };
  
    fetchUserName(); 
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDoc);
  
          if (userSnap.exists()) {
            const emissionLogs = userSnap.data().emissionlogs || [];
            // console.log(emissionLogs);
            let filteredLogs = emissionLogs.filter(log => {
              const logDate = new Date(log.day);
              // console.log(logDate);
              return logDate.getFullYear() === date.getFullYear() &&
                     logDate.getMonth() === date.getMonth();
            });
  
            // If there's no data for the selected month, set the filteredLogs to a default value
            if (filteredLogs.length === 0) {
              filteredLogs = [{ day: 'Day 1', value: '0' }];
            }
            
            // console.log(filteredLogs);
            
            setChartData({
              labels: filteredLogs.map(log => `Day ${log.day.split('-')[2]}`),
              datasets: [
                {
                  data: filteredLogs.map(log => Number(log.value))
                }
              ]
            });
          }
        }
        setIsLoading(false); 
      } catch (error) {
        setIsLoading(false);
      }
    };
  
    fetchUserData(); 
  }, [date]);

  const getUserNameAndProfile = async () => {
    try {
      const cachedUserName = await AsyncStorage.getItem('userName');
      const cachedUserProfile = await AsyncStorage.getItem('userProfile');
  
      if (cachedUserName !== null && cachedUserProfile !== null) {
        // The data is cached, use it
        setUserName(cachedUserName);
        setUserProfileImage(cachedUserProfile);
      } else {
        // The data is not cached, fetch it
        fetchUserName();
      }
    } catch (error) {
    }
  };
  
  useEffect(() => {
    getUserNameAndProfile();
  }, []);

  return (
    <View style={styles.container}>

    <View style={styles.roundedBox}>
      <View style={styles.buttonContainer}>
        <Icon 
          style={styles.icon1} 
          name="chevron-left" 
          size={20} 
          onPress={() => setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))}
        />
        <Text style= {{ fontSize: 20, fontFamily: "Montserrat-Light" }} >{month} {year}</Text>
        <Icon 
          style={styles.icon2} 
          name="chevron-right" 
          size={20} 
          onPress={() => setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))}
        />
      </View>
    </View>

      <View style={styles.periodButton}>
        <TouchableOpacity style={styles.periodButton}>
          <Text style={styles.buttonText}>Daily</Text>
        </TouchableOpacity>
      </View>

      <Text style={ styles.header1 }>Your {period} Record</Text>
      <Text style={ styles.header2 }>of Emission</Text>



      {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          chartData && (
            <LineChart
              data={chartData}
              width={screenWidth-60}
              height={320}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: 'rgba(102, 204, 153, 0.5)',
                backgroundGradientFrom: 'rgba(102, 204, 153, 0.5)',
                backgroundGradientTo: 'rgba(102, 204, 153, 0.5)',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
                marginTop: 40,
              }}
            />
          )
        )}


      <TouchableOpacity style={styles.roundBoxBelowGraph} onPress={() => {
        props.navigation.navigate('Karbon Leaderboard');
      }}>
        <View style={{ left: 20, top: -3 }}>
          <Icon name="trophy" size={32} color="gold" />
        </View>
        <Text style={styles.belowText1}>Community</Text>
        <Text style={styles.belowText2}>Leaderboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Profile');
        }}
        style={styles.cardContainer}
      >
        <ImageBackground source={require('../assets/nav7.png')} style={styles.profileBox}>
          <View style={styles.profileContainer}>
          {userProfileImage ? (
              <Image source={{ uri: userProfileImage }} style={{ position: 'absolute', right: 250, top: 10, width: 50, height: 50, borderRadius: 25 }} />
            ) : (
              <Icon name="user" size={50} style={{ position: 'absolute', right: 250, top: 10 }} color="#000" />
            )}
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{userName ? `Keep it up, ${userName}!` : 'Username!'}</Text>
          </View>
          </ImageBackground>
        </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundBoxBelowGraph: {
    position: 'absolute',
    top: 420,
    margin: 50,
    height: 70, 
    width: '70%',
    padding: 20,
    borderRadius: 50,
    backgroundColor: '#7ED957', 
  },
  belowText1: { // roundedBlowBelowGraph
    fontSize: 19,
    bottom: 40,
    left: 80,
    fontFamily: 'Montserrat-Light',
    color: 'black',
  },
  belowText2: { // roundedBlowBelowGraph
    fontSize: 19,
    fontFamily: 'Montserrat-Light',
    color: 'black',
    bottom: 40,
    left: 80,
  },
  header1: {
    position: 'absolute',
    top: 100,
    fontSize: 27,
    fontFamily: 'Montserrat-Light',
  },
  header2: {
    position: 'absolute',
    top: 130,
    fontSize: 27,
    fontFamily: 'Montserrat-Light',
  },
  periodButton: {
    position: 'absolute',
    top: 18,
    left: 110,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black', 
    textAlign: 'center',
    fontSize: 27,
    padding: 10,
    fontFamily: 'Codec',
  },
  roundedBox: {
    position: 'absolute',
    top: 45,
    left: 30,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: '#000',
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  cardContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '90%',
    height: 70,
    alignSelf: 'center',
    top: 550, // Adjust this value as needed
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileBox: {
    right: 10,
    width: 330,
    height: 70,
    borderRadius: 20,
    overflow: 'hidden',
  },
  nameContainer: {
    flex: 3,
    justifyContent: 'center',
    marginLeft: 10, // Add this line if you want some space between the icon and the text
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
  },
  nameText: {
    position: 'absolute',
    fontSize: 20,
    fontFamily: 'Montserrat-Light',
    color: 'black',
    padding: 10,
    left: 100,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon1: {
    marginRight: 10,
  },
  icon2: {
    marginLeft: 10,
  }
});

export default KarbonStatisticsScreen;