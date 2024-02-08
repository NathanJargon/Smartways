import React, { useState, useEffect } from 'react';

import { firebaseApp, auth } from './screens/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 

import { View, TouchableOpacity, Text, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import JapanFishPalette from './screens/JapanFishPalette.js';
import KarbonStatistics from './screens/KarbonStatisticsScreen.js';
import KarbonCalculator from './screens/KarbonCalculator.js';
import EducationScreen from './screens/EducationScreen';
import KarbonLeaderboard from './screens/KarbonLeaderboard.js';
import KarbonMap from './screens/KarbonMapScreen.js';
import HomeScreen from './screens/HomeScreen.js';

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

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen name="HomeStack" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="CarbonFootprintScreen" component={KarbonCalculator} />
      <Stack.Screen name="Details" component={KarbonStatistics} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

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
    </Stack.Navigator>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      paddingBottom: 10, 
      backgroundColor: 'white',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      backgroundColor: JapanFishPalette.text6,
      position: "absolute",
      bottom: 0,
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

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
              ) : (
                <Icon name="circle-o" size={30} color={isFocused ? '#4caf50' : '#222'} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function MainTabNavigator() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          setUserName(user.displayName || null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName(); 
  }, []);  

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home" tabBar={props => <CustomTabBar {...props} />}>

    <Tab.Screen 
      name="Home" 
      component={HomeStack} 
      options={{
        headerShown: true,
        headerTitle: '',
        headerStyle: { height: 250, backgroundColor: JapanFishPalette.text6 }, 
        headerRight: () => (
          <TouchableOpacity onPress={() => {Profile}} style={{ position: 'absolute', right: 15, top: 20 }}>
            <Icon name="user" size={40} style={{ marginRight: 10, }} />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Text style={{ position: 'absolute', fontFamily: 'Codec', fontSize: 18, top: -20, }}>
              {userName ? `Welcome, ${userName}!` : 'Welcome, nameaaaaa!'}
            </Text>
            <Text style={{ fontFamily: 'Roc', left: 50, fontSize: 40, textAlign: 'center', top: 20, }}>Welcome to</Text>
            <Text style={{ fontFamily: 'Roc', left: 50, fontSize: 40, textAlign: 'center', top: 20 }}>KARBON</Text>
            <Text style={{ fontFamily: 'Montserrat-Light', left: 55, fontSize: 15, textAlign: 'center', top: 25, }}>Your journey to a sustainable</Text>
            <Text style={{ fontFamily: 'Montserrat-Light', left: 55, fontSize: 15, textAlign: 'center', top: 25, }}>tomorrow starts here.</Text>
          </View>
        ),
      }}
    />

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

export default function App() {
  
  let [fontsLoaded] = useFonts({
    'Codec': require('./assets/fonts/Codec.ttf'),
    'Horizon': require('./assets/fonts/Horizon.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat Light.otf'),
    'Roc': require('./assets/fonts/Roc.otf')
  });

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}
