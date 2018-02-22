import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

import AuthenticatedActionButton from '../user/AuthenticatedActionButton';

class EventDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Event Details',
  };

  state = {
    going: false,
    user: null,
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
        <AuthenticatedActionButton
          authenticated={!!this.state.user}
          onClose={() => {
            this.setState({user: true});
          }}
        >
          <Button
            title="Join Event"
            onPress={() => {
              this.setState({going: true});
            }}
          />
        </AuthenticatedActionButton>
      </View>
    );
  }
}

export default EventDetailsScreen;
