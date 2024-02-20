import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {persistStore} from 'redux-persist'
import {configureStore} from "@reduxjs/toolkit"
import {combineReducers} from "@reduxjs/toolkit"
import userReducer from "./slices/UserSlice"
import adminReducer from './slices/AdminSlice'

const persistConfig = { key: 'root', storage, version: 1 };
const reducer = combineReducers({
  userReducer,
  adminReducer
})
const persistedReducer = persistReducer(persistConfig,reducer)
const store = configureStore({
  reducer:persistedReducer
})
const persistor = persistStore(store)

export {store,persistor}