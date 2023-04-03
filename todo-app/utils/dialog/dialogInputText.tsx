import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

type DialogInputTextProps = {
  visible: boolean;
  tittle: string;
  onPressOk: (text: string) => void;
  onPressCancel: () => void;
};

const DialogInputText: React.FC<DialogInputTextProps> = props => {
  const [inputText, setInputText] = useState('');

  const clickOkButtonDialog = () => {
    props.onPressOk(inputText);
    setInputText('');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => { }}>
      <TouchableOpacity style={styles.modalContainer} onPress={props.onPressCancel}>
        <View style={styles.dialogContainer}>
          <Text style={styles.titleDialog}>{props.tittle}</Text>

          <TextInput
            style={styles.inputText}
            value={inputText}
            onChangeText={value => setInputText(value)}></TextInput>

          <View style={styles.buttonContainer}>
            <Button title="OK" onPress={clickOkButtonDialog}></Button>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
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
  inputText: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  buttonContainer: {
    width: '50%',
  },
});

export default DialogInputText;