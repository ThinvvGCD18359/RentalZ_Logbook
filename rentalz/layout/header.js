import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default function Heading() {
  return (
      <Header 
        style={styles.headerContainer}
        leftComponent={
            <View style={styles.headerLeft}>
              <TouchableOpacity>
                <Icon size={40} name="menu" color="white" />
              </TouchableOpacity>
            </View>
        }
        rightComponent={
            <View style={styles.headerRight}>
              <TouchableOpacity>
                <Icon type="antdesign" size={35} name="search1" color="white" />
              </TouchableOpacity>
            </View>
        }
        centerComponent={{ text: 'RentalZ', style: styles.heading }}
      />
  );
}

const styles = StyleSheet.create({
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#397af8',
      marginBottom: 20,
      marginTop:10,
      width: '100%',
      paddingVertical: 15,
    },
    heading: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
      },
      headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
      },
})