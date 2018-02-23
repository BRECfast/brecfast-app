import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Location, MapView} from 'expo';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import SafeAreaView from 'react-native-safe-area-view';
import SideSwipe from 'react-native-sideswipe';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {COLORS, getIcon} from '../../features/util/constants';
import Card from '../components/Card';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class ParkMapScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      title: 'Parks',
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
        fontWeight: 'bold',
      },
      headerStyle: {backgroundColor: '#556535'},
      headerRight: !!params.filter && (
        <TouchableOpacity
          onPress={params.filter}
          style={{marginRight: 10, borderWidth: 1.5, borderColor: "#fff", borderRadius: 16, width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        >
          <MaterialCommunityIcons name="chevron-down" size={20} color="#fff" style={{marginTop: 3}} />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    location: null,
  };

  async componentWillMount() {
    this.props.navigation.setParams({filter: this._filter});
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location,
    });
  }

  _filter = () => {
    Alert.alert('show filter');
  };

  render() {
    const {location} = this.state;
    const {data: {loading, allParks}} = this.props;
    const markers = (allParks || []).map(x => ({
      ...x,
      coords: {
        latitude: x.latitude,
        longitude: x.longitude,
      },
    }));
    return (
      <View style={styles.container}>
        {!loading &&
          location && (
            <MapView
              provider={this.props.provider}
              ref={ref => {
                this.map = ref;
              }}
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
            >
              {markers.map(x => (
                <MapView.Marker
                  key={x.id}
                  identifier={x.id}
                  coordinate={x.coords}
                />
              ))}
            </MapView>
          )}
        <SafeAreaView forceInset={{bottom: 'always'}}>
          <SideSwipe
            index={this.state.currentIndex}
            itemWidth={width * 0.8}
            style={{width}}
            data={markers}
            contentOffset={(width - width * 0.8) / 2}
            onIndexChange={index =>
              this.map.animateToCoordinate(markers[index].coords, 300)
            }
            renderItem={({itemIndex, currentIndex, item, animatedValue}) => (
              <View style={{paddingHorizontal: 10}}>
                <Card
                  {...item}
                  containerStyle={{
                    width: width * 0.8 - 20,
                    flexDirection: 'row',
                    backgroundColor: '#FFF',
                    padding: 16,
                    shadowOffset: {width: 0, height: 4},
                    shadowRadius: 8,
                    borderRadius: 24,
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    marginTop: 12,
                    marginBottom: 16,
                  }}

                  index={itemIndex}
                  currentIndex={currentIndex}
                  animatedValue={animatedValue}
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    <Text>{item.address}</Text>
                    <Text>{item.city}, LA {item.zipcode}</Text>
                    <Text style={{fontWeight: 'bold', marginTop: 8}}>Available Activities</Text>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                      {item.activities.map(activity => <Image key={activity.id} source={getIcon(activity.id)} style={{
                          height: 16,
                          width: 16,
                          marginRight: 8,
                        }} />)}
                    </View>
                    {/* <Text>{JSON.stringify(item, null, 2)}</Text> */}
                  </View>
                  <View style={{width: 18 }}>
                    <MaterialCommunityIcons name="chevron-right" size={18} color={COLORS.grey} />
                  </View>
                </Card>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  wrapper: {
    height: 100,
    width: '80%',
    alignItems: 'center',
  },
});

export default graphql(gql`
  {
    allParks {
      id
      name
      latitude
      longitude
      address
      city
      zipcode
      classification
      activities {
        id
        name
      }
    }
  }
`)(ParkMapScreen);
