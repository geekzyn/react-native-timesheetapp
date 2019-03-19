import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Container, Header } from "native-base";

class ProjectList extends Component {

    constructor(props) {
        super(props)
    }
    

    onProjectClicked = () => {
      this.props.navigation.navigate("ActivityList");
    }

  render() {
    return (
      <View style={{ flexDirection: 'row', flex: 1, alignItems: "flex-start", justifyContent: "center", backgroundColor: 'grey' }}>
        <FlatList
                    data={[
                      {costumerName: 'Customer 1', ProjectList: [
                          {name: 'P1'}, 
                          {name: 'P1'}
                        ]},
                      {costumerName: 'Customer 2', ProjectList: [{name: 'P1'}, {name: 'P3'}]},
                      {costumerName: 'Customer 3', ProjectList: [{name: "P16"}, {name: "P901"}]},
                      {costumerName: 'Customer 4', ProjectList: [{name: "P1"}, {name: "P1"}]},
                      {costumerName: 'Customer 5', ProjectList: [{name: "P1"}, {name: "P1"}]},
                      {costumerName: 'Customer 6', ProjectList: [{name: "P1"}, {name: "P1"}]},
                      {costumerName: 'Customer 7', ProjectList: [{name: "P1"}, {name: "P1"}]},
                    ]}
                    renderItem={({item}) => {
                      return (
                            <View style = {{flex: 1, flexDirection: 'row'}}>
                              <View style = {{flexDirection: 'column'}}>
                                  <Text style={styles.header} >{item.costumerName}</Text>
                                  <FlatList data={item.ProjectList}
                                      renderItem={({project}) => {
                                        return (
                                          <TouchableOpacity onPress = {this.onProjectClicked}>
                                            <Text style={styles.subtitle} >Project #1</Text>
                                          </TouchableOpacity>
                                        )
                                      }
                                      
                                      }
                                  />
                              </View>
                            </View>
                         
                      )
                    }
                    }
                
                  />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
    item: {
        color: 'red',
        fontSize: 10,
    },
    header: {
      paddingLeft: 20,
      height: 80,
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'

  },
    subtitle: {
        paddingLeft: 30,
        color: 'blue',
        fontSize: 16,
    }
  });

export default ProjectList