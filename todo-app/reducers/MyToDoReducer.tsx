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
      myToDoState.isLoading = false;
    },
    insertDbToDoItemByIdIsLoading(
      myToDoState: MyToDoState,
      actionInsert: PayloadAction<string>,
    ) {
      myToDoState.isLoading = true;
    },
    insertDbToDoItemByIdSuccess(
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
      myToDoState.isLoading = false;
    },
    updateDbToDoItemByIdIsLoading(
      myToDoState: MyToDoState,
      actionUpdate: PayloadAction<MyToDo>,
    ) {
      myToDoState.isLoading = true;
    },
    updateDbToDoItemByIdSuccess(
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
      myToDoState.isLoading = false;
    },
    deleteDbToDoItemByIdIsLoading(
      myToDoState: MyToDoState,
      actionDelete: PayloadAction<MyToDo>,
    ) {
      myToDoState.isLoading = true;
    },
    deleteDbToDoItemByIdSuccess(
      myToDoState: MyToDoState,
      actionDelte: PayloadAction<MyToDo>,
    ) {
      myToDoState.isLoading = false;
      const updatedToDoArray = myToDoState.listMyToDo.filter(
        item => item.id !== actionDelte.payload.id,
      );
      myToDoState.listMyToDo = updatedToDoArray;
    },
    deleteDbToDoItemByIdIsFailed(myToDoState: MyToDoState) {
      myToDoState.isLoading = true;
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
