import { useState, useEffect } from "react";
import { Button } from "../atoms/Button";

interface DeleteConfirmationModalProps {
  onDelete: (itemId: string) => Promise<void>;
  onReady?: (openModal: (itemId: string, itemName: string) => void) => void;
}

export const DeleteConfirmationModal = ({
  onDelete,
  onReady,
}: DeleteConfirmationModalProps) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean;
    itemId: string;
    itemName: string;
  }>({
    show: false,
    itemId: "",
    itemName: "",
  });

  const openModal = (itemId: string, itemName: string) => {
    setDeleteConfirmation({ show: true, itemId, itemName });
  };

  // Expose openModal to parent via callback
  useEffect(() => {
    onReady?.(openModal);
  }, [onReady]);

  const closeModal = () => {
    setDeleteConfirmation({ show: false, itemId: "", itemName: "" });
  };

  const handleConfirm = async () => {
    try {
      await onDelete(deleteConfirmation.itemId);
      closeModal();
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  if (!deleteConfirmation.show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{deleteConfirmation.itemName}"?
        </p>
        <div className="flex gap-3 justify-end">
          <Button onClick={closeModal} variant="ghost">
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