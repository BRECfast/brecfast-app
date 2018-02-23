import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';

const Loading = ({visible}) =>
  visible ? (
    <Modal visible={true} transparent={true}>
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        <ActivityIndicator animating={true} color="#000" />
      </View>
    </Modal>
  ) : null;

export default Loading;
