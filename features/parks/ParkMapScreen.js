import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Location, MapView} from 'expo';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import SafeAreaView from 'react-native-safe-area-view';
import SideSwipe from 'react-native-sideswipe';
import Card from '../components/Card';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class ParkMapScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      title: 'Park Map',
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

  state = {
    location: null,
    markers: [
      {
        id: 'Park 1',
        coords: {
          latitude: 30.4583,
          longitude: -91.1403,
        },
      },
    ],
  };

  async componentWillMount() {
    this.props.navigation.setParams({filter: this._filter});
    let location = await Location.getCurrentPositionAsync({});
    this.setState(
      state => ({
        location,
        markers: [...state.markers, {id: 'me', coords: location.coords}],
      }),
      () => {
        this.map.fitToSuppliedMarkers(this.state.markers.map(x => x.id), true);
      }
    );
  }

  _filter = () => {
    Alert.alert('show filter');
  };

  render() {
    const {location, markers} = this.state;
    return (
      <View style={styles.container}>
        {location && (
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
              this.map.animateToCoordinate(
                this.state.markers[index].coords,
                300
              )
            }
            renderItem={({itemIndex, currentIndex, item, animatedValue}) => (
              <View style={{paddingHorizontal: 10}}>
                <Card
                  {...item}
                  containerStyle={{
                    width: width * 0.8 - 20,
                    height: 100,
                  }}
                  title={item.id}
                  index={itemIndex}
                  currentIndex={currentIndex}
                  animatedValue={animatedValue}
                />
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

export default ParkMapScreen;