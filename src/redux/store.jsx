import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from './contactsSlise/contactsSlice';
import { filterSlice } from './filterSlice/filterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
  },
});
