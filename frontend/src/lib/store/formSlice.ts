import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditingItem {
  id: string;
  title: string;
  expiry: string;
}

interface DeleteModal {
  show: boolean;
  itemId: string;
  itemName: string;
}

interface FormState {
  editingItem: EditingItem | null;
  deleteModal: DeleteModal;
}

const initialState: FormState = {
  editingItem: null,
  deleteModal: {
    show: false,
    itemId: "",
    itemName: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    startEdit: (state, action: PayloadAction<EditingItem>) => {
      state.editingItem = action.payload;
    },
    cancelEdit: (state) => {
      state.editingItem = null;
    },
    openDeleteModal: (
      state,
      action: PayloadAction<{ itemId: string; itemName: string }>
    ) => {
      state.deleteModal = {
        show: true,
        itemId: action.payload.itemId,
        itemName: action.payload.itemName,
      };
    },
    closeDeleteModal: (state) => {
      state.deleteModal = {
        show: false,
        itemId: "",
        itemName: "",
      };
    },
  },
});

export const { startEdit, cancelEdit, openDeleteModal, closeDeleteModal } =
  formSlice.actions;
export default formSlice.reducer;