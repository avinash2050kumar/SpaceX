import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LaunchDetails, LaunchDashboard } from 'screens';

export type RootStackParamList = {
	Dashboard: undefined;
	Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Dashboard"
				getComponent={() => LaunchDashboard}
			/>
			<Stack.Screen name="Details" getComponent={() => LaunchDetails} />
		</Stack.Navigator>
	);
};

export default RootStack;
