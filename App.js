import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import VehicleTracker from './screens/VehicleTracker';
import Dashboard from './screens/Dashboard';

// Create the stack navigators
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator initialRouteName="Home">
      <AuthStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
        }} 
      />
      <AuthStack.Screen 
      name="Dashboard" 
      component={Dashboard} 
      options={{ 
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
      }} 
    />
    </AuthStack.Navigator>
  );
}

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Dashboard" component={Dashboard} />
    </MainStack.Navigator>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}

export default App;