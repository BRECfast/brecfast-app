import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

const ListItem = ({last, content, control, loading, onPress, style}) => {
  const Wrapper = onPress ? TouchableOpacity : View;
  const buttonProps = onPress ? {onPress} : {};
  return (
    <Wrapper
      style={[
        {
          flexDirection: 'row',
          paddingVertical: 10,
          paddingRight: 10,
        },
        !last && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: '#AAA',
        },
        style,
      ]}
      {...buttonProps}
    >
      <View style={{flex: 1, justifyContent: 'center'}}>{content}</View>
      {control && (
        <View style={{justifyContent: 'center'}}>
          {control}
          {loading && <ControlLoader />}
        </View>
      )}
    </Wrapper>
  );
};

const ControlLoader = () => (
  <View
    style={{
      backgroundColor: 'rgba(255,255,255,0.5)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }}
  />
);

export default ListItem;
