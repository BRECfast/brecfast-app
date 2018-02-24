import React, {Component} from 'react';
import {
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {iOSUIKit} from 'react-native-typography';
import {Feather} from '@expo/vector-icons';
import {Header, List, ListItem} from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';

import {COLORS, getIcon} from '../../features/util/constants';

class ModalSelector extends Component {
  state = {
    show: false,
  };
  render() {
    return (
      <View>
        {this.props.children({show: () => this.setState({show: true})})}
        <Modal
          visible={this.state.show}
          animationType={'slide'}
          onRequestClose={() => this.setState({show: false})}
        >
          <Header
            statusBarProps={{barStyle: 'light-content'}}
            outerContainerStyles={{height: 85, backgroundColor: COLORS.green}}
            leftComponent={
              <TouchableOpacity
                onPress={() => {
                  this.props.onSelect(null);
                  this.setState({show: false});
                }}
              >
                <Feather name="x" size={24} color="#FFF" />
              </TouchableOpacity>
            }
            centerComponent={{
              text: this.props.title,
              style: {...iOSUIKit.title3Object, color: '#fff', fontWeight: 'bold'},
            }}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: COLORS.grey,
              borderWidth: .5,
              marginTop: -1,
            }}
            onChangeText={text => this.setState({text})}
            value={this.state.text}
          />
          <ScrollView styles={{flex: 1}}>
            <SafeAreaView forceInset={{top: 'never', bottom: 'always'}}>
              <List containerStyle={{marginTop: 0}}>
                {this.props.items.map((item, i) => {
                  const iconProps = this.props.showIcons ? {
                    avatar:getIcon(item.id),
                    avatarStyle:{ backgroundColor: '#fff' },
                  } : {}
                  return <ListItem
                    key={i}
                    title={item.title}
                    subtitle={item.subtitle}
                    onPress={() => {
                      this.props.onSelect(item);
                      this.setState({show: false});
                    }}
                    {...iconProps}
                  />
                })}
              </List>
            </SafeAreaView>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

export default ModalSelector;
