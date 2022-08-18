import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { InitialState, NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from 'services/NavigationService';

const NAVIGATION_STATE_KEY = 'NAVIGATION_STATE_KEY';

const LoadNavigator = ({
	children,
}: {
	children: ReactElement | ReactElement[];
}) => {
	const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
	const [initialState, setInitialState] = useState<
		InitialState | undefined
	>();

	useEffect(() => {
		const restoreState = async () => {
			try {
				const savedStateString = await AsyncStorage.getItem(
					NAVIGATION_STATE_KEY,
				);

				const state = savedStateString
					? JSON.parse(savedStateString)
					: undefined;

				setInitialState(state);
			} finally {
				setIsNavigationReady(true);
			}
		};

		if (!isNavigationReady) {
			restoreState();
		}
	}, [isNavigationReady]);

	const onStateChange = useCallback(
		(state?: any) =>
			AsyncStorage.setItem(
				NAVIGATION_STATE_KEY,
				JSON.stringify(state) || '',
			),
		[],
	);

	// Add Loading Screen while navigation get ready
	if (!isNavigationReady) {
		return null;
	}

	return (
		<NavigationContainer
			ref={navigationRef}
			{...{ onStateChange, initialState }}
		>
			{children}
		</NavigationContainer>
	);
};

export default LoadNavigator;
