import React from 'react';
import PropTypes from 'prop-types';
import { Button, AppRegistry, Text, TextInput, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <View onPress={e => this.props.handle_login(e, this.state)}>
        <Text>Log In</Text>
        <FormLabel htmlFor="username">Username</FormLabel>
        <FormInput
          type="text"
          value={this.state.username}
          onChangeText={this.handle_change}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          type="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <Button title="submit" />
      </View>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};