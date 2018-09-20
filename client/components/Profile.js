import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage,Alert, View,Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

class Profile extends React.Component {
  state = {
  };

  logout = () => {
    console.log('logged');
    AsyncStorage.removeItem('token');
    this.props.navigation.navigate('Signin');
  }
  
  render() {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.logout()},
      ],
      { cancelable: false }
    )    
    return (
      <View>

        <Text>Hey</Text>
      </View>
    );
  }
}

export default Profile;