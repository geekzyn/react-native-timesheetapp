import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#D499D4' }}>
        <Text>Home Screen</Text>
        
        <TouchableOpacity
            style={{backgroundColor: 'red', height: 20}}
            onPress={() => this.props.navigation.navigate('Dashboard')}  >
                <Text style ={{color: "white"}}>
                    GO TO Dashboard
                </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen