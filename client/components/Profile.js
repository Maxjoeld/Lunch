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
      'Leaving Lunch',
      'Are you sure you want to log out',
      [
        {text: 'Cancel', onPress: () => this.props.navigation.navigate('Home')},
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