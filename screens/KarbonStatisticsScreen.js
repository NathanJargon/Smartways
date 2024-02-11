import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity, ImageBackground, Image, ScrollView, RefreshControl } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../screens/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import Background from '../components/Background';
import DateTimePicker from '@react-native-community/datetimepicker';


const KarbonStatisticsScreen = (props) => {
  const [date, setDate] = useState(new Date());
  const screenWidth = Dimensions.get('window').width;
  const [chartData, setChartData] = useState(null);
  const nth = 5;
  let labels = [];
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [period, setPeriod] = useState('DAILY');
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  
  const [formattedDate, setFormattedDate] = useState(`${currentDay} ${currentMonth}`);


  const DatehandlePress = () => {
    setShowDatePicker(true);
  };

  const PeriodhandlePress = (newPeriod) => {
    setSelectedPeriod(newPeriod.toLowerCase());
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  
    // Format the date
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    setFormattedDate(`${day} ${month}`);
  };

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

            setUserName(userName);
            setUserProfileImage(userProfile);
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchUserName(); 
  }, []);


  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const calculateMonthlyLogs = (logs) => {
    let monthlyLogs = {};
    logs.forEach(log => {
      const logDate = new Date(log.day);
      const month = `${logDate.getFullYear()}-${logDate.getMonth() + 1}`;
      if (monthlyLogs[month]) {
        monthlyLogs[month] += Number(log.value);
      } else {
        monthlyLogs[month] = Number(log.value);
      }
    });
    return Object.keys(monthlyLogs).map(month => ({ day: month, value: monthlyLogs[month] }));
  };
  
  const calculateYearlyLogs = (logs) => {
    let yearlyLogs = {};
    logs.forEach(log => {
      const logDate = new Date(log.day);
      const year = logDate.getFullYear().toString();
      if (yearlyLogs[year]) {
        yearlyLogs[year] += Number(log.value);
      } else {
        yearlyLogs[year] = Number(log.value);
      }
    });
    return Object.keys(yearlyLogs).map(year => ({ day: year, value: yearlyLogs[year] }));
  };



  // useEffect for fetching the date
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
            
            let filteredLogs = emissionLogs.filter(log => {
              const logDate = new Date(log.day);
              return logDate.getFullYear() === date.getFullYear() &&
                    logDate.getMonth() === date.getMonth() &&
                    logDate.getDate() === date.getDate();
            });

            // If there's no data for the selected period, set the periodLogs to a default value
            if (filteredLogs.length === 0) {
              filteredLogs = [{ day: '00:00', value: '0', time: '08:00' }];
            }

            setChartData({
              labels: filteredLogs.map(log => log.time || '08:00'),
              datasets: [
                {
                  data: filteredLogs.map(log => Number(log.value))
                }
              ]
            });

            setSelectedLogs(filteredLogs);
          }
        }
        setIsLoading(false); 
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchUserData(); 
  }, [date]);


    // useEffect for fetching the period
    useEffect(() => {
      const fetchPeriodData = async () => {
        try {
          setIsLoading(true);
          const user = auth.currentUser;
          if (user) {
            const userDoc = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userDoc);

            if (userSnap.exists()) {
              let emissionLogs = userSnap.data().emissionlogs || [];
              const currentMonth = new Date().getMonth();
              const currentYear = new Date().getFullYear();
    
              // Filter logs for the current month
              emissionLogs = emissionLogs.filter(log => {
                const logDate = new Date(log.day);
                return logDate.getFullYear() === currentYear && logDate.getMonth() === currentMonth;
              });
    
              // Sort the logs by day
              emissionLogs.sort((a, b) => new Date(a.day) - new Date(b.day));
              let periodLogs;
              let labels;
              if (selectedPeriod === 'daily') {
                periodLogs = emissionLogs;
                labels = periodLogs.map(log => `Day ${log.day.split('-')[2]}`);
              } else if (selectedPeriod === 'monthly') {
                periodLogs = calculateMonthlyLogs(emissionLogs);
                labels = periodLogs.map(log => `${monthNames[Number(log.day.split('-')[1]) - 1]} ${log.day.split('-')[0]}`);
              } else if (selectedPeriod === 'yearly') {
                periodLogs = calculateYearlyLogs(emissionLogs);
                labels = periodLogs.map(log => `Year ${log.day}`);
              }

              // If there's no data for the selected period, set the periodLogs to a default value
              if (periodLogs.length === 0) {
                periodLogs = [{ day: 'Day 1', value: '0' }];
                labels = ['Day 1'];
              }

              setChartData({
                labels: labels,
                datasets: [
                  {
                    data: periodLogs.map(log => Number(log.value))
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

      fetchPeriodData();
    }, [selectedPeriod]);

  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold' }}>Loading..</Text>
      </View>
    );
  }
  
  return (
    <ImageBackground
    source={require('../assets/statbg.png')}
    style={styles.background}
    >
    <View style={styles.container}>
      <TouchableOpacity onPress={DatehandlePress} style={styles.row}>
        <View style={styles.leftContainer}>
          <Image source={require('../assets/icons/calendar.png')} style={styles.image} />
          <Text style={styles.text}>{formattedDate}</Text>
        </View>
      </TouchableOpacity>


      <Text style={styles.title1}>YOUR {period} RECORD</Text>
      <Text style={styles.title2}>OF EMISSION</Text>


      <View style={styles.buttonsrow}>
        <TouchableOpacity onPress={() => PeriodhandlePress('daily')}>
          <Text style={styles.buttonText}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => PeriodhandlePress('monthly')}>
          <Text style={styles.buttonText}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => PeriodhandlePress('yearly')}>
          <Text style={styles.buttonText}>Yearly</Text>
        </TouchableOpacity>
      </View>



      {isLoading ? (
      <Text>Loading...</Text>
        ) : (
          chartData && (
            <LineChart
              data={chartData}
              width={screenWidth-50}
              height={310}
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
                borderRadius: 16,
                padding: 5,
              }}
            />
          )
        )}

    <TouchableOpacity onPress={() => { props.navigation.navigate('Karbon Leaderboard') }}  style={styles.leaderboardButton}>
      <ImageBackground source={require('../assets/nav7.png')} style={styles.leaderboardBackground}>
        <Image source={require('../assets/icons/podium.png')} style={styles.leaderboardIcon} />
        <Text style={styles.leaderboardText}>COMMUNITY RANKINGS</Text>
      </ImageBackground>
    </TouchableOpacity>


    </View>
    {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </ImageBackground>
  );}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
      flex: 1,
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center', // this will center the children horizontally
      alignItems: 'center',
      width: '100%', 
      padding: 5,
    },
    buttonsrow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%', 
      padding: 10,
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Montserrat-Light',
      color: '#000',
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 40,
      height: 40,
      marginRight: 10,
    },
    text: {
      fontSize: 16,
      fontFamily: 'Montserrat-Light',
    },
    title1: {
      fontSize: 24,
      fontFamily: 'Codec',
      marginTop: 10,
      textAlign: 'center',
    },
    title2: {
      fontSize: 24,
      fontFamily: 'Codec',
      textAlign: 'center',
    },
    leaderboardButton: {
      width: '100%',
      height: 60,
      marginTop: 20,
    },
    leaderboardBackground: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 20,
      overflow: 'hidden'
    },
    leaderboardIcon: {
      width: 30,
      height: 30,
      marginRight: 10,
      margin: 20,
      marginTop: 10,
    },
    leaderboardText: {
      fontSize: 15,
      fontFamily: 'Codec',
      padding: 10,
    },
  });

export default KarbonStatisticsScreen;