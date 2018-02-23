import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {Constants} from 'expo';
import PropTypes from 'prop-types';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import {alertWithType} from '../alerts/service';

const AUTHENTICATE_QUERY = gql`
  mutation authenticate($deviceId: String!) {
    authenticate: authenticateByDeviceId(deviceId: $deviceId) {
      token
    }
  }
`;

const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser: user {
      id
      name
      email
      interests {
        id
        name
      }
    }
  }
`;

export const authShape = PropTypes.shape({
  authToken: PropTypes.string,
  currentUser: PropTypes.object,
  authenticating: PropTypes.boolean,
  reauthenticate: PropTypes.func,
});

class UserProvider extends Component {
  static childContextTypes = {
    auth: authShape,
  };

  state = {
    authToken: null,
    currentUser: null,
    authenticating: false,
  };

  componentWillMount() {
    this.authenticate();
  }

  getChildContext() {
    return {auth: this.getAuthPayload()};
  }

  getAuthPayload() {
    return {...this.state, reauthenticate: this.authenticate};
  }

  authenticate = async () => {
    this.setState({authenticating: true});
    const authToken = await this.getAuthToken();
    if (!authToken) {
      this.setState({
        authenticating: false,
        authToken: null,
        currentUser: null,
      });
      return;
    }
    this.setState({authToken});
    await AsyncStorage.setItem('authToken', authToken);
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      this.setState({
        authenticating: false,
        authToken: null,
        currentUser: null,
      });
      return;
    }
    this.setState({authenticating: false, currentUser});
  };

  async getAuthToken() {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken) {
        return authToken;
      }
      const response = await this.props.client.mutate({
        mutation: AUTHENTICATE_QUERY,
        variables: {deviceId: Constants.deviceId},
      });
      return response.data.authenticate.token;
    } catch (error) {
      alertWithType('error', 'Whoops', error.message);
      return null;
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.props.client.query({
        query: CURRENT_USER_QUERY,
      });
      return response.data.currentUser;
    } catch (error) {
      alertWithType('error', 'Whoops', error.message);
      return null;
    }
  }

  render() {
    if (typeof this.props.children === 'function') {
      return this.props.children(this.getAuthPayload());
    }
    return this.props.children;
  }
}

export default withApollo(UserProvider);
