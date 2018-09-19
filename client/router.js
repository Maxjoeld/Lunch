import React from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image} from 'react-native';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements';
import { createStackNavigator, createSwitchNavigator  } from 'react-navigation';
import { constants } from 'expo';
import HomeScreen from './components/home';
import DetailScreen from './components/detail';
import SigninScreen from './components/LoginForm';
import SignupScreen from './components/SignupForm';
// import RequireAuth from './hoc/requireAuth';

export const SignedIn = createStackNavigator({
  Home: { screen: HomeScreen,
          navigationOptions: {
              title: 'Home',
              // headerBackTitle: 'Back',
          },
        },
  Detail: { screen: DetailScreen,
            navigationOptions: {
              title: 'Detail',
            } ,
          },
});

export const SignedOut = createStackNavigator({
  Signin: { screen: SigninScreen,
    navigationOptions: {
      title: 'Log in',
    },
  },
  Signup: { screen: SignupScreen,
    navigationOptions: {
      title: 'Sign Up',
    },
  }
});

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn,
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
