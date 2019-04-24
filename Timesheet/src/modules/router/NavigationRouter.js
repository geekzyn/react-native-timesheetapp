import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import LoginScreen from '../login/LoginScreen';
import Timesheet from '../dashboard/Timesheet';
import ProjectList from '../entry/ProjectList';
import ActivityList from '../entry/ActivityList';
import TimeEntry from '../entry/TimeEntry';

const TaskNavigator = createStackNavigator({
	TimeSheet: {
		screen: Timesheet,
		navigationOptions: {
			header: null
		}
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
