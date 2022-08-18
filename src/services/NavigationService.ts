import React from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/Root';

export type RouteNames = keyof RootStackParamList;

// @ts-ignore
export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate<T extends Record<any, any>>(
	name: RouteNames,
	params?: T,
) {
	navigationRef.current?.navigate(name, params);
}

export function goBack() {
	navigationRef.current?.canGoBack() && navigationRef.current?.goBack();
}

export function canGoBack() {
	return navigationRef.current?.canGoBack();
}

export function push<T extends Record<any, any>>(
	name: keyof RootStackParamList,
	params?: T,
) {
	if (navigationRef.current?.isReady()) {
		navigationRef.current?.dispatch(StackActions.push(name, params));
	}
}
