import React from 'react';
import { LogBox } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoadNavigator from 'setup/load-navigator';
import Root from 'navigation/Root';
import Theme from 'theme';

const App = () => {
	// Remove warning message from emulator
	LogBox.ignoreAllLogs();

	return (
		<SafeAreaProvider>
			<LoadNavigator>
				<ThemeProvider theme={Theme}>
					<Root />
				</ThemeProvider>
			</LoadNavigator>
		</SafeAreaProvider>
	);
};

export default App;
