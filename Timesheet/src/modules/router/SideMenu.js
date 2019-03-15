import React, {Component} from "react";
import {Image} from 'react-native';
import { Container, Content, Text, List, ListItem } from 'native-base';
import { TouchableOpacity } from "react-native-gesture-handler";
const routes = ["Home", "Profile", "TimeSheet", "Calender", "Project"];

export default class SideMenu extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
          </Image>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
         <TouchableOpacity
            style={{backgroundColor: 'red', height: 20}}
            onPress={() => this.props.navigation.popToTop()}  >
                <Text >
                   LOG OUT
                </Text>
        </TouchableOpacity>  
        </Content>
      </Container>
    );
  }
}