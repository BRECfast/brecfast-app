import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {MaterialCommunityIcons} from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';

import Card from '../components/Card';

const events = [
  {
    id: 1,
    name: 'Some Event',
    time: new Date(),
    status: 'PENDING',
    park: {
      name: 'BREC Park Yo',
      classification: 'COMMUNITY',
      latitude: 30.4583,
      longitude: 91.1403,
    },
    activities: [],
    participations: [],
    minParticipants: 0,
    maxParticipants: 4,
  },
];

class EventListingScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      title: 'Events',
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate('MyProfile')}
          style={{marginLeft: 10}}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        >
          <MaterialCommunityIcons name="account-edit" size={28} color="#888" />
        </TouchableOpacity>
      ),
      headerRight: !!params.filter && (
        <TouchableOpacity
          onPress={params.filter}
          style={{marginRight: 10}}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        >
          <MaterialCommunityIcons name="filter" size={24} color="#888" />
        </TouchableOpacity>
      ),
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({filter: this._filter});
  }

  _filter = () => {
    Alert.alert('show filter');
  };

  _renderCard = ({item: event}) => {
    return (
      <TouchableOpacity
        key={event.id}
        style={styles.cardContainer}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('EventDetails', {event})}
      >
        <Card>
          <Text>{JSON.stringify(event, null, 2)}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={events}
          keyExtractor={x => x.id}
          renderItem={this._renderCard}
        />
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            this.props.navigation.navigate('CreateEvent');
          }}
          renderIcon={() => (
            <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
});

export default EventListingScreen;
