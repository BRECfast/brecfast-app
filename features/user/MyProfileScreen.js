import React, {Component} from 'react';
import {Text, View} from 'react-native';

class MyProfileScreen extends Component {
  static navigationOptions = {
    title: 'My Profile',
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Text style={{textAlign: 'center'}}>My Profile</Text>
      </View>
    );
  }
}

export default MyProfileScreen;
