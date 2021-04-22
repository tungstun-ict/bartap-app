import { AppRegistry } from 'react-native';
import Config from 'react-native-config';

import StorybookUIRoot from "./storybook";
import App from './App';


console.log(Config)
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent('main', () => JSON.parse(Config.USE_STORYBOOK) ? StorybookUIRoot : App);
