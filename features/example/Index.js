import React, {Component} from 'react';
import {Button, ScrollView, Switch, Text, View} from 'react-native';
import {iOSUIKit} from 'react-native-typography';
import {MaterialIcons} from '@expo/vector-icons';
import {Constants} from 'expo';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

import Card from '../components/Card';
import ListItem from '../components/ListItem';

class MyProfile extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  state = {value: false};

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <Card
          containerStyle={{
            paddingVertical: 0,
            paddingRight: 0,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <ListItem
            content={
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View style={{justifyContent: 'center'}}>
                  <Text style={{...iOSUIKit.title3Object}}>Justin Obney</Text>
                  <Text style={{...iOSUIKit.subheadObject}}>Edit Profile</Text>
                </View>
              </View>
            }
            control={
              <MaterialIcons name="chevron-right" size={28} color="#888" />
            }
            onPress={() => {
              this.props.navigation.navigate('ExampleScreen');
            }}
            last
          />
        </Card>
        <Text
          style={{
            ...iOSUIKit.caption2Object,
            marginTop: 10,
            paddingLeft: 10,
            marginBottom: 5,
            color: '#555',
          }}
        >
          SETTINGS
        </Text>
        <Card
          containerStyle={{paddingVertical: 0, paddingRight: 0, marginTop: 1}}
        >
          <ListItem
            content={<Text>Some Setting</Text>}
            control={
              <Switch
                value={this.state.value}
                onValueChange={value => {
                  this.setState({value, loading: true});
                  setTimeout(() => {
                    this.setState({loading: false});
                  }, 2000);
                }}
              />
            }
            loading={this.state.loading}
          />

          <ListItem
            content={<Text>Some Setting</Text>}
            control={
              <Switch
                value={this.state.value}
                onValueChange={value => {
                  this.setState({value, loading: true});
                  setTimeout(() => {
                    this.setState({loading: false});
                  }, 2000);
                }}
              />
            }
            loading={this.state.loading}
          />

          <ListItem
            content={<Text>Some Setting</Text>}
            control={
              <Switch
                value={this.state.value}
                onValueChange={value => {
                  this.setState({value, loading: true});
                  setTimeout(() => {
                    this.setState({loading: false});
                  }, 2000);
                }}
              />
            }
            loading={this.state.loading}
            last
          />
        </Card>

        <Card
          containerStyle={{
            paddingVertical: 0,
            marginTop: 15,
          }}
        >
          <ListItem
            content={
              <Button
                onPress={() => {}}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                title="Log out"
                color="red"
              />
            }
            last
            style={{paddingRight: 0, paddingVertical: 5}}
          />
        </Card>

        <Text
          style={{
            ...iOSUIKit.caption2Object,
            marginTop: 10,
            marginBottom: 5,
            color: '#555',
            textAlign: 'center',
          }}
          selectable
        >
          Version: {Constants.manifest.revisionId || Constants.manifest.version}
        </Text>
        {Constants.manifest.publishedTime && (
          <Text
            style={{
              ...iOSUIKit.caption2Object,
              marginBottom: 5,
              color: '#555',
              textAlign: 'center',
            }}
          >
            Published:{' '}
            {format(
              parse(Constants.manifest.publishedTime),
              'YYYY-MM-DD hh:mma'
            )}
          </Text>
        )}
      </ScrollView>
    );
  }
}

export default MyProfile;
