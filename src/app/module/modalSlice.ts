import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ModalType =
  | 'basic'
  | 'signup'
  | 'signin'
  | 'write'
  | 'upload'
  | 'delete'
  | 'join'
  | 'logout'
  | 'info'
  | 'success'
  | 'drawer'
  | 'chat_delete'
  | 'chat_exit'
  | 'kick';

interface ModalState {
  modalType: {
    [x: string]: boolean;
    basic: boolean;
    signup: boolean;
    signin: boolean;
    write: boolean;
    upload: boolean;
    delete: boolean;
    join: boolean;
    logout: boolean;
    info: boolean;
    success: boolean;
    drawer: boolean;
    chat_delete: boolean;
    chat_exit: boolean;
    kick: boolean;
  };
  message: string;
}

const initialState: ModalState = {
  modalType: {
    basic: false,
    signup: false,
    signin: false,
    write: false,
    upload: false,
    delete: false,
    join: false,
    logout: false,
    info: false,
    success: false,
    drawer: false,
    chat_delete: false,
    chat_exit: false,
    kick: false,
  },
  message: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state, { payload }: PayloadAction<{ type: ModalType; message?: string }>) => {
      state.modalType = {
        ...state.modalType,
        [payload.type]: !state.modalType[payload.type],
      };

      if (state.modalType[payload.type]) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'overlay';
      }

      if (payload.message) {
        state.message = payload.message;
      } else {
        state.message = '';
      }
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
