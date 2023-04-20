import {PlatformName, Strings} from '../Constans';
import {ToastAndroid, Platform, Alert} from 'react-native';

export const showToastInputEmpty = () => {
  if (Platform.OS === PlatformName.android) {
    ToastAndroid.show(Strings.please_fill_your_todo_name, ToastAndroid.SHORT);
  } else {
    Alert.alert(Strings.please_fill_your_todo_name);
  }
};
