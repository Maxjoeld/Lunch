import React from "react";
import { createRootNavigator } from "./router";
import { isSignedIn } from "./auth";

export default class App extends React.Component {
  state = {
      signedIn: false,
      checkedSignIn: false
    };

  componentDidMount() {
    // if (this.state.logged_in) {
    //   fetch('http://localhost:8000/core/current_user/', {
    //     headers: {
    //       Authorization: `JWT ${localStorage.getItem('token')}`
    //     }
    //   })
    //     .then(res => res.json())
    //     .then(json => {
    //       this.setState({ username: json.username });
    //     });
    // }
    // isSignedIn()
    //   .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
    //   .catch(err => alert("An error occurred"));
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.token);
        AsyncStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      });
  };

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    // if (!checkedSignIn) {
    //   return null;
    // }

    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}
