import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectState {
  selected: {
    query: string;
    filter: string;
    category: string;
    proceeding: string;
  };
}

const initialState: SelectState = {
  selected: {
    query: '',
    filter: '기본순',
    category: '카테고리',
    proceeding: '모든 투표',
  },
};

export const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    changeSelected: (state, { payload }: PayloadAction<{ value: string; item: string }>) => {
      state.selected = { ...initialState.selected, [payload.value]: payload.item };
    },
  },
});

export const { changeSelected } = selectSlice.actions;
export default selectSlice.reducer;
