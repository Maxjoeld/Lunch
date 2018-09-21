import React, { Component } from 'react';
import { FontAwesome } from "react-native-vector-icons";
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import token from './token';
import axios from 'axios';
import { isSignedIn } from "./auth";

class HomeScreen extends Component {
  state = { 
    loading: true,
    data: [],
    error: null,
    refreshing: false,
    base_url: "http://localhost:8000/api",
   }

  componentDidMount() {
    isSignedIn()
    .then(res => {
      if (!res.success) {
        return this.props.navigation.navigate('Signin');
      } 
    })
    .catch(err => alert("An error occurred"));
    this.fetchDataFromApi();
  }

  fetchDataFromApi = () => {


    // this.setState({ loading: true })
    console.log({ thisistoken: token.token});
    axios.get('https://api.yelp.com/v3/businesses/search?term=delis&location=11385',{
      headers: {
        'Authorization': `bearer ${token.token}`
      }})
      .then(res => {
        // console.log({thisistheresponse: res.data})
        this.setState({
          data: res.data.businesses,
          error: null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        console.log({thisistheerror: error})
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
    const data = this.state.data;
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        {this.state.data.length > 1 ?
          <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem 
              onPress={() => this.props.navigation.navigate('Detail',
              {name: `${item.alias}`, menu: `${item.display_phone}`,
              img: item.image_url,
              address: `${item.location.display_address}`,
              review_count: item.review_count,
              rating: item.rating})}
              avatar={<Avatar
                      source={{uri: item.image_url ? item.image_url: 'noimg'}}
                      containerStyle={{marginBottom: 2}}
                      avatarStyle={{resizeMode: "cover"}}
                      width={140}
                      height={130}
                />}
              title={<Text style={styles.titleText}>{item.name}</Text>}
              titleStyle={{ fontSize: 16}}
              // titleContainerStyle = {{ marginLeft: 50 }}
              subtitle={<View style={styles.subtitleView}>
                          <Text style={styles.menuText}>{item.display_phone}</Text>
                          <Text style={styles.locText}>{item.location.display_address}</Text>
                          <View style={{ }}>
                            <Text style={styles.locText}>{item.review_count} Reviews</Text>
                            <Text style={styles.locText}>
                              <FontAwesome name="star" size={15} style={{ marginRight: 10, color: 'gold'}}/>
                              {item.rating}</Text>
                          </View>
                        </View>}
              containerStyle={{ borderBottomWidth: 0, marginBottom: 20 }}
            />
          )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        loading={this.loading}
        /> 
        : <Text>Loading</Text>}
      </List>
    );
  }
}
 
export default HomeScreen;

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
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 20,
  },
  restaurantImage: {
    width: 600,
    height: 800
  }
});