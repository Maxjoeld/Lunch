import React from "react";
import axios from 'axios';
import { createRootNavigator } from "./router";
import { AsyncStorage } from 'react-native';
import { isSignedIn } from "./components/auth";

export default class App extends React.Component {
  state = {
      signedIn: false,
      checkedSignIn: false
    };

    componentDidMount() {
      isSignedIn()
      .then(res => {
        this.setState({ 
          username: res.username, 
          signedIn: res.success, 
          checkedSignIn: res.success });
        }
      )
      .catch(err => alert("An error occurred"));
    }
    
  
  render() {
    const { checkedSignIn, signedIn } = this.state;
    console.log('woooooooooooooo')
    console.log({ state: this.state.signedIn});
    // console.log(AsyncStorage.getItem('token'));
    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    // if (!checkedSignIn) {
    //   return null;
    // }

    const Layout = createRootNavigator(signedIn);
    return (
        <Layout />
    )
  }
}
