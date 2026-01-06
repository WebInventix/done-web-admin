// slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isStarted: false,
    isNextFirstStep: false,
    isNextSecondStep: false
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setStarted(state) {
            state.isStarted = true;
        },
        setNextStepFirst(state) {
            state.isNextFirstStep = true;
        },
        setBackStepFirst(state) {
            state.isNextFirstStep = false;
        },
        setNextStepSecond(state) {
            state.isNextSecondStep = true;
        },
    },
});

export const { setStarted, setNextStepFirst, setBackStepFirst, setNextStepSecond } = uiSlice.actions;

export default uiSlice.reducer;
