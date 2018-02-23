import React, {Component} from 'react';
import {Text, ScrollView, View, Image, TouchableOpacity} from 'react-native';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import format from 'date-fns/format';
import md5 from 'md5';

import Card from '../components/Card';
import ListItem from '../components/ListItem';
import {ASSETS} from '../util/constants';

class EventDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Event Details',
  };

  state = {
    joining: false,
  };

  join = async () => {
    const {
      screenProps: {auth: {currentUser}},
      join,
      data: {event, refetch},
    } = this.props;
    this.setState({joining: true});
    await join({
      variables: {eventId: event.id, userId: currentUser.id},
    });
    await refetch();
    this.setState({joining: false});
  };

  renderJoin() {
    const {screenProps: {auth: {currentUser}}, data: {event}} = this.props;
    const {minParticipants, maxParticipants, participations} = event;
    const participantsCount = participations.length;
    if (currentUser && participations.find(p => p.user.id === currentUser.id)) {
      return (
        <Text
          style={{
            fontWeight: 'bold',
            color: '#5B961B',
            fontSize: 17,
            lineHeight: 20,
          }}
        >
          You’re going
        </Text>
      );
    }
    if (maxParticipants && participantsCount >= maxParticipants) {
      return (
        <Text style={{fontWeight: 'bold', fontSize: 17, lineHeight: 20}}>
          Sorry, we’re all filled up.
        </Text>
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View style={{marginRight: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 17, lineHeight: 20}}>
            Do you want to join?
          </Text>
          <Text style={{color: '#4A90E2', fontSize: 15, lineHeight: 20}}>
            {participantsCount < minParticipants
              ? `${minParticipants - participantsCount} spots remaining`
              : 'We could use some more!'}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            activeOpacity={this.state.joining ? 0.25 : 0.5}
            style={{
              backgroundColor: '#007AFF',
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 10,
            }}
            onPress={this.state.joining ? null : this.join}
          >
            <Text
              style={{
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: 17,
                textAlign: 'center',
              }}
            >
              {this.state.joining ? 'Joining…' : 'I’m in'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const {event, loading} = this.props.data;
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
          <ListItem
            content={
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                <Image
                  source={ASSETS[event.activity.id]}
                  style={{
                    width: 44,
                    height: 44,
                    marginRight: 10,
                  }}
                />
                <View style={{flex: 1}}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 17, lineHeight: 20}}
                  >
                    {event.activity.name}
                  </Text>
                  <Text
                    style={{color: '#8F8E94', fontSize: 15, lineHeight: 20}}
                  >
                    {format(event.time, 'dddd, MMMM d')}
                  </Text>
                </View>
              </View>
            }
          />
          <ListItem
            content={
              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                {this.renderJoin()}
              </View>
            }
          />
          <ListItem
            content={
              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                <Text style={{color: '#8F8E94', fontSize: 17, lineHeight: 20}}>
                  {format(event.time, 'dddd, MMMM d')}
                </Text>
                <Text style={{color: '#8F8E94', fontSize: 15, lineHeight: 20}}>
                  {format(event.time, 'h:mm a')}
                </Text>
              </View>
            }
          />
          <ListItem
            content={
              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                <Text style={{color: '#8F8E94', fontSize: 17, lineHeight: 20}}>
                  {event.park.name}
                </Text>
                <Text style={{color: '#8F8E94', fontSize: 15, lineHeight: 20}}>
                  {event.park.address}
                </Text>
                <Text style={{color: '#8F8E94', fontSize: 15, lineHeight: 20}}>
                  {event.park.city}, LA {event.park.zipcode}
                </Text>
              </View>
            }
          />
          <ListItem
            last
            content={
              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                <Text
                  style={{fontWeight: 'bold', fontSize: 17, lineHeight: 20}}
                >
                  People Participating
                </Text>
                {event.participations.map(p => (
                  <View
                    key={p.user.id}
                    style={{flexDirection: 'row', marginTop: 10}}
                  >
                    <Image
                      style={{
                        height: 44,
                        width: 44,
                        borderRadius: 22,
                        marginRight: 10,
                      }}
                      source={{
                        uri: `https://www.gravatar.com/avatar/${md5(
                          p.user.email
                        )}`,
                      }}
                    />
                    <View style={{flex: 1}}>
                      <Text
                        style={{color: '#8F8E94', fontSize: 17, lineHeight: 44}}
                      >
                        {p.user.name}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            }
          />
        </Card>
      </ScrollView>
    );
  }
}

const addEventData = graphql(
  gql`
    query getEvent($id: ID!) {
      event: Event(id: $id) {
        id
        time
        status
        activity {
          id
          name
        }
        park {
          id
          name
          address
          city
          zipcode
        }
        minParticipants
        maxParticipants
        participations {
          user {
            id
            name
            email
          }
        }
      }
    }
  `,
  {
    options(props) {
      return {
        variables: {
          // TODO: use param from navigation
          // id: props.navigator.state.params.event.id,
          id: 'cjdzk1e9qnarz01862j6egc9d',
        },
      };
    },
  }
);

const addJoinMutation = graphql(
  gql`
    mutation join($eventId: ID!, $userId: ID!) {
      join: createParticipation(
        eventId: $eventId
        userId: $userId
        role: MEMBER
      ) {
        id
      }
    }
  `,
  {
    name: 'join',
  }
);
export default compose(addEventData, addJoinMutation)(EventDetailsScreen);
