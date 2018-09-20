import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, TextInput, View, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

class SignupForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        AsyncStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <FormLabel htmlFor="username">Username</FormLabel>
        <FormInput
          type="text"
          name="username"
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          type="password"
          name="password"
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
        />
        <View style={{ display: 'flex', width: '100%', alignItems: 'center',justifyContent: 'center'}}>
          <Text style={styles.button} onPress={e => this.signup(e, this.state)}>Submit</Text>
          <Text style={styles.account}>
            Already a member ?
            <Text onPress={() => this.props.navigation.navigate('Signin')}> Log in</Text>
          </Text>
        </View>
      </View>
    );
  }
}

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',    
    width: '100%',
    fontSize: 24,
    marginBottom: 40,

  },
  account: {
    marginTop: 50,
  },
  button: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: 30,
    color: 'white',
    backgroundColor: 'black',
  }
});