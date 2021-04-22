import { AppRegistry } from 'react-native';
import Config from 'react-native-config';

import StorybookUIRoot from "./storybook";
import App from './App';


console.log(Config)
AppRegistry.registerComponent('main', () => JSON.parse(Config.USE_STORYBOOK) ? StorybookUIRoot : App);
