import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {iOSUIKit} from 'react-native-typography';
import {MaterialIcons} from '@expo/vector-icons';

import Card from '../components/Card';
import ListItem from '../components/ListItem';

function createScreen(title, links) {
  return class Screen extends Component {
    static navigationOptions = {
      title,
    };

    render() {
      return (
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <Card
            containerStyle={{
              paddingVertical: 0,
              paddingRight: 0,
              marginTop: 10,
            }}
          >
            {links.map((link, idx) => (
              <ListItem
                key={link.name}
                content={
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    <View style={{justifyContent: 'center'}}>
                      <Text style={{...iOSUIKit.title3Object}}>
                        {link.title}
                      </Text>
                    </View>
                  </View>
                }
                control={
                  <MaterialIcons name="chevron-right" size={28} color="#888" />
                }
                onPress={() => {
                  this.props.navigation.navigate(link.name);
                }}
                last={idx + 1 === links.length}
              />
            ))}
          </Card>
        </ScrollView>
      );
    }
  };
}

export default createScreen;
