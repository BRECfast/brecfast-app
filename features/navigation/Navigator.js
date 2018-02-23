import {StackNavigator} from 'react-navigation';
import {iOSUIKit} from 'react-native-typography';

import EventListingScreen from '../events/EventListingScreen';
import EventDetailsScreen from '../events/EventDetailsScreen';
import CreateEventScreen from '../events/CreateEventScreen';
import MyProfileScreen from '../user/MyProfileScreen';
import ParkMapScreen from '../parks/ParkMapScreen';

const Navigator = StackNavigator(
  {
    Events: EventListingScreen,
    EventDetails: EventDetailsScreen,
    CreateEvent: CreateEventScreen,
    MyProfile: MyProfileScreen,
    ParkMap: ParkMapScreen,
  },
  {
    navigationOptions: {
      headerTitleStyle: [iOSUIKit.title3, {
        color: '#fff',
        fontWeight: 'bold',
      }],
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#556535',
      },
    },
  }
);

export default Navigator;
