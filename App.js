import React from 'react';
import {AppState, Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Constants, Segment} from 'expo';
import DropdownAlert from 'react-native-dropdownalert';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';

import './features/util/reactotron';

import {SEGMENT_IOS_KEY, SEGMENT_ANDROID_KEY} from './features/util/constants';
import Navigator from './features/navigation/Navigator';
import {registerDropdown} from './features/alerts/service';
import {registerForLocation} from './features/permissions/index';

// Replace http://my-api.graphql.com with your GraphQL API’s URL.
const client = new ApolloClient({
  link: new HttpLink({uri: 'https://api.graph.cool/simple/v1/brecfast'}),
  cache: new InMemoryCache(),
});

// gets the current screen from navigation state
function getCurrentRoute(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRoute(route);
  }
  return route;
}

class App extends React.Component {
  state = {
    appState: AppState.currentState,
  };

  componentWillMount() {
    Segment.initialize({
      iosWriteKey: SEGMENT_IOS_KEY,
      androidWriteKey: SEGMENT_ANDROID_KEY,
    });

    Segment.identifyWithTraits(Constants.deviceId, {
      version: Constants.manifest.revisionId || Constants.manifest.version,
    });

    this._refreshAppState();
    AppState.addEventListener('change', this._handleAppStateChange);

    registerForLocation();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this._refreshAppState();
    }

    this.setState({appState: nextAppState});
  };

  _refreshAppState = async () => {
    Segment.track('App Open');
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Navigator
              onNavigationStateChange={(prevState, currentState) => {
                const currentScreen = getCurrentRoute(currentState);
                const prevScreen = getCurrentRoute(prevState);

                if (prevScreen !== currentScreen) {
                  Segment.screen(currentScreen.routeName);
                }
              }}
            />
          </View>

          <DropdownAlert
            ref={ref => registerDropdown(ref)}
            defaultContainer={styles.dropdownAlert}
          />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownAlert: {
    ...Platform.select({
      ios: {
        ...ifIphoneX({paddingTop: 30}, {paddingTop: 20}),
      },
      android: {
        paddingTop: 0,
      },
    }),
    padding: 8,
    flexDirection: 'row',
  },
});

export default App;
