import { AsyncStorage } from "react-native";

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token')
      .then(res => {
        if (res !== null) {
          fetch('http://localhost:8000/api/current_user/', {
            headers: {
              Authorization: `JWT ${AsyncStorage.getItem('token')}`
            }
          })
          .then(res => res.json())
          .then(json => {
            resolve({ success: true,  username: json.username, 
              signedIn: true, });
          })
          .catch((err) => console.log(err));
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};