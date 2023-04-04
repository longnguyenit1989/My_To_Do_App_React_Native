import React, { FC } from 'react';
import { View, Text } from 'react-native';

import { MyToDo } from '../entity/MyToDo';

interface ToDoDetailScreenProps {
  route: {
    params: {
      myToDo: MyToDo;
    };
  };
};

const ToDoDetailScreen: FC = () => {
  return (
    <View>
      <Text>This is the ToDoDetailScreen</Text>
    </View>
  );
};

export default ToDoDetailScreen;