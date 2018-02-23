import React, {Component} from 'react';
import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import DateTimePicker from 'react-native-modal-datetime-picker';
import format from 'date-fns/format';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import AuthenticatedActionButton from '../user/AuthenticatedActionButton';
import ModalSelector from '../components/ModalSelector';
import Card from '../components/Card';
import ListItem from '../components/ListItem';
import {alertWithType} from '../alerts/service';

class CreateEventScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      title: 'Create Event',
      headerRight: !!params.create && (
        <Button
          title="Create"
          onPress={params.create}
          style={{marginRight: 10}}
          color="#fff"
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        />
      ),
    };
  };

  state = {
    user: {},
    date: new Date(),
    activity: null,
    park: null,
    minParticipants: '',
    maxParticipants: '',
    invitees: [],
  };

  componentWillMount() {
    this.props.navigation.setParams({create: this._create});
  }

  _create = async () => {
    const {goBack, state} = this.props.navigation;
    try {
      const event = await this.props.createEvent({
        variables: {
          activityId: this.state.activity.id,
          parkId: this.state.park.id,
          time: this.state.date.toISOString(),
          minParticipants: parseInt(this.state.minParticipants, 10),
          maxParticipants: parseInt(this.state.maxParticipants, 10),
        },
      });
      console.log(event);
      state.params.refetch();
      goBack();
    } catch (error) {
      alertWithType('error', 'Whoops', 'Something went wrong...');
    }
  };

  render() {
    const {data: {allParks = [], allActivities = []}} = this.props;
    const {activity, park, invitees} = this.state;
    const activityName = activity ? activity.title : 'Select Activity';
    const parkName = park ? park.title : 'Select Park';
    return (
      <ScrollView
        style={{
          flex: 1,
        }}
        keyboardDismissMode="on-drag"
      >
        <AuthenticatedActionButton
          authenticated={!!this.state.user}
          onClose={() => {
            this.setState({user: true});
          }}
        >
          <Card
            containerStyle={{
              marginRight: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <ListItem
              content={
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View style={{justifyContent: 'center', marginRight: 5}}>
                    <Text>Activity</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <ModalSelector
                      title="Activities"
                      items={allActivities}
                      onSelect={activity => {
                        this.setState({activity});
                      }}
                    >
                      {({show}) => {
                        this._selectActivities = show;
                        return (
                          <Text style={{textAlign: 'right', color: '#444'}}>
                            {activityName}
                          </Text>
                        );
                      }}
                    </ModalSelector>
                  </View>
                </View>
              }
              onPress={() => this._selectActivities()}
            />
            <ListItem
              content={
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View style={{justifyContent: 'center', marginRight: 5}}>
                    <Text>Park</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <ModalSelector
                      title="Parks"
                      items={allParks}
                      onSelect={park => {
                        this.setState({park});
                      }}
                    >
                      {({show}) => {
                        this._selectPark = show;
                        return (
                          <Text style={{textAlign: 'right', color: '#444'}}>
                            {parkName}
                          </Text>
                        );
                      }}
                    </ModalSelector>
                  </View>
                </View>
              }
              onPress={() => this._selectPark()}
              last
            />
          </Card>

          <Card
            containerStyle={{
              marginRight: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <ListItem
              content={
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View style={{justifyContent: 'center', marginRight: 5}}>
                    <Text>Starts</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'right', color: '#444'}}>
                      {format(this.state.date, 'ddd, MMM DD')}
                    </Text>
                    <DateTimePicker
                      isVisible={this.state.datePickerVisible}
                      date={this.state.date}
                      confirmTextIOS="Ok"
                      onConfirm={date => {
                        this.setState({
                          date,
                          datePickerVisible: false,
                        });
                      }}
                      onCancel={() =>
                        this.setState({
                          datePickerVisible: true,
                        })
                      }
                    />
                  </View>
                </View>
              }
              onPress={() =>
                this.setState({
                  datePickerVisible: true,
                })
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
                    <Text>Min # of Participants</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <TextInput
                      keyboardType="numeric"
                      style={{height: 30, textAlign: 'right'}}
                      onChangeText={minParticipants =>
                        this.setState({minParticipants})
                      }
                      value={this.state.minParticipants}
                    />
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
                    <Text>Max # of Participants</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <TextInput
                      keyboardType="numeric"
                      style={{height: 30, textAlign: 'right'}}
                      onChangeText={maxParticipants =>
                        this.setState({maxParticipants})
                      }
                      value={this.state.maxParticipants}
                    />
                  </View>
                </View>
              }
              last
            />
          </Card>

          <Text
            style={{
              marginTop: 20,
              color: '#444',
              fontSize: 12,
              marginHorizontal: 5,
            }}
          >
            THE EVENT WILL BE CANCELLED IF THE MINIMUM NUMBER OF PARTICIPANTS
            HAVEN’T COMMITTED AN HOUR BEFORE THE EVENT STARTS
          </Text>

          <Card
            containerStyle={{
              marginRight: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <ListItem
              content={
                <View
                  style={{
                    justifyContent: 'center',
                  }}
                >
                  <Text>Invitees ({invitees.length})</Text>
                </View>
              }
              control={
                <MaterialCommunityIcons name="chevron-right" size={32} />
              }
              onPress={() => {
                this.props.navigation.navigate('EventInvitations', {
                  invitees,
                  onUpdate: selected => {
                    this.setState({invitees: selected});
                  },
                });
              }}
              last
            />
          </Card>
        </AuthenticatedActionButton>
      </ScrollView>
    );
  }
}

export default compose(
  graphql(gql`
    {
      allActivities {
        id
        title: name
      }
      allParks {
        id
        title: name
        latitude
        longitude
      }
    }
  `),
  graphql(
    gql`
      mutation createEvent(
        $activityId: ID!
        $parkId: ID
        $time: DateTime!
        $minParticipants: Int!
        $maxParticpiants: Int
      ) {
        createEvent(
          activityId: $activityId
          parkId: $parkId
          time: $time
          minParticipants: $minParticipants
          maxParticipants: $maxParticpiants
        ) {
          id
          status
          time
          activity {
            id
            name
          }
          park {
            id
            name
          }
        }
      }
    `,
    {name: 'createEvent'}
  )
)(CreateEventScreen);
