import React, {Component} from 'react';
import {Button, ScrollView, Text, TextInput, View} from 'react-native';

import AuthenticatedActionButton from '../user/AuthenticatedActionButton';
import ModalSelector from '../components/ModalSelector';

class CreateEventScreen extends Component {
  static navigationOptions = {
    title: 'Create Event',
  };

  state = {
    user: {},
    text: '',
  };

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#FFF',
        }}
      >
        <AuthenticatedActionButton
          authenticated={!!this.state.user}
          onClose={() => {
            this.setState({user: true});
          }}
        >
          <View style={{paddingHorizontal: 20}}>
            <View style={{marginTop: 10}}>
              <Text>Activity</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => this.setState({text})}
                value={this.state.text}
              />
            </View>
            <View style={{marginTop: 10}}>
              <ModalSelector
                title="Locations"
                items={[{title: 'Foo'}]}
                renderItem={item => <View />}
                onSelect={item => {
                  console.log(item); // null for cancel
                }}
              >
                {({show}) => <Button title="Location" onPress={show} />}
              </ModalSelector>
            </View>
            <View style={{marginTop: 10}}>
              <Text>Starts</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => this.setState({text})}
                value={this.state.text}
              />
            </View>
            <View style={{marginTop: 10}}>
              <Text>Min # of Participants</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => this.setState({text})}
                value={this.state.text}
              />
            </View>
            <View style={{marginTop: 10}}>
              <Text>Max # of Participants</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => this.setState({text})}
                value={this.state.text}
              />
            </View>
            <View style={{marginTop: 10}}>
              <ModalSelector
                title="Invitees"
                items={[{title: 'Stephen'}]}
                renderItem={item => <View />}
                onSelect={item => {
                  console.log(item); // null for cancel
                }}
              >
                {({show}) => <Button title="Invitees" onPress={show} />}
              </ModalSelector>
            </View>
          </View>
        </AuthenticatedActionButton>
      </ScrollView>
    );
  }
}

export default CreateEventScreen;
