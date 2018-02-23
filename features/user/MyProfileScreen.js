import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import Card from '../components/Card';
import ListItem from '../components/ListItem';
import md5 from 'md5';

class MyProfileScreen extends Component {
  static navigationOptions = {
    title: 'My Profile',
  };

  render() {
    const {auth: {currentUser}} = this.props.screenProps;
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
        <Card>
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
                  <Text style={{textAlign: 'right', color: '#444'}}>
                    {currentUser.name}
                  </Text>
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
                  <Text style={{textAlign: 'right', color: '#444'}}>
                    {currentUser.email}
                  </Text>
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

export default MyProfileScreen;
