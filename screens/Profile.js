import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ListItem, Icon } from 'react-native-elements';

function Profile({ imageUrl = '', coverImageUrl = '' }) {
  const [profileImage, setProfileImage] = useState(imageUrl);
  const [coverImage, setCoverImage] = useState(coverImageUrl);

  const selectImage = async (setImage, aspect) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspect,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground source={require('../assets/profilebg.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => selectImage(setProfileImage, [1, 1])}>
          {profileImage ? (
            <Image
              style={styles.profileImage}
              source={{ uri: profileImage }}
            />
          ) : (
            <View style={styles.iconContainer}>
              <Icon name="person" size={50} color="white" />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.userName}>Environmentalist</Text>


        <ListItem
      containerStyle={{
        backgroundColor: 'transparent',
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 50,
      }}
      bottomDivider
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
          <Icon name='email' />
          <Text style={styles.listItemDescription}>Email</Text>
        </View>
        <Text style={styles.listItemValue}>user@example.com</Text>
        <TouchableOpacity onPress={() => {}}>
          <Icon name='edit' size={15} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
          <Icon name='phone' />
          <Text style={styles.listItemDescription2}>Phone</Text>
        </View>
        <Text style={styles.listItemValue}>+1234567890</Text>
        <TouchableOpacity onPress={() => {}}>
          <Icon name='edit' size={15} />
        </TouchableOpacity>
      </View>
    </ListItem>
      </View>
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  inContainer: {
    borderColor: '#4caf50',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  pointsText: {
    color: '#4caf50',
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  coverImage: {
    width: 400,
    height: 150,
    backgroundColor: '#A5AAAB',
  },
  coverPlaceholder: {
    width: 400,
    height: 150,
    backgroundColor: '#A5AAAB',
  },
  content: {
    marginTop: 50,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D2A295',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  buttonText: {
    margin: 10,
  },
  signUpButton: {
    borderColor: '#4caf50', 
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 100, 
  },
  signInButton: {
    borderColor: '#4caf50', 
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20
  },
  buttonText: {
    margin: 10,
    color: '#4caf50',
    fontSize: 18,
  },
  listItemDescription: {
    color: '#008000',
    marginLeft: 10,
    marginRight: 50,
  },
  listItemDescription2: {
    color: '#008000',
    marginLeft: 10,
    marginRight: 85,
  },
  listItemValue: {
    marginLeft: 'auto',
    marginRight: 10,
  },
});
export default Profile;