import React, {Component} from 'react';
import {Text, View} from 'react-native';

class CreateEventScreen extends Component {
  static navigationOptions = {
    title: 'Create Event',
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Text style={{textAlign: 'center'}}>Create Event</Text>
      </View>
    );
  }
}

export default CreateEventScreen;
