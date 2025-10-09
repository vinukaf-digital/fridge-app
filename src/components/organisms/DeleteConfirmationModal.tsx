import { useSelector, useDispatch } from "react-redux";
import { Button } from "../atoms/Button";
import { closeDeleteModal, cancelEdit } from "../../lib/store/formSlice";
import { useDeleteFridgeItemMutation } from "../../lib/store/fridgeApi";
import type { RootState } from "../../lib/store";

export const DeleteConfirmationModal = () => {
  const dispatch = useDispatch();
  const deleteModal = useSelector((state: RootState) => state.form.deleteModal);
  const [deleteItem] = useDeleteFridgeItemMutation();

  const handleClose = () => {
    dispatch(closeDeleteModal());
  };

  const handleConfirm = async () => {
    try {
      await deleteItem(deleteModal.itemId).unwrap();
      dispatch(closeDeleteModal());
      dispatch(cancelEdit());
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  if (!deleteModal.show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{deleteModal.itemName}"?
        </p>
        <div className="flex gap-3 justify-end">
          <Button onClick={handleClose} variant="ghost">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="danger">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
