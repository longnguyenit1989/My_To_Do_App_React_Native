import React, {useState, useEffect} from 'react';
import {Dimens, Strings} from '../Constans';

import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../color/Colors';

interface DialogInputTextProps {
  visible: boolean;
  tittle: string;
  onPressOk: (text: string) => void;
  onPressCancel: () => void;
}

const DialogInputText: React.FC<DialogInputTextProps> = (
  props: DialogInputTextProps,
) => {
  const [inputText, setInputText] = useState('');

  const clickOkButtonDialog = () => {
    props.onPressOk(inputText);
    setInputText('');
  };

  useEffect(() => {
    setInputText('');
  }, [props.visible]);

  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.containerView}>
        <View style={styles.containerDialog}>
          <Text style={styles.titleDialog}>{props.tittle}</Text>

          <TextInput
            style={styles.inputTextToDo}
            value={inputText}
            onChangeText={value => setInputText(value)}
            placeholder={'your todo name...'}
            autoFocus={true}
          />

          <View style={styles.viewHorizontalButton}>
            <TouchableOpacity
              style={styles.touchableOpacityButtonOk}
              onPress={clickOkButtonDialog}>
              <Text style={styles.textButton}>{Strings.ok}</Text>
            </TouchableOpacity>

            <View style={styles.blankView} />

            <TouchableOpacity
              style={styles.touchableOpacityButtonCancel}
              onPress={props.onPressCancel}>
              <Text style={styles.textButton}>{Strings.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  containerDialog: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleDialog: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.blue,
  },
  inputTextToDo: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: Colors.black,
  },
  viewHorizontalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  touchableOpacityButtonOk: {
    width: Dimens.widthButton,
    height: Dimens.heightButton,
    backgroundColor: Colors.blue,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacityButtonCancel: {
    width: Dimens.widthButton,
    height: Dimens.heightButton,
    backgroundColor: Colors.red,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: Colors.white,
  },
  blankView: {
    width: Dimens.widthBlankView,
  },
});

export default DialogInputText;
