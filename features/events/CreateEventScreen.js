import React, {Component} from 'react';
import {Text, View} from 'react-native';

import AuthenticatedActionButton from '../user/AuthenticatedActionButton';

class CreateEventScreen extends Component {
  static navigationOptions = {
    title: 'Create Event',
  };

  state = {
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
        <AuthenticatedActionButton
          authenticated={!!this.state.user}
          onClose={() => {
            this.setState({user: true});
          }}
        >
          <Text style={{textAlign: 'center'}}>Create Event UI</Text>
        </AuthenticatedActionButton>
      </View>
    );
  }
}

export default CreateEventScreen;
