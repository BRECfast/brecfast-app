import React, {Component} from 'react';
import {Text, ScrollView, View, Image} from 'react-native';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import md5 from 'md5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Card from '../components/Card';
import ListItem from '../components/ListItem';

class EventInvitationsScreen extends Component {
  static navigationOptions = {
    title: 'Event Details',
  };

  state = {
    checked: {},
  };

  componentDidMount() {
    const checked = this.props.navigation.state.params.invitees.reduce(
      (acc, id) => ({...acc, [id]: true}),
      {}
    );
    this.setState({checked});
  }

  render() {
    const {allUsers = [], loading} = this.props.data;
    const {checked} = this.state;
    if (loading) {
      return null;
    }
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
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          {allUsers.map(user => (
            <ListItem
              key={user.id}
              onPress={() => {
                this.setState(
                  state => ({
                    checked: {
                      ...state.checked,
                      [user.id]: !state.checked[user.id],
                    },
                  }),
                  () => {
                    this.props.navigation.state.params.onUpdate(
                      Object.keys(this.state.checked).filter(x =>
                        Boolean(this.state.checked[x])
                      )
                    );
                  }
                );
              }}
              content={
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Image
                    style={{
                      height: 44,
                      width: 44,
                      borderRadius: 22,
                      marginRight: 10,
                    }}
                    source={{
                      uri: `https://www.gravatar.com/avatar/${md5(user.email)}`,
                    }}
                  />
                  <View style={{flex: 1}}>
                    <Text
                      style={{color: '#8F8E94', fontSize: 17, lineHeight: 44}}
                    >
                      {user.name}
                    </Text>
                  </View>
                </View>
              }
              control={
                checked[user.id] ? (
                  <MaterialCommunityIcons name="check" size={32} />
                ) : null
              }
            />
          ))}
        </Card>
      </ScrollView>
    );
  }
}

export default graphql(
  gql`
    query allUsers($currentUserId: ID) {
      allUsers(filter: {id_not: $currentUserId}) {
        id
        name
        email
      }
    }
  `,
  {
    options(props) {
      const {currentUser} = props.screenProps.auth;
      return {variables: {currentUserId: currentUser && currentUser.id}};
    },
  }
)(EventInvitationsScreen);
