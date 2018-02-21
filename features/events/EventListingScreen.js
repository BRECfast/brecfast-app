import React, {Component} from 'react';
import {Button, View} from 'react-native';

class EventListingScreen extends Component {
  static navigationOptions = {
    title: 'Events',
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Button
          title="Event Details"
          onPress={() => {
            this.props.navigation.navigate('EventDetails');
          }}
        />
        <Button
          title="Create Event"
          onPress={() => {
            this.props.navigation.navigate('CreateEvent');
          }}
        />
        <Button
          title="My Profile"
          onPress={() => {
            this.props.navigation.navigate('MyProfile');
          }}
        />
      </View>
    );
  }
}

export default EventListingScreen;
