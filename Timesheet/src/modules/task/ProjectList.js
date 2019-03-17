import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

class ProjectList extends Component {

    constructor(props) {
        super(props)
    }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center", backgroundColor: '#D499D4' }}>
        <FlatList
                    data={[
                      {costumerName: 'Customer 1', ProjectList: ["P1", "P2"]},
                      {costumerName: 'Customer 2', ProjectList: ["P4", "P56"]},
                      {costumerName: 'Customer 3', ProjectList: ["P4", "P56"]},
                      {costumerName: 'Customer 3', ProjectList: ["P4", "P56"]},
                      {costumerName: 'Customer 3', ProjectList: ["P4", "P56"]},
                      {costumerName: 'Customer 3', ProjectList: ["P4", "P56"]},
                      {costumerName: 'Customer 3', ProjectList: ["P4", "P56"]},
                      {costumerName: 'Customer 3', ProjectList: ["P4", "P56"]},
                    ]}
                    renderItem={({item}) => 
                      <View style = {{flex: 1, flexDirection: 'row', justifyContent: "space-between"}}>
                        <View style = {{flexDirection: 'column', marginLeft: 10, marginBottom: 20}}>
                            <Text style={styles.header} >{item.costumerName}</Text>
                            <FlatList data={item.ProjectList}
                                renderItem={({project}) =>
                                <Text style={styles.header} >{project}</Text>
                                }
                            />
                        </View>
                      </View>
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
        color: 'black',
        fontSize: 18,
    },
    subtitle: {
        color: 'grey',
        fontSize: 16,
    }
  });

export default ProjectList