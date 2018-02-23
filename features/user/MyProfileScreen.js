import React, {Component} from 'react';
import {Button, Image, Text, TextInput, View} from 'react-native';
import Card from '../components/Card';
import ListItem from '../components/ListItem';
import md5 from 'md5';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class MyProfileScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      title: 'My Profile',
      headerRight: (
        <View>
          {!!params.edit &&
            !params.editing && (
              <Button
                title="Edit"
                onPress={params.edit}
                style={{marginRight: 10}}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              />
            )}
          {!!params.update &&
            params.editing && (
              <Button
                title="Update"
                onPress={params.update}
                style={{marginRight: 10}}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              />
            )}
        </View>
      ),
    };
  };

  state = {};

  componentWillMount() {
    this.props.navigation.setParams({edit: this._edit});
    this.props.navigation.setParams({update: this._update});
  }

  _edit = () => {
    const {auth: {currentUser}} = this.props.screenProps;
    this.setState({editUser: currentUser});
    this.props.navigation.setParams({editing: true});
  };

  _update = async () => {
    const {auth: {reauthenticate}} = this.props.screenProps;

    await this.props.updateUser({variables: this.state.editUser});
    await reauthenticate();

    this.setState({editUser: null});
    this.props.navigation.setParams({editing: false});
  };

  render() {
    const {auth: {currentUser}} = this.props.screenProps;
    const {editUser} = this.state;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <Image
            style={{height: 84, width: 84, borderRadius: 42}}
            source={{
              uri: `https://www.gravatar.com/avatar/${md5(currentUser.email)}`,
            }}
          />
        </View>
        <Card containerStyle={{paddingRight: 0}}>
          <ListItem
            content={
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View style={{justifyContent: 'center', marginRight: 5}}>
                  <Text>Name</Text>
                </View>
                <View style={{flex: 1}}>
                  {editUser && (
                    <TextInput
                      style={{height: 30, textAlign: 'right'}}
                      onChangeText={name =>
                        this.setState(state => ({
                          editUser: {
                            ...editUser,
                            name,
                          },
                        }))
                      }
                      value={this.state.editUser.name}
                    />
                  )}
                  {!editUser && (
                    <Text style={{textAlign: 'right', color: '#444'}}>
                      {currentUser.name}
                    </Text>
                  )}
                </View>
              </View>
            }
          />
          <ListItem
            content={
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View style={{justifyContent: 'center', marginRight: 5}}>
                  <Text>Email</Text>
                </View>
                <View style={{flex: 1}}>
                  {editUser && (
                    <TextInput
                      style={{height: 30, textAlign: 'right'}}
                      onChangeText={email =>
                        this.setState(state => ({
                          editUser: {
                            ...editUser,
                            email,
                          },
                        }))
                      }
                      value={this.state.editUser.email}
                    />
                  )}
                  {!editUser && (
                    <Text style={{textAlign: 'right', color: '#444'}}>
                      {currentUser.email}
                    </Text>
                  )}
                </View>
              </View>
            }
            last
          />
        </Card>
      </View>
    );
  }
}

export default graphql(
  gql`
    mutation updateUser($id: ID!, $name: String!, $email: String!) {
      updateUser(id: $id, name: $name, email: $email) {
        id
        name
        email
        deviceId
      }
    }
  `,
  {name: 'updateUser'}
)(MyProfileScreen);
