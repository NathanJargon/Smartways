<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Modal, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ListItem, Icon } from 'react-native-elements';
import Background from '../components/Background';
import { auth, db } from '../screens/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FontAwesome as FontIcon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function Profile({ imageUrl = '', coverImageUrl = '' }) {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(imageUrl);
  const [coverImage, setCoverImage] = useState(coverImageUrl);
  const [userName, setUserName] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [userBio, setUserBio] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editingField, setEditingField] = useState('');
  const modalBackground = require('../assets/newsmodalbg.png');
  const [loading, setLoading] = useState(true);

  const openModal = (field, value) => {
    setEditingField(field);
    setInputValue(value);
    setModalVisible(true);
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      switch (editingField) {
        case 'userName':
          setUserName(inputValue);
          await updateDoc(userDoc, { name: inputValue });
          break;
        case 'userBio':
          setUserBio(inputValue);
          await updateDoc(userDoc, { bio: inputValue });
          break;
        case 'userPhone':
          setUserPhone(inputValue);
          await updateDoc(userDoc, { phone: inputValue });
          break;
        default:
          break;
      }
    }
    setModalVisible(false);
  };



=======
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ListItem, Icon } from 'react-native-elements';

function Profile({ imageUrl = '', coverImageUrl = '' }) {
  const [profileImage, setProfileImage] = useState(imageUrl);
  const [coverImage, setCoverImage] = useState(coverImageUrl);
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6

  const selectImage = async (setImage, aspect) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
<<<<<<< HEAD
  
=======

>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspect,
      quality: 1,
    });
<<<<<<< HEAD
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImageUri = result.assets[0].uri;
      setImage(newImageUri);
  
      const downloadUrl = await uploadImage(newImageUri);
      setUserProfileImage(downloadUrl);
  
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        await updateDoc(userDoc, { profile: downloadUrl });
      }
    }
  };

  const uploadImage = async (uri) => {
    try {
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const storage = getStorage();
      const storageRef = ref(storage, filename);
  
      const response = await fetch(uri);
      const blob = await response.blob();
  
      const uploadTask = uploadBytesResumable(storageRef, blob);
  
      const snapshot = await uploadTask;
  
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error during image upload:", error);
      return "";
    }
  };

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
            const userBio = userSnap.data().bio || null;
            const userEmail = userSnap.data().email || null;
            const userPhone = userSnap.data().phone || null;
          
            setUserName(userName);
            setUserProfileImage(userProfile);
            setUserBio(userBio);
            setUserEmail(userEmail);
            setUserPhone(userPhone);
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserName(); 
  }, []);


  if (loading) {
    return null; // Or your custom loading component
  }

  
  return (
    <Background style={styles.backgroundImage}>
      <View style={styles.container}>
      <View style={styles.content}>
      <TouchableOpacity onPress={() => selectImage(setProfileImage, [1, 1])}>
        {userProfileImage ? (
            <Image source={{ uri: userProfileImage }} style={{ width: 140, height: 140, borderRadius: 20 }} />
          ) : (
            <Image source={require('../assets/icons/leaderboardIcon.png')} style={{ width: 140, height: 140, borderRadius: 20 }} />
          )}
      </TouchableOpacity>
      <View style={styles.userNameContainer}>
        <View style={styles.userNameRow}>
          <Text style={styles.userName}>
          {userName ? `${userName}` : 'Environmentalist'}
          </Text>
          <TouchableOpacity onPress={() => openModal('userName', userName)}>
          <Icon name='edit' size={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.userNameRow}>
          <Text style={styles.userDescription}>{userBio ? `${userBio}` : 'I love nature and will save nature!'}</Text>
          <TouchableOpacity onPress={() => openModal('userBio', userBio)}>
        <Icon name='edit' size={15} />
      </TouchableOpacity>
        </View>
      </View>
=======

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
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6


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
<<<<<<< HEAD
        <Text style={styles.listItemValue}>{userEmail ? `${userEmail}` : 'user@example.com'}</Text>
=======
        <Text style={styles.listItemValue}>user@example.com</Text>
        <TouchableOpacity onPress={() => {}}>
          <Icon name='edit' size={15} />
        </TouchableOpacity>
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
          <Icon name='phone' />
          <Text style={styles.listItemDescription2}>Phone</Text>
        </View>
<<<<<<< HEAD
        <Text style={styles.listItemValue}>{userPhone ? `${userPhone}` : '+1234567890'}</Text>
        <TouchableOpacity onPress={() => openModal('userPhone', userPhone)}>
        <Icon name='edit' size={15} />
      </TouchableOpacity>
      </View>
    </ListItem>
      </View>
    </View>


    <TouchableOpacity
      style={styles.logoutButton}
      onPress={async () => {
        await signOut(auth);
        // Clear AsyncStorage
        await AsyncStorage.clear();
        // Reset navigation state
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          })
        );
      }}
    >
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>

    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <ImageBackground source={modalBackground} style={styles.modalBackground}>
          <View style={styles.modalView}>
            <TextInput
              value={inputValue}
              onChangeText={(text) => {
                let maxLength;
                switch (editingField) {
                  case 'userName':
                    maxLength = 8;
                    break;
                  case 'userBio':
                    maxLength = 15;
                    break;
                  case 'userPhone':
                    maxLength = 10; // standard length for phone numbers
                    break;
                  default:
                    maxLength = 100; // default length
                    break;
                }
                if (text.length <= maxLength) {
                  setInputValue(text);
                }
              }}
              style={styles.modalInput}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Modal>

    </Background>
=======
        <Text style={styles.listItemValue}>+1234567890</Text>
        <TouchableOpacity onPress={() => {}}>
          <Icon name='edit' size={15} />
        </TouchableOpacity>
      </View>
    </ListItem>



    <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.inContainer}>
            <Text style={styles.pointsText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.inContainer}>
            <Text style={styles.pointsText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </ImageBackground>
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
<<<<<<< HEAD
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: 300,
    height: 185,
    borderRadius: 20,
    overflow: 'hidden'

  },
  modalView: {
    backgroundColor: 'transparent', // Change this line
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#90EE90', 
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  inputLabel: {
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
    padding: 5,
    color: '#000',
  },
  modalInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  saveButtonText: {
    color: 'white',
    top: 2,
    fontFamily: 'Codec',
    textAlign: 'center',
  },
  input: {
    height: 60,
    width: 150,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderColor: 'white',
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  userDescription: {
    fontSize: 14,
    color: '#888',
    marginRight: 10,
  },
=======
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
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
<<<<<<< HEAD
    fontSize: 10,
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    bottom: 70,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
=======
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
  },
});
export default Profile;