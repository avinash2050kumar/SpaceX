import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Detail, Foo } from 'screens';

export type RootStackParamList = {
	Dashboard: undefined;
	Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Dashboard" getComponent={() => Foo} />
			<Stack.Screen name="Details" getComponent={() => Detail} />
		</Stack.Navigator>
	);
};

export default RootStack;
