import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomState {
  query: string;
}

const initialState: RoomState = {
  query: '',
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    changeRoomQuery: (state, { payload }: PayloadAction<{ value: string; item: string }>) => {
      state.query = payload.item;
    },
  },
});

export const { changeRoomQuery } = roomSlice.actions;
export default roomSlice.reducer;
