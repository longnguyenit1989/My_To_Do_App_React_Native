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
      action: PayloadAction<Array<MyToDo>>,
    ) {
      myToDoState.isLoading = false;
      myToDoState.listMyToDo.splice(0, myToDoState.listMyToDo.length);
      myToDoState.listMyToDo = [...myToDoState.listMyToDo, ...action.payload];
    },
    getListMyToDoFromSqliteFailed(myToDoState: MyToDoState) {
      //get list my todo failed
      myToDoState.isLoading = false;
    },
    insertDbToDoItemByIdIsLoading(myToDoState: MyToDoState, action: PayloadAction<string>) {
      myToDoState.isLoading = true;
    },
    insertDbToDoItemByIdSuccess(
      //insert todo to db success
      myToDoState: MyToDoState,
      action: PayloadAction<MyToDo>,
    ) {
      myToDoState.isLoading = false;
      myToDoState.listMyToDo = [...myToDoState.listMyToDo, action.payload];
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
