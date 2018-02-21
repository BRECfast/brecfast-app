import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {iOSUIKit} from 'react-native-typography';

const Card = ({containerStyle, title, children, titleStyle}) => (
  <View style={[styles.cardContainer, containerStyle]}>
    {title && <Text style={[styles.cardTitle, titleStyle]}>{title}</Text>}
    {children}
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    shadowOffset: {width: 0, height: 1},
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
    marginTop: 10,
  },
  cardTitle: {
    ...iOSUIKit.bodyObject,
    textAlign: 'center',
  },
});

export default Card;
