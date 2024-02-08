import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function KarbonLeaderboard() {
    const [users, setUsers] = useState([
      { name: 'User 1', emission: 10, rank: 1 },
      { name: 'User 2', emission: 20, rank: 2 },
      { name: 'User 3', emission: 30, rank: 3 },
      { name: 'User 4', emission: 40, rank: 4 },
      { name: 'User 5', emission: 50, rank: 5 },
      { name: 'User 6', emission: 60, rank: 6 },
      { name: 'User 7', emission: 70, rank: 7 },
      { name: 'User 8', emission: 80, rank: 8 },
      // Add more users as needed
    ]);

  const middleIndex = Math.floor(users.length / 2);
  const navigation = useNavigation();
  const orderedUsers = [...users];
  orderedUsers.splice(middleIndex, 0, orderedUsers.splice(0, 1)[0]);

  function getOrdinalSuffix(rank) {
    let j = rank % 10,
        k = rank % 100;
    if (j == 1 && k != 11) {
        return rank + "st";
    }
    if (j == 2 && k != 12) {
        return rank + "nd";
    }
    if (j == 3 && k != 13) {
        return rank + "rd";
    }
    return rank + "th";
  }

  const topUsers = [users[1], users[0], users[2]];

  return (
    <View>
        <View style={{ flexDirection: 'row', left: 15  }}>
            <View style={{ flexDirection: 'row', left: -5, top: 45  }}>
                <Icon
                    name='arrow-left'
                    type='font-awesome'
                    size={30}
                    color='black'
                    onPress={() => navigation.navigate('KarbonStatistics')}
                />
            </View>
        <View style={styles.headerContainer}>
            <Text style={styles.header}>DAILY RANKINGS</Text>
        </View>
        </View>
      <View style={styles.headerBottomContainer}>
        <Text style={styles.headerBottom1}>Compete with your friends and get the lowest</Text>
        <Text style={styles.headerBottom2}>carbon footprint in your circle!</Text>
      </View>
        <View style={styles.rankContainer}>
        {topUsers.map((user, i) => (
            <Card containerStyle={[styles.rankCard, i === 1 && styles.middleCard]} key={i}>
            <Icon
                name='user'
                type='font-awesome'
                size={40}
                color='#517fa4'
            />
            <Icon name='star' type='font-awesome' color='#517fa4' size={15} style={{ left: 20, }} />
            <Text style={styles.rankText}>{getOrdinalSuffix(user.rank)}</Text>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.emission}>{user.emission} kgCO2</Text>
            </Card>
        ))}
        </View>
      <View style={styles.TableBox}>
      <FlatList
        data={users.slice(3, 8)}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index, separators }) => (
            <View>
            <View style={styles.tableRow}>
                <View style={styles.iconContainer}>
                    <View style={styles.iconStyle1}>
                    <Icon name='star' type='font-awesome' color='#517fa4' size={30} />
                    </View>
                    <View style={styles.iconStyle2}>
                    <Icon name='user' type='font-awesome' color='#517fa4' size={40} />
                    </View>
                </View>
                <View style={styles.tableCell}>
                <Text style={styles.tableBoxText1}>{item.name}</Text>
                <Text style={styles.tableBoxText2}>{item.emission} kgCO2</Text>
                </View>
            </View>
            {index !== users.slice(3, 8).length - 1 && <View style={styles.bottomBorder} />}
            </View>
          )}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  headerContainer: {
    borderRadius: 30,
    backgroundColor: 'black',
    width: '80%',
    padding: 10,
    top: 20,
    marginVertical: 20,
    alignSelf: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconStyle1: {
    marginLeft: 20,
    padding: 0,
    margin: 0, 
  },
  iconStyle2: {
    marginLeft: 30,
  },
  headerBottomContainer: {
    margin: 5,
    alignSelf: 'center',
  },
  headerBottom1: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: 'Montserrat-Light',
  },
  headerBottom2: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: 'Montserrat-Light',
  },
  header: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Codec',
    textAlign: 'center',
    fontFamily: 'Montserrat-Light',
  },
  rankContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingHorizontal: 10,
  },
  rankCard: {
    borderRadius: 20, 
    alignItems: 'center',
    height: 180,
    marginHorizontal: 4, 
    top: 5,
  },
  middleCard: {
    height: 200, 
    top: -10,
  },
  rankText: {
    fontSize: 15,
    padding: 0,
    fontFamily: 'Codec',
    textAlign: 'center',
  },
  name: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Codec',
  },
  emission: {
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
  },
  TableBox: {
    minHeight: 300, 
    width: '95%',
    backgroundColor: 'white', 
    margin: 10, 
    borderRadius: 10,
    bottom: 50, 
    alignSelf: 'center',
    padding: 10,
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, 
    width: '100%', 
  },
  bottomBorder: {
    height: 5, 
    backgroundColor: 'black',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  tableCell: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  tableBoxText1: {
    marginRight: 65,
    paddingTop: 5,
    fontFamily: 'Codec',
    fontSize: 15,
  },

  tableBoxText2: {
    fontSize: 15,
    marginRight: 60,
    fontFamily: 'Montserrat-Light',
  },
});

export default KarbonLeaderboard;