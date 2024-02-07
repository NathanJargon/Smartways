import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome as Icon } from '@expo/vector-icons';
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

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen name="HomeStack" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="CarbonFootprintScreen" component={CarbonFootprintScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Realtime Updates" component={RealTimeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function EducationStack() {
  return (
    <Stack.Navigator initialRouteName="EducationHome">
      <Stack.Screen name="EducationHome" component={EducationScreen} options={{ title: 'Education', headerShown: false }} />
      <Stack.Screen name="Step1" component={Step1} options={{ title: 'First' }} />
      <Stack.Screen name="Step2" component={Step2} options={{ title: 'Second' }} />
    </Stack.Navigator>
  );
}

function CarbonFootprintStack() {
  return (
    <Stack.Navigator initialRouteName="CarbonFootprint">
      <Stack.Screen name="CarbonFootprint" component={CarbonFootprintScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Gamification" component={GamificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ headerShown: false }} />
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
            : route.name === 'Karbon Calculator'
            ? 'Calculate'
            : route.name === 'Real Time Karbon Updates'
            ? 'Real Time'
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
              ) : (
                <Icon name="circle-o" size={30} color={isFocused ? '#4caf50' : '#222'} />
              )}
            </View>
              {label !== 'Home' && <Text style={{ color: isFocused ? '#4caf50' : '#222', marginTop: 5, fontSize: 10, textAlign: 'center' }}>{label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
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
                    backgroundColor: 'rgba(11, 156, 49, 0.4)', 
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
                    backgroundColor: 'rgba(11, 156, 49, 0.4)', 
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
                  backgroundColor: 'rgba(11, 156, 49, 0.4)', 
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
                  backgroundColor: 'rgba(11, 156, 49, 0.4)',  
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
                  backgroundColor: 'rgba(11, 156, 49, 0.4)', 
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