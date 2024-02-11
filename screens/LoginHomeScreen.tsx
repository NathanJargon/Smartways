import React, { memo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { Navigation } from '../types';

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => {
  const checkUserLoggedIn = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData != null) {
      navigation.navigate('Main');
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <Background>
      <Logo />
      <Header>KARBON</Header>

      <Paragraph>
        Register yourself and get started with helping Earth through Karbon!
      </Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  );
};

export default memo(HomeScreen);