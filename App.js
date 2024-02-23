import React, { useState, useEffect } from 'react';

import { View, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';

