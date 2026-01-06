import { createSlice } from '@reduxjs/toolkit'
import { asyncStatus } from '../../utils/asyncStatus'

const initialState = {
    topbarHide: false,
    sideBarHide: false,
    sideBarToggleButtonHide: false,

    pdf_local_data_status: asyncStatus.IDLE,
    pdf_local_data: null,
    pdf_data_error: null,


}

const LayoutControler = createSlice({
    name: 'layoutcontroler',
    initialState: initialState,
    reducers: {
        setTopbar(state, action) {
            state.topbarHide = action.payload
        },
        setSideBar(state, action) {
            state.sideBarHide = action.payload
        },
        setSideBarToggleButton(state, action) {
            state.sideBarToggleButtonHide = action.payload
        },
        setQuizTime(state, action) {
            state.topbarHide = action.payload
            state.sideBarHide = action.payload
            state.sideBarToggleButtonHide = action.payload
        },
        setPDFdataState(state, { payload }) {
            state.pdf_local_data = payload
            state.pdf_local_data_status = asyncStatus.SUCCEEDED
        },
        setPDFdataStatusState(state,) {
            state.pdf_local_data_status = asyncStatus.IDLE
        },

    },

})

export const { setTopbar, setSideBar, setSideBarToggleButton, setQuizTime, setPDFdataState, setPDFdataStatusState
} = LayoutControler.actions

export default LayoutControler.reducer


