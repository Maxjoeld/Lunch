import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { AsyncStorage, StyleSheet, Text, View, } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  login = (e, data) => {
    e.preventDefault();
    const body = data;
    axios.post('http://localhost:8000/token-auth/', body)
    .then(res => {
      AsyncStorage.setItem('token', res.data.token);
      this.props.navigation.navigate('tabNav');
    })
    .catch((err) => console.log(err))
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <FormLabel>Username</FormLabel>
        <FormInput
          name="username"
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
        />
        <FormLabel>Password</FormLabel>
        <FormInput secureTextEntry={true}
          name="password"
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
        />
        <View style={{ display: 'flex', width: '100%', alignItems: 'center',justifyContent: 'center'}}>
          <Text style={styles.button} onPress={e => this.login(e, this.state)}>Submit</Text>
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
  },
});