import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import axios from 'axios';

class HomeScreen extends Component {
  state = { 
    loading: false,
    data: [],
    error: null,
    refreshing: false,
    base_url: "http://localhost:8000"
   }

  componentDidMount() {
    this.fetchDataFromApi();
  }

  fetchDataFromApi = () => {
    this.setState({ loading: true })
    axios.get("http://localhost:8000/api/list")
      .then(res => {
        console.log(res.data)
        this.setState({
          data: res.data,
          error: null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading : false });
      });
  }

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.fetchDataFromApi();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
          marginTop: "3%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };


  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => this.props.navigation.navigate('Detail',
              {name: `${item.name}`, menu: `${item.menu}`,
              img: `${this.state.base_url}${item.photo}`,
              address: `${item.address}`})}
              avatar={<Avatar
                      source={{uri: `${this.state.base_url}${item.photo}`}}
                      onPress={() => console.log("Works!")}
                      containerStyle={{marginBottom: 2}}
                      avatarStyle={{resizeMode: "cover"}}
                      width={140}
                      height={130}
                />}
              title={`${item.name}`}
              titleStyle={{ fontSize: 16}}
              titleContainerStyle = {{ marginLeft: 50 }}
              subtitle={<View style={styles.subtitleView}>
            <Text style={styles.menuText}>{item.menu}</Text>
            <Text style={styles.locText}>{item.address}</Text>
            </View>}
              containerStyle={{ borderBottomWidth: 0, marginBottom: 20 }}
            />
          )}
        />
        <Text onPress={() => this.props.navigation.navigate('Signin')}>
          Auth
        </Text>
      </List>
    );
  }
}
 
export default HomeScreen;

          // keyExtractor={item => item.id}
          // ItemSeparatorComponent={this.renderSeparator}
          // ListHeaderComponent={this.renderHeader}
          // onRefresh={this.handleRefresh}
          // refreshing={this.state.refreshing}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5,
    marginLeft: 50
  },
  menuText: {
    paddingLeft: 10,
    color: 'grey'
  },
  locText: {
    paddingLeft: 10,
    color: 'grey',
    marginTop: 6,
    fontSize: 12
  },
  titleText: {
    fontWeight: 'bold'
  },
  restaurantImage: {
    width: 600,
    height: 800
  }
});