import { AppRegistry } from 'react-native';
import Config from 'react-native-config';

import App from './App';
import StorybookUIRoot from "./storybook";

AppRegistry.registerComponent('main', () => JSON.parse(Config.USE_STORYBOOK) ? StorybookUIRoot : App);
