import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { ReduxContants } from "../utils/Constans";
import myToDoReducer from "./MyToDoReducer";


const persistConfig = {
  key: ReduxContants.REDUCER_ROOT_KEY,
  storage: AsyncStorage,
  whitelist: [ReduxContants.REDUCER_WHITE_LIST],
};

export const rootReducer = combineReducers({
  myToDoReducer: myToDoReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
