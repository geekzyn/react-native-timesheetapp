import React, {Component} from "react";
import { View, Text, TouchableOpacity } from "react-native";

class LoginScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#52BCDB' }}>
        <Text>Login Screen</Text>
        <TouchableOpacity
    style={{backgroundColor: 'red', height: 20}}
    onPress={() => this.props.navigation.navigate('Home')}  >
    <Text>
        GO TO Home Screen
    </Text>
  </TouchableOpacity>
      </View>
    );
  }
}

export default LoginScreen