<<<<<<< HEAD
import React, { useState, useEffect } from 'react';

import { View, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
=======
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome as Icon } from '@expo/vector-icons';
<<<<<<< HEAD
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import KarbonStatistics from './screens/KarbonStatisticsScreen.js';
import KarbonCalculator from './screens/KarbonCalculator.js';
import EducationScreen from './screens/EducationScreen';
import KarbonLeaderboard from './screens/KarbonLeaderboard.js';
import KarbonMap from './screens/KarbonMapScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './screens/Profile';
import Step1 from './screens/Step1';
import Step2 from './screens/Step2';

// login
import LoginHomeScreen from './screens/LoginHomeScreen.tsx';
import RegisterScreen from './screens/RegisterScreen.tsx';
import LoginScreen from './screens/LoginScreen.tsx';
import Dashboard from './screens/Dashboard.tsx';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.tsx';

const carLoanColor = require('./assets/icons/car-loan-color.png');
const direction = require('./assets/icons/direction.png');
const directionColor = require('./assets/icons/direction-color.png');
const home = require('./assets/icons/home.png');
const homeColor = require('./assets/icons/home-color.png');
const analytics = require('./assets/icons/analytics.png');
const analyticsColor = require('./assets/icons/analytics-color.png');
const carLoan = require('./assets/icons/car-loan.png');
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();


