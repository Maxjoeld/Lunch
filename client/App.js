import React from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image} from 'react-native';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { constants } from 'expo';
import HomeScreen from './components/home';
import DetailScreen from './components/detail';
import SigninScreen from './components/LoginForm';
import SignupScreen from './components/SignupForm';


export default createStackNavigator({
  Home: { screen: HomeScreen,
          navigationOptions: {
              title: 'Home',
              headerBackTitle: 'Back',
          },
        },
  Detail: { screen: DetailScreen,
          navigationOptions: {
            title: 'Detail',
        },
      },
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

    // export default class App extends React.Component {
    //   render() {
    //     return (
    //       <View style={styles.container}>
    //         <Text>Wow this actually works</Text>
    //         <Text>Changes you make will automatically reload.</Text>
    //         <Text>Shake your phone to open the developer menu.</Text>
    //       </View>
    //     );
    //   }
    // }