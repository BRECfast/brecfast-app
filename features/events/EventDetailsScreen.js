import React, {Component} from 'react';
import {Text, View} from 'react-native';

class EventDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Event Details',
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Text style={{textAlign: 'center'}}>Event Details</Text>
      </View>
    );
  }
}

export default EventDetailsScreen;
