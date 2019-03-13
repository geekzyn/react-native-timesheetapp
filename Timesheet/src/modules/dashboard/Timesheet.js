import React, {Component} from 'react';
// import {Header} from 'react-native-elements';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import WithNavigation from '../../common/HOCs/WithNavigation';
import CalendarStrip from 'react-native-slideable-calendar-strip';

class Timesheet extends Component {
    constructor(props) {
        super(props);
        var today = new Date();
        this.state = {selectedDate: today };
    }

    render() {
        return (
        
        <View>
          <CalendarStrip
            showWeekNumber
            selectedDate={this.state.selectedDate}
            onPressDate={(date) => {
            this.setState({ selectedDate: date });
            }}
            onPressGoToday={(today) => {
              this.setState({ selectedDate: today });
            }}
            onSwipeDown={() => {
              alert("");
            }}
            markedDate={['2018-05-04', '2018-05-15', '2018-06-04', '2018-05-01']}
          />
            <FlatList
            data={[
              {costumerName: 'Customer 1', projectName: "Project 1", activityName:  "Activity 1", duration: "02:00"},
              {costumerName: 'Customer 2', projectName: "Project 2", activityName:  "Activity 2", duration: "02:00"},
              {costumerName: 'Customer 3', projectName: "Project 3", activityName:  "Activity 3", duration: "02:00"},
              {costumerName: 'Customer 3', projectName: "Project 3", activityName:  "Activity 3", duration: "02:00"},
              {costumerName: 'Customer 3', projectName: "Project 3", activityName:  "Activity 3", duration: "02:00"},
              {costumerName: 'Customer 3', projectName: "Project 3", activityName:  "Activity 3", duration: "02:00"},
              {costumerName: 'Customer 3', projectName: "Project 3", activityName:  "Activity 3", duration: "02:00"},
              {costumerName: 'Customer 3', projectName: "Project 3", activityName:  "Activity 3", duration: "02:00"},
              {costumerName: 'Customer 3', projectName: "Project 3", activityName:  "Activity 3", duration: "02:00"},
              {costumerName: 'Customer 3', projectName: "Project 3", activityName:  "Activity 3", duration: "02:00"},
            ]}
          renderItem={({item}) => 

          <View style = {{flex: 1, flexDirection: 'row', justifyContent: "space-between"}}>
            <View style = {{flexDirection: 'column', marginLeft: 10, marginBottom: 20}}>
                <Text style={styles.header} >{item.costumerName}</Text>
                <Text style={styles.subtitle} >{item.projectName} </Text>
                <Text style={styles.subtitle} >{item.activityName}</Text>
            </View>
            <View style = {{flexDirection: 'column', marginLeft: 10, marginBottom: 20, alignItems: "center"}}>
                <Text style={styles.subtitle} >{item.duration}</Text>
            </View>
         </View>
            }
        />
        </View>
        )
    }
}

const styles = StyleSheet.create({
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

export default WithNavigation(Timesheet)
