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
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={props.onPressCancel}>
        <View style={styles.dialogContainer}>
          <Text style={styles.titleDialog}>{props.tittle}</Text>

          <TextInput
            style={styles.inputTextToDo}
            value={inputText}
            onChangeText={value => setInputText(value)}
            placeholder={'your todo name...'}
            autoFocus={true}
          />

          <TouchableOpacity
            style={styles.touchableOpacityButtonOk}
            onPress={clickOkButtonDialog}>
            <Text style={styles.textButton}>{Strings.confirm}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dialogContainer: {
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
  },
  inputTextToDo: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  touchableOpacityButtonOk: {
    marginTop: 15,
    width: Dimens.widthButton,
    height: Dimens.heightButton,
    backgroundColor: Colors.blue,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: Colors.white,
  },
});

export default DialogInputText;
