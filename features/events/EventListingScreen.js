import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {MaterialCommunityIcons} from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import {Agenda} from 'react-native-calendars';
import format from 'date-fns/format';
import getDaysInMonth from 'date-fns/get_days_in_month';
import startOfMonth from 'date-fns/start_of_month';
import addDays from 'date-fns/add_days';
import addMonths from 'date-fns/add_months';

async function fetchEvent(date) {
  const monthStart = startOfMonth(date);
  const daysToFetch = getDaysInMonth(date);
  return Array.from({
    length: daysToFetch,
  }).reduce((acc, item, idx) => {
    const itemDate = addDays(monthStart, idx);
    const key = format(itemDate, 'YYYY-MM-DD');
    return {
      ...acc,
      [key]: [
        {
          id: 1,
          name: 'Some Event',
          time: itemDate,
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
      ],
    };
  }, {});
}

class EventListingScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const params = navigation.state.params || {};

    return {
      title: 'Events',
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate('ParkMap')}
          style={{marginLeft: 10}}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        >
          <MaterialCommunityIcons name="map" size={24} color="#888" />
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
                color="#888"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={params.filter}
            style={{marginRight: 10}}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          >
            <MaterialCommunityIcons name="filter" size={24} color="#888" />
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

  async _fetchEvents(date) {
    if (this.state.fetchedMonths[format(date, 'YYYY-MM-DD')]) {
      return;
    }
    this.setState(
      state => ({
        fetchedMonths: {
          ...state.fetchedMonths,
          [format(date, 'YYYY-MM-DD')]: true,
        },
      }),
      async () => {
        const newItems = await fetchEvent(date);
        this.setState(state => ({
          items: {
            ...state.items,
            ...newItems,
          },
        }));
      }
    );
  }

  _filter = () => {
    Alert.alert('show filter');
  };

  _loadItems = day => {
    const monthStart = startOfMonth(day.dateString);
    [addMonths(monthStart, -1), monthStart, addMonths(monthStart, 1)].forEach(
      date => {
        this._fetchEvents(date);
      }
    );
  };

  _onDayChange = day => {
    this._loadItems(day);
    this.setState({monthName: format(day.dateString, 'MMMM')});
  };

  _renderItem = item => {
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigation.navigate('EventDetails', {event: item})
        }
      >
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'red',
            marginRight: 5,
          }}
        />
        <View style={{flex: 1}}>
          <Text>{item.name}</Text>
          <Text>{item.name}</Text>
          {item.maxParticipants && (
            <Text>
              {item.maxParticipants - item.participations.length} spots
              remaining
            </Text>
          )}
        </View>
        <View style={{width: 75, alignItems: 'flex-end'}}>
          <Text>11:00 am</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  _rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  render() {
    return (
      <View style={styles.container}>
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
          items={this.state.items}
          selected={this.state.selected}
          loadItemsForMonth={this._loadItems}
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
});

export default EventListingScreen;
