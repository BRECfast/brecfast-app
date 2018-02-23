import {STYLES, ASSETS, COLORS, getIcon} from '../../features/util/constants';
import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
} from 'react-native';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {MaterialCommunityIcons} from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import {Agenda} from 'react-native-calendars';
import format from 'date-fns/format';

class EventListingScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const params = navigation.state.params || {};

    return {
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: '#556535'},
      headerTitle: (
        <Image
          source={require('../../assets/brand.png')}
          style={{height: 44, width: 157, resizeMode: 'contain'}}
        />
      ),
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate('ParkMap')}
          style={{marginLeft: 10}}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        >
          <MaterialCommunityIcons name="map" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerRight: !!params.filter && (
        <View style={{flexDirection: 'row'}}>
          {screenProps.auth.currentUser && (
            <TouchableOpacity
              onPress={() => navigation.navigate('MyProfile')}
              style={{marginRight: 10}}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
              <MaterialCommunityIcons
                name="account-edit"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={params.filter}
            style={{
              marginRight: 10,
              borderWidth: 1.5,
              borderColor: '#fff',
              borderRadius: 16,
              width: 32,
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          >
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color="#fff"
              style={{marginTop: 3}}
            />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  state = {
    items: {},
    fetchedMonths: {},
    selected: new Date(),
    monthName: format(new Date(), 'MMMM'),
  };

  componentWillMount() {
    this.props.navigation.setParams({filter: this._filter});
  }

  _filter = () => {
    Alert.alert('show filter');
  };

  _onDayChange = day => {
    this.setState({monthName: format(day.dateString, 'MMMM')});
  };

  _renderSpots({minParticipants, maxParticipants, participantsCount}) {
    if (maxParticipants && participantsCount >= maxParticipants) {
      return <Text style={[STYLES.textMuted]}>Not spots available</Text>;
    }
    if (participantsCount < minParticipants) {
      return (
        <Text style={[STYLES.textColorBlue]}>
          {minParticipants - participantsCount} spots remaining
        </Text>
      );
    }
    return <Text style={[STYLES.textMuted]}>We could use more!</Text>;
  }

  _renderItem = item => {
    let spotsRemaining = item.maxParticipants - item.participationsCount;
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.5}
        onPress={() =>
          this.props.navigation.navigate('EventDetails', {eventId: item.id})
        }
      >
        <View
          style={{
            width: 44,
            height: 44,
            marginRight: 8,
          }}
        >
          <Image
            source={getIcon(item.activityId)}
            style={{
              width: 44,
              height: 44,
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
            }}
          >
            {item.activityName}
          </Text>
          <Text style={[STYLES.textMuted]}>{item.parkName}</Text>
          {this._renderSpots(item)}
        </View>
        <View
          style={{
            display: 'flex',
            height: '100%',
            width: 75,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Text style={[STYLES.textMuted, {width: '100%', textAlign: 'right'}]}>
            {format(item.time, 'h:mm a')}
          </Text>
          <Text style={[STYLES.textMuted, {width: '100%', textAlign: 'right'}]}>
            {(item._geoDistance * 0.000621371).toFixed(1)} miles
          </Text>
        </View>
        <View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={18}
            color={COLORS.grey}
          />
        </View>
      </TouchableOpacity>
    );
  };

  _renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text />
      </View>
    );
  };

  _rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  _getEventsForAgenda() {
    const {events} = this.props.data || {};
    if (events == null) {
      return {};
    }
    return events.reduce((acc, event) => {
      const key = format(event.time, 'YYYY-MM-DD');
      if (acc[key] == null) {
        acc[key] = [];
      }
      acc[key].push(event);
      return acc;
    }, {});
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={{backgroundColor: '#FFF'}}>
          <Text
            style={[
              {
                fontSize: 16,
                fontFamily: 'System',
                fontWeight: '300',
                color: '#2d4150',
                marginVertical: 5,
                textAlign: 'center',
              },
              this.state.hideMonth && {opacity: 0},
            ]}
          >
            {this.state.monthName}
          </Text>
        </View>
        <Agenda
          items={this._getEventsForAgenda()}
          selected={this.state.selected}
          onDayChange={this._onDayChange}
          onCalendarToggled={calendarOpened => {
            this.setState({hideMonth: calendarOpened});
          }}
          renderItem={this._renderItem}
          renderEmptyDate={this._renderEmptyDate}
          rowHasChanged={this._rowHasChanged}
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
  item: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  textMuted: {
    color: '#8F8E94',
  },
});

const addEventsData = graphql(
  gql`
    query searchEvents($latitude: Float!, $longitude: Float!, $now: DateTime!) {
      events: searchEvents(
        latitude: $latitude
        longitude: $longitude
        time_gte: $now
      ) {
        id
        time
        activityId
        activityName
        parkName
        minParticipants
        maxParticipants
        participantsCount
        _geoDistance
      }
    }
  `,
  {
    options({screenProps: {location}}) {
      if (!location) {
        return {skip: true};
      }
      return {
        variables: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          now: new Date().toISOString(),
        },
      };
    },
  }
);

export default addEventsData(EventListingScreen);
