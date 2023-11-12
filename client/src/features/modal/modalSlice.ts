import { createSlice } from "@reduxjs/toolkit"

type modalStates = null | "createChat"
const initialState: { value: modalStates } = { value: null }

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, { payload }: { payload: modalStates }) => {
      state.value = payload
    },
    closeModal: state => {
      state.value = null
    },
  },
})

export const { closeModal, setModal } = modalSlice.actions

export default modalSlice.reducer

export const selectCurrentModal = (state: { modal: { value: modalStates } }) =>
  state.modal.value
