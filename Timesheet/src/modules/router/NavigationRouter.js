import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Home from '../home/Home';
import LoginScreen from '../login/LoginScreen';
import Profile from '../consultant/Profile';
import Calender from '../calendar/Calender';
import ProjectTracker from '../calendar/ProjectTracker';
import Timesheet from '../dashboard/Timesheet';
import ProjectList from '../entry/ProjectList';
import ActivityList from '../entry/ActivityList';
import TimeEntry from '../entry/TimeEntry';
import { Text } from 'react-native';
import { Button } from 'native-base';

const TaskNavigator = createStackNavigator({
	TimeSheet: {
		screen: Timesheet,
	},
	ProjectList: {
		screen: ProjectList
	},
	ActivityList: {
		screen: ActivityList
	},
	TimeEntry: {
		screen: TimeEntry
	}
});

const AppNavigator = createStackNavigator(
	{
		LoginScreen: {
			screen: LoginScreen,
			navigationOptions: {
				header: null
			}
		},
		TaskNavigator: {
			screen: TaskNavigator,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: 'LoginScreen'
	}
);

export default (AppNav = createAppContainer(AppNavigator));