function RootStackScreen() {
  return (
    <RootStack.Navigator initialRouteName="HomeScreen">
      <RootStack.Screen name="HomeScreen" component={LoginHomeScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <RootStack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}
=======
import HomeScreen from 'autocarb/screens/HomeScreen.js';
import DetailsScreen from './screens/DetailsScreen';
import CarbonFootprintScreen from './screens/CarbonFootprintScreen';
import EducationScreen from './screens/EducationScreen';
import Profile from './screens/Profile';
import News from './screens/News';
import LeaderboardScreen from './screens/LeaderboardScreen'; 
import GamificationScreen from './screens/GamificationScreen'; 
import RealTimeScreen from './screens/RealTimeScreen';
import Step1 from './screens/Step1';
import Step2 from './screens/Step2';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen name="HomeStack" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
<<<<<<< HEAD
      <Stack.Screen name="Calculator" component={KarbonCalculator} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={KarbonStatistics} options={{ headerShown: false }} />
=======
      <Stack.Screen name="CarbonFootprintScreen" component={CarbonFootprintScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Realtime Updates" component={RealTimeScreen} options={{ headerShown: false }} />
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
    </Stack.Navigator>
  );
}

<<<<<<< HEAD
function HomeScreenStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Dashboard" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Calculator" component={KarbonCalculator} options={{ headerShown: false }} />
      <Stack.Screen name="Statistics" component={KarbonStatistics} options={{ headerShown: false }} />
      <Stack.Screen name="Map" component={KarbonMap} options={{ headerShown: false }} />
=======
function EducationStack() {
  return (
    <Stack.Navigator initialRouteName="EducationHome">
      <Stack.Screen name="EducationHome" component={EducationScreen} options={{ title: 'Education', headerShown: false }} />
      <Stack.Screen name="Step1" component={Step1} options={{ title: 'First' }} />
      <Stack.Screen name="Step2" component={Step2} options={{ title: 'Second' }} />
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
    </Stack.Navigator>
  );
}

<<<<<<< HEAD
function KarbonMapStack() {
  return (
    <Stack.Navigator initialRouteName="KarbonMapScreen">
      <Stack.Screen name="KarbonMapScreen" component={KarbonMap} options={{ headerShown: false }} />
      <Stack.Screen name="Karbon Leaderboard" component={KarbonLeaderboard} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function KarbonStatisticsStack() {
  return (
    <Stack.Navigator initialRouteName="KarbonStatistics">
      <Stack.Screen name="KarbonStatistics" component={KarbonStatistics} options={{ headerShown: false }} />
      <Stack.Screen name="Karbon Leaderboard" component={KarbonLeaderboard} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
=======
function CarbonFootprintStack() {
  return (
    <Stack.Navigator initialRouteName="CarbonFootprint">
      <Stack.Screen name="CarbonFootprint" component={CarbonFootprintScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Gamification" component={GamificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ headerShown: false }} />
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
    </Stack.Navigator>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  return (
<<<<<<< HEAD
    <ImageBackground 
      source={require('./assets/nav1.png')} 
      style={{
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        bottom: 0,
        overflow: 'hidden'
      }} 
    >
      <View style={{ flexDirection: 'row', marginTop: 'auto', bottom: 5 }}>
=======
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      paddingBottom: 10, 
      backgroundColor: 'white',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      position: "absolute",
      bottom: 0,
    }}>
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
<<<<<<< HEAD
=======
            : route.name === 'Karbon Calculator'
            ? 'Calculate'
            : route.name === 'Real Time Karbon Updates'
            ? 'Real Time'
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

<<<<<<< HEAD
        if (!isFocused && !event.defaultPrevented) {
          navigation.reset({
            index: 0,
            routes: [{ name: route.name }],
          });
        }
      };
=======
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
<<<<<<< HEAD
              marginTop: 10,
            }}
          >
            <View style={{ padding: 10 }}>
              {label === 'Home' ? (
                <Image source={isFocused ? homeColor : home} style={{width: 30, height: 30}} />
              ) : label === 'Karbon Calculator' ? (
                <Image source={isFocused ? carLoanColor : carLoan} style={{width: 30, height: 30}} />
              ) : label === 'Karbon Statistics' ? (
                <Image source={isFocused ? analyticsColor : analytics} style={{width: 30, height: 30}} />
              ) : label === 'Karbon Map' ? (
                <Image source={isFocused ? directionColor : direction} style={{width: 30, height: 30}} />
=======
              borderBottomWidth: 2,
              borderBottomColor: isFocused ? '#4caf50' : '#ccc',
              marginTop: 10,
              marginHorizontal: 8,
            }}
          >
            <View>
              {label === 'Home' ? (
                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: isFocused ? '#4caf50' : '#f8f8f8', alignItems: 'center', justifyContent: 'center', bottom: 30, elevation: 10 }}>
                  <Icon name="home" size={40} color={isFocused ? '#ffffff' : '#4caf50'} />
                </View>
              ) : label === 'Education' || label === 'Learn' ? (
                <Icon name="book" size={30} color={isFocused ? '#4caf50' : '#222' } />
              ) : label === 'Karbon Calculator' || label === 'Calculate' ? (
                <Icon name="calculator" size={30} color={isFocused ? '#4caf50' : '#222'} />
              ) : label === 'News' || label === 'Articles' ? (
                <Icon name="newspaper-o" size={30} color={isFocused ? '#4caf50' : '#222'} />
              ) : label === 'Profile' ? (
                <Icon name="user" size={30} color={isFocused ? '#4caf50' : '#222'} />
              ) : label === 'Leaderboard' ? (
                <Icon name="trophy" size={25} color={isFocused ? '#4caf50' : '#222'} />
              ) : label === 'Gamification' ? (
                <Icon name="money" size={25} color={isFocused ? '#4caf50' : '#222'} />
              ) : label === 'Real Time' ? (
                <Icon name="cogs" size={25} color={isFocused ? '#4caf50' : '#222'} /> 
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
              ) : (
                <Icon name="circle-o" size={30} color={isFocused ? '#4caf50' : '#222'} />
              )}
            </View>
<<<<<<< HEAD
=======
              {label !== 'Home' && <Text style={{ color: isFocused ? '#4caf50' : '#222', marginTop: 5, fontSize: 10, textAlign: 'center' }}>{label}</Text>}
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
          </TouchableOpacity>
        );
      })}
    </View>
<<<<<<< HEAD
    </ImageBackground>
  );
}

function MainTabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home" tabBar={props => <CustomTabBar {...props} />}>

    <Tab.Screen 
      name="Home" 
      component={HomeScreenStack} 
      options={{
        headerShown: false,
        headerTitle: '',
      }}/>

  <Tab.Screen 
    name="Karbon Calculator" 
    component={KarbonCalculator} 
    options={{ headerShown: false }}
  />

  <Tab.Screen 
    name="Karbon Map" 
    component={KarbonMapStack} 
    options={{ headerShown: false }}
  />

  <Tab.Screen 
    name="Karbon Statistics" 
    component={KarbonStatisticsStack} 
    options={{ headerShown: false }}
  />
    </Tab.Navigator>
  );
}

function NavigationHandler() {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    'Codec': require('./assets/fonts/Codec.ttf'),
    'Horizon': require('./assets/fonts/Horizon.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat Light.otf'),
    'Roc': require('./assets/fonts/Roc.otf')
  });

  useEffect(() => {
    if (!fontsLoaded) return;

    AsyncStorage.getItem('user').then((userDataString) => {
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const currentTime = new Date().getTime();
        // Check if less than 30 minutes have passed
        if (currentTime - userData.loginTime < 30 * 60 * 1000) {
          navigation.navigate('Main');
        }
      }
    });
  }, [fontsLoaded, navigation]);

  if (!fontsLoaded) {
    return null;
  }

  return <RootStackScreen />;
}

export default function App() {
  return (
    <NavigationContainer>
      <NavigationHandler />
    </NavigationContainer>
  );
}
=======
  );
}


  export default function App() {
    const Tab = createBottomTabNavigator();
  
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home" tabBar={props => <CustomTabBar {...props} />}>

        <Tab.Screen 
          name="Articles" 
          component={News} 
          options={({ navigation }) => ({ 
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  accessibilityRole="button"
                  onPress={() => navigation.navigate('Profile')}
                  style={{ 
                    marginRight: 10, 
                    width: 40, 
                    height: 40, 
                    borderRadius: 20, 
                    backgroundColor: 'white', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                  }}
                >
                  <Icon name="user" size={30} color="#000" />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              backgroundColor: 'rgba(11, 156, 49, 0.4)', 
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />

        <Tab.Screen 
          name="Education" 
          component={EducationStack} 
          options={({ navigation }) => ({ 
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  accessibilityRole="button"
                  onPress={() => navigation.navigate('Profile')}
                  style={{ 
                    marginRight: 10, 
                    width: 40, 
                    height: 40, 
                    borderRadius: 20, 
                    backgroundColor: 'white', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                  }}
                >
                  <Icon name="user" size={30} color="#222" />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              backgroundColor: 'rgba(11, 156, 49, 0.4)', 
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />


      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={({ navigation }) => ({ 
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => navigation.navigate('Profile')}
                style={{ 
                  marginRight: 10, 
                  width: 40, 
                  height: 40, 
                  borderRadius: 20, 
                  backgroundColor: 'white', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                }}
              >
                  <Icon name="user" size={30} color="#222" />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              backgroundColor: 'rgba(11, 156, 49, 0.4)', 
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
                
        <Tab.Screen 
          name="Karbon Calculator" 
          component={CarbonFootprintStack} 
          options={({ navigation }) => ({ 
            headerRight: () => (
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => navigation.navigate('Profile')}
                style={{ 
                  marginRight: 10, 
                  width: 40, 
                  height: 40, 
                  borderRadius: 20, 
                  backgroundColor: 'white',  
                  alignItems: 'center', 
                  justifyContent: 'center', 
                }}
              >
              <Icon name="user" size={30} color="#222" />
            </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: 'rgba(11, 156, 49, 0.4)', 
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
          
        <Tab.Screen 
          name="Real Time Karbon Updates" 
          component={RealTimeScreen} 
          options={({ navigation }) => ({ 
            headerRight: () => (
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => navigation.navigate('Profile')}
                style={{ 
                  marginRight: 10, 
                  width: 40, 
                  height: 40, 
                  borderRadius: 20, 
                  backgroundColor: 'white', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                }}
              >
              <Icon name="user" size={30} color="#222" />
            </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: 'rgba(11, 156, 49, 0.4)', 
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />

        </Tab.Navigator>
      </NavigationContainer>
    );
  }
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
