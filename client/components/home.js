import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import axios from 'axios';

class HomeScreen extends Component {
  state = { 
    loading: false,
    data: [
      {
        "id": 5,
        "name": "Black Tap",
        "address": "136 W 55th St\r\nNew York, NY 10019\r\nb/t 7th Ave & Avenue Of The Americas \r\nMidtown West",
        "photo": "food/photos/o_PrVya5b_oncYZjh.jpg",
        "menu": "Burger, Salad, Cesar Salad",
        "tags": "Burgers, warm, nice",
        "pub_date": "2018-07-11T23:03:37.790528Z",
        "writer": null
      },
      {
        "id": 4,
        "name": "Burger & Lobster",
        "address": "1718 menahan st",
        "photo": "food/photos/o_PrVya5b.jpg",
        "menu": "Newone",
        "tags": "Nothing",
        "pub_date": "2018-07-11T16:30:03.301600Z",
        "writer": null
      },
      {
        "id": 3,
        "name": "Burger & Lobster",
        "address": "1718 menahan st",
        "photo": "food/photos/o.jpg",
        "menu": "Brugers, fries and a lot more",
        "tags": "burgers, warm, cozy",
        "pub_date": "2018-07-11T16:29:12.522117Z",
        "writer": null
      },
      {
        "id": 2,
        "name": "Burger & Lobster",
        "address": "39 W 19th St\r\nNew York, NY 10011",
        "photo": null,
        "menu": "https://s3-media2.fl.yelpcdn.com/bphoto/ysH4wU0R13y3N3jG7GYFrw/o.jpg",
        "tags": "burgers, warm, cozy",
        "pub_date": "2018-07-11T15:28:07.847879Z",
        "writer": null
      },
      {
        "id": 1,
        "name": "Maximo De La Rosa",
        "address": "123 road",
        "photo": null,
        "menu": "Boring menu",
        "tags": "notags",
        "pub_date": "2018-07-11T13:15:48.301258Z",
        "writer": null
      }
    ],
    error: null,
    refreshing: false,
    base_url: "http://127.0.0.1:8000"
   }

  componentDidMount() {
    this.fetchDataFromApi();
  }

  fetchDataFromApi = () => {
    const url = "http://localhost:8000/api/list"
    this.setState({ loading: true })

    // axios.get("http://localhost:8000/api/list")
      // .then(() => console.log('sucessss'))
      // .then(() => {
        this.setState({
          // data: res,
          error: null,
          loading: false,
          refreshing: false
        });
      // })
      // .catch(error => {
      //   console.log({error})
      //   this.setState({ error, loading : false });
      // });
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
              titleContainerStyle = {{ marginLeft: 120 }}
              subtitle={<View style={styles.subtitleView}>
            <Text style={styles.menuText}>{item.menu}</Text>
            <Text style={styles.locText}>{item.address}</Text>
            </View>}
              containerStyle={{ borderBottomWidth: 0, marginBottom: 20 }}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}

        />
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
    marginLeft: 110
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