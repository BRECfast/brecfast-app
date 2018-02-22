import React, {Component} from 'react';
import {Button, Modal, Text, View} from 'react-native';

class AuthenticatedActionButton extends Component {
  state = {
    showSignUp: false,
  };
  render() {
    const {
      authenticated,
      buttonText = 'Complete profile to continue',
      children,
      onClose,
    } = this.props;
    return authenticated ? (
      children
    ) : (
      <View>
        <Button
          title={buttonText}
          onPress={() => {
            this.setState({showSignUp: true});
          }}
        />
        <Modal visible={this.state.showSignUp} animationType="slide">
          <View
            style={{flex: 1, backgroundColor: '#FFF', justifyContent: 'center'}}
          >
            <Text style={{textAlign: 'center'}}>Complete Profile UI</Text>
            <Button
              title="Close"
              onPress={() => {
                this.setState({showSignUp: false});
                onClose && onClose();
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default AuthenticatedActionButton;
