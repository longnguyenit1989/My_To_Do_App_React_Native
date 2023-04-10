/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import PushNotification from "react-native-push-notification";
import {Platform} from 'react-native';

AppRegistry.registerComponent(appName, () => App);

PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    requestPermissions: Platform.OS === 'ios',
  });


if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'CRUD',
        channelName: 'CRUD channel',
      },
      created => console.log(`createChannel returned '${created}'`)
    );
  }