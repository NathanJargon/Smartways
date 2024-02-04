import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome as Icon } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import CarbonFootprintScreen from './screens/CarbonFootprintScreen';
import EducationScreen from './screens/EducationScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeStack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeStack" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10 }}>
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
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 2, borderBottomColor: isFocused ? '#673ab7' : '#ccc' }}
          >
            {label === 'Home' ? (
              <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: isFocused ? '#673ab7' : '#f8f8f8', alignItems: 'center', justifyContent: 'center', bottom: 20, elevation: 10 }}>
                <Icon name="home" size={40} color={isFocused ? '#ffffff' : '#222'} />
              </View>
            ) : label === 'Education' ? (
              <Icon name="graduation-cap" size={30} color={isFocused ? '#673ab7' : '#222'} />
            ) : label === 'Carbon Footprint' ? (
              <Icon name="leaf" size={30} color={isFocused ? '#673ab7' : '#222'} />
            ) : (
              <Icon name="circle-o" size={30} color={isFocused ? '#673ab7' : '#222'} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" tabBar={props => <CustomTabBar {...props} />}>
          <Tab.Screen name="Education" component={EducationScreen} />
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Carbon Footprint" component={CarbonFootprintScreen} />
     </Tab.Navigator>
    </NavigationContainer>
  );
}