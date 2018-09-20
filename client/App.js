import React from "react";
import { createRootNavigator } from "./router";
import { AsyncStorage } from 'react-native';
import { isSignedIn } from "./components/auth";

export default class App extends React.Component {
  state = {
      signedIn: false,
      checkedSignIn: false
    };

  componentDidMount() {
    console.log({hey:
      AsyncStorage.getItem('token').then((value) => {
        console.log({value});
       })

    }
    )
    
    isSignedIn()
    .then(res => {
      console.log({res})
      if (res) {
        console.log('we made it')
        fetch('http://localhost:8000/api/current_user/', {
          headers: {
            Authorization: `JWT ${AsyncStorage.getItem('token')}`
          }
        })
        .then(res => res.json())
        .then(json => {
          console.log('okay')
          this.setState({ 
            username: json.username, 
            signedIn: true, 
            checkedSignIn: true  });
        })
      } else {
        this.setState({ 
          signedIn: false, 
          })
      }
    })
    .catch(err => console.log('error'));

    // if (AsyncStorage.getItem('token')) {
    // }
    // else {
    //   this.setState({ 
    //     username: '', 
    //     signedIn: false, 
    //     checkedSignIn: false  });
    // }
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
