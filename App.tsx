import React from 'react';
import {StatusBar} from 'react-native';
import ToDoListScreen from './todo-app/screens/ToDoListScreen';

const App: React.FunctionComponent = () => {
  return (
    <>
      <StatusBar backgroundColor="#2196f3" barStyle="light-content" />
      <ToDoListScreen></ToDoListScreen>
    </>
  );
};

export default App;
