import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MyToDo} from '../entity/MyToDo';
import {RootState} from '../store/Store';
import {ReduxContants} from '../utils/Constans';

export interface MyToDoState {
  isLoading: boolean;
  listMyToDo: Array<MyToDo>;
}

const initialMyToDoState: MyToDoState = {
  isLoading: false,
  listMyToDo: [],
};

const myToDoSlice = createSlice({
  name: ReduxContants.SLICE_MY_TODO,
  initialState: initialMyToDoState,
  reducers: {
    getListMyToDoFromSqliteIsLoading(myToDoState: MyToDoState) {
      myToDoState.isLoading = true;
    },
    getListMyToDoFromSqliteSuccess(
      //get list my todo success
      myToDoState: MyToDoState,
      actionGetListMyToDo: PayloadAction<Array<MyToDo>>,
    ) {
      myToDoState.isLoading = false;
      myToDoState.listMyToDo.splice(0, myToDoState.listMyToDo.length);
      myToDoState.listMyToDo = [
        ...myToDoState.listMyToDo,
        ...actionGetListMyToDo.payload,
      ];
    },
    getListMyToDoFromSqliteFailed(myToDoState: MyToDoState) {
      //get list my todo failed
      myToDoState.isLoading = false;
    },
    insertDbToDoItemByIdIsLoading(
      myToDoState: MyToDoState,
      actionInsert: PayloadAction<string>,
    ) {
      myToDoState.isLoading = true;
    },
    insertDbToDoItemByIdSuccess(
      //insert todo to db success
      myToDoState: MyToDoState,
      actionInsert: PayloadAction<MyToDo>,
    ) {
      myToDoState.isLoading = false;
      myToDoState.listMyToDo = [
        ...myToDoState.listMyToDo,
        actionInsert.payload,
      ];
    },
    insertDbToDoItemByIdFailed(myToDoState: MyToDoState) {
      //insert todo to db failed
      myToDoState.isLoading = false;
    },
    updateDbToDoItemByIdIsLoading(
      myToDoState: MyToDoState,
      actionUpdate: PayloadAction<MyToDo>,
    ) {
      myToDoState.isLoading = true;
    },
    updateDbToDoItemByIdSuccess(
      //update todo to db success
      myToDoState: MyToDoState,
      actionUpdate: PayloadAction<MyToDo>,
    ) {
      myToDoState.isLoading = false;
      const updatedArray = myToDoState.listMyToDo.map(existingToDo => {
        if (existingToDo.id === actionUpdate.payload.id) {
          return actionUpdate.payload;
        } else {
          return existingToDo;
        }
      });

      myToDoState.listMyToDo = updatedArray;
    },
    updateDbToDoItemByIdFailed(myToDoState: MyToDoState) {
      //update todo to db failed
      myToDoState.isLoading = false;
    },
  },
});

export const getListMyToDoIsLoading = (state: RootState) =>
  state.myToDoReducer.isLoading;
export const getListMyToDo = (state: RootState) =>
  state.myToDoReducer.listMyToDo;

export const myToDoActions = myToDoSlice.actions;

const myToDoReducer = myToDoSlice.reducer;
export default myToDoReducer;
