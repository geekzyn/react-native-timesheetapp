import React, {Component} from 'react';
import { View, Text, FlatList } from 'react-native';

class Report extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
               <FlatList                    
					style={{margin: 10}}
                    data={[{monthAndYear: "August 2019", taskCount: "5", comment: "Good Task" },
                    {monthAndYear: "September 2019", taskCount: "10", comment: "All completed" },
                    {monthAndYear: "October 2019", taskCount: "4", comment: "Remains" },
                    {monthAndYear: "November 2019", taskCount: "100", comment: "To be done" },
                ]}
					renderItem={({ item }) => (
						<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
							<View style={{ flexDirection: 'column', marginLeft: 10, alignItems: 'center', marginBottom: 20 }}>
                                <View style={{height: 2, width: '100%', backgroundColor: 'green'}}/>
								<Text style={{fontSize: 24, marginTop: 20, marginBottom: 20, color: 'blue'}}> {item.monthAndYear}</Text>
							</View>
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                                    <Text style={{alignSelf: 'flex-start', fontSize: 40, color: 'green', margin: 10, marginRight: 20}}>{item.comment}</Text>
                                    <Text style={{alignContent: 'flex-end' , fontSize: 40, color: 'green', margin: 10, marginLeft: 20}}>{item.taskCount}</Text>
                            </View>
                        </View>
                    )}
               />
            </View>
        )
    }

}

export default Report;
