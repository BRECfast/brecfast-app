import {StackNavigator} from 'react-navigation';
import {iOSUIKit} from 'react-native-typography';

import EventListingScreen from '../events/EventListingScreen';
import EventDetailsScreen from '../events/EventDetailsScreen';
import CreateEventScreen from '../events/CreateEventScreen';
import MyProfileScreen from '../user/MyProfileScreen';

const Navigator = StackNavigator(
  {
    Events: EventListingScreen,
    EventDetails: EventDetailsScreen,
    CreateEvent: CreateEventScreen,
    MyProfile: MyProfileScreen,
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#FFF',
      },
      headerTitleStyle: [iOSUIKit.title3],
    },
  }
);

export default Navigator;