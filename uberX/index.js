/**
 * @format
 * @clean cd android && gradlew clean && cd .. && react-native run-android
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
