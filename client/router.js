import React from 'react';
import { FontAwesome } from "react-native-vector-icons";
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator  } from 'react-navigation';

import HomeScreen from './components/home';
import ProfileScreen from './components/Profile';
import DetailScreen from './components/detail';
import SigninScreen from './components/LoginForm';
import SignupScreen from './components/SignupForm';


export const SignedIn = createStackNavigator({
  Home: { screen: HomeScreen,
          navigationOptions: {
              title: 'Home',
              headerBackTitle: 'Back',
          },
        },
  Detail: { screen: DetailScreen,
            navigationOptions: {
              title: 'Detail',
            }
          },
});
const tabNav = createBottomTabNavigator({
  Home: { screen: SignedIn,
          navigationOptions: {
            headerBackTitle: 'Back',
            tabBarLabel: "Home",
            tabBarIcon: ({ tintColor }) => (
              <FontAwesome name="home" size={30} color={tintColor} />
            )
          }
        },
  Profile: { screen: ProfileScreen,
            navigationOptions: {
              tabBarLabel: "Profile", 
              tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="sign-out" size={30} color={tintColor} />
              )
            }
          },
        // })
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
      tabNav: {
        screen: tabNav,
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "tabNav" : "SignedOut"
    }
  );
};
