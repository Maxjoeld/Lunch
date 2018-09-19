import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
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
          <Text style={styles.button} onPress={e => this.props.login(e, this.state)}>Submit</Text>
          <Text style={styles.account}>
            Don't have an Account ? 
            <Text onPress={() => this.props.navigation.navigate('Signup')}>Sign Up</Text>
          </Text>
        </View>
      </View>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};

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