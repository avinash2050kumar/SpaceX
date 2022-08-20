import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LaunchDetails, LaunchDashboard } from 'screens';

export type RootStackParamList = {
	Dashboard: undefined;
	LaunchDetails: { flight_number: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Dashboard"
				getComponent={() => LaunchDashboard}
			/>
			<Stack.Screen
				name="LaunchDetails"
				getComponent={() => LaunchDetails}
			/>
		</Stack.Navigator>
	);
};

export default RootStack;
