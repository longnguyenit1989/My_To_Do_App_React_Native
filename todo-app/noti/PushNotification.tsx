import PushNotification from 'react-native-push-notification';
import { ChanelIdPushNoti } from '../utils/Constans';

export function pushLocalNotificationCrud(
  tittleParam: string,
  messageParam: string,
  smallIconParam: string = 'ic_notification',
  largeIconParam: string = 'ic_launcher',
  playSoundParam: boolean = true,
  soundNameParam: string = 'default',
  colorParam: string = '#ffffff',
  vibrateParam: boolean = true,
) {
  PushNotification.localNotification({
    channelId: ChanelIdPushNoti.CRUD,
    title: tittleParam,
    message: messageParam,
    smallIcon: smallIconParam,
    largeIcon: largeIconParam,
    playSound: playSoundParam,
    soundName: soundNameParam,
    color: colorParam,
    vibrate: vibrateParam,
  });
}
