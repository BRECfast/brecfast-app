import React, {Component} from 'react';
import {Button, View} from 'react-native';
import {graphql} from 'react-apollo';
import {Constants} from 'expo';
import gql from 'graphql-tag';

class CreateUserScreen extends Component {
  _createUser = async () => {
    const {auth: {reauthenticate}} = this.props;
    await this.props.createUser({
      variables: {
        name: 'Boaty McBoat Face',
        email: `${Constants.deviceId}@BRECfast.com`,
        deviceId: '123',
      },
    });
    await reauthenticate();
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Button title="Create User" onPress={this._createUser} />
      </View>
    );
  }
}

export default graphql(
  gql`
    mutation createUser($name: String!, $email: String!, $deviceId: String!) {
      createUser(name: $name, email: $email, deviceId: $deviceId) {
        id
        name
        email
        deviceId
      }
    }
  `,
  {name: 'createUser'}
)(CreateUserScreen);
