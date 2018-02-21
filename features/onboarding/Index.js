import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Card,
  Header,
  Actions,
  ContentContainer,
  GradientBackgrounds,
} from 'react-native-onboarding-component';

const {width: deviceWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  gradient: {height: '56%'},
  image: {flex: 1, borderRadius: 5},
  card: {
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 26,
    fontWeight: '300',
    marginBottom: 30,
    color: 'black',
  },
  description: {
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
  },
});

const pages = [
  {
    title: 'Welcome to LetMeLift',
    description:
      'We are a community of people with one goal: to get healthier together.',
    backgroundColor: '#F14C2B',
    header: (
      <Image
        source={require('./go_everywhere.png')}
        style={styles.image}
        resizeMode={Image.resizeMode.contain}
      />
    ),
  },
  {
    title: 'Enable Location Services',
    description:
      'Enabling location services will allow us to find friends and gyms near you.',
    backgroundColor: '#111ED5',
    header: (
      <Image
        source={require('./cheap_travel.png')}
        style={styles.image}
        resizeMode={Image.resizeMode.contain}
      />
    ),
  },
  {
    title: 'Enable Push Notifications',
    description: `Don't miss an opportunity to have a killer workout! We won't span you. Promise.`,
    backgroundColor: '#1468FF',
    header: (
      <Image
        source={require('./amazing_hotels.png')}
        style={styles.image}
        resizeMode={Image.resizeMode.contain}
      />
    ),
  },
  {
    title: "You're Awesome!",
    // description: 'Blah blah blah....',
    backgroundColor: '#FFA11C',
    header: (
      <Image
        source={require('./stay_warm.png')}
        style={styles.image}
        resizeMode={Image.resizeMode.contain}
      />
    ),
  },
];

class Onboarding extends Component {
  scrollX = new Animated.Value(0);

  scrollTo = x => {
    this.scrollView._component.scrollTo({
      x,
      animated: true,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <GradientBackgrounds
          colors={pages.map(page => page.backgroundColor)}
          scrollX={this.scrollX}
          style={styles.gradient}
        />
        <Animated.ScrollView
          horizontal
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: this.scrollX}}}],
            {useNativeDriver: true}
          )}
        >
          {pages.map((page, index) => (
            <View
              style={[
                styles.card,
                {width: deviceWidth, flexDirection: 'column'},
              ]}
              key={`pages-${index}`}
            >
              <Header>
                <Card scrollX={this.scrollX} index={index}>
                  {page.header}
                </Card>
              </Header>
              <ContentContainer>
                <Text style={styles.title}>{page.title}</Text>
                <Text style={styles.description}>{page.description}</Text>
              </ContentContainer>
              <Actions
                actions={[
                  {
                    style: {
                      color: page.backgroundColor,
                      marginBottom: 20,
                      fontSize: 24,
                    },
                    title:
                      index + 1 === pages.length ? `Let's Do This` : 'Continue',
                    onPress: async () => {
                      if (page.onPress) {
                        await page.onPress();
                      }
                      index + 1 === pages.length
                        ? this.props.onComplete()
                        : this.scrollTo(deviceWidth * (index + 1));
                    },
                  },
                ]}
              />
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

export default Onboarding;
