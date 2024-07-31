import { configureStore } from '@reduxjs/toolkit'
import activityStore from './activity'
import workedTimeStore from './workedTime'

export const store = configureStore({
  reducer: {
    activity: activityStore,
    workedTime: workedTimeStore
  },
})