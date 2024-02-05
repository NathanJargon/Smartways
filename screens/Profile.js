import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


function Profile({ imageUrl = '', coverImageUrl = '' }) {
  const [profileImage, setProfileImage] = useState(imageUrl);
  const [coverImage, setCoverImage] = useState(coverImageUrl);
  
    const selectImage = async (setImage) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log("status", status)
    if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    // console.log("result", result)

    if (!result.cancelled) {
        // console.log("result.uri", result.uri)
        setImage(result.assets[0].uri);
    }
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => selectImage(setCoverImage)}>
        {coverImage ? (
            <Image 
            style={{ width: 400, height: 200 }}
            source={{uri: coverImage}}
            />
        ) : (
            <View style={{ width: 400, height: 200, backgroundColor: 'black' }} />
        )}
        </TouchableOpacity>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => selectImage(setProfileImage)}>
          {profileImage ? (
            <Image 
              style={styles.profileImage}
              source={{uri: profileImage}}
            />
          ) : (
            <View style={styles.profileImage} />
          )}
        </TouchableOpacity>
        <Text style={styles.userName}>User Name</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        },
    coverImage: {
        width: '100%',
        height: 200,
        },
    coverPlaceholder: {
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop: -50,
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'gray',
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
});

export default Profile;