import { useState, useEffect } from "react";
import { Button } from "../atoms/Button";
import { FormField } from "../molecules/FormField";

interface AddItemFormProps {
  onAddItem: (title: string, expiry: string) => Promise<void>;
  onUpdateItem: (id: string, title: string, expiry: string) => Promise<void>;
  onReady?: (handlers: {
    startEdit: (id: string, title: string, expiry: string) => void;
  }) => void;
}

function convertDateForAPI(dateString: string) {
  return dateString.replace(/-/g, "/");
}

function convertDateForInput(dateString: string) {
  return dateString.replace(/\//g, "-");
}

export const AddItemForm = ({
  onAddItem,
  onUpdateItem,
  onReady,
}: AddItemFormProps) => {
  const [title, setTitle] = useState("");
  const [expiry, setExpiry] = useState("");
  const [editingItem, setEditingItem] = useState<{
    id: string;
    title: string;
    expiry: string;
  } | null>(null);

  const startEdit = (id: string, itemTitle: string, itemExpiry: string) => {
    setEditingItem({ id, title: itemTitle, expiry: itemExpiry });
    setTitle(itemTitle);
    setExpiry(convertDateForInput(itemExpiry));
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setTitle("");
    setExpiry("");
  };

  // Expose handlers to parent via callback
  useEffect(() => {
    onReady?.({ startEdit });
  }, [onReady]);

  const handleSubmit = async () => {
    if (title && expiry) {
      const expiryForAPI = convertDateForAPI(expiry);

      try {
        if (editingItem) {
          await onUpdateItem(editingItem.id, title, expiryForAPI);
          cancelEdit();
        } else {
          await onAddItem(title, expiryForAPI);
          setTitle("");
          setExpiry("");
        }
      } catch (err) {
        console.error("Failed to save item:", err);
      }
    }
  };

  return (
    <div className="m-10 border border-gray-300 shadow-lg p-10 rounded">
      <div className="flex flex-row gap-4 items-end">
        <FormField
          id="item-name"
          label="Item Name"
          type="text"
          value={title}
          onChange={setTitle}
        />
        <FormField
          id="item-expiry"
          label="Expiry date"
          type="date"
          value={expiry}
          onChange={setExpiry}
        />
        <div className="flex gap-2">
          <Button onClick={handleSubmit} variant="primary">
            {editingItem ? "UPDATE ITEM" : "ADD TO FRIDGE"}
          </Button>
          {editingItem && (
            <Button onClick={cancelEdit} variant="secondary">
              CANCEL
            </Button>
          )}
        </div>
      </div>
      <h3
        className="text-md sm:text-sm font-semibold text-left mt-4"
        style={{ color: "#728197" }}
      >
        {editingItem
          ? "✏️ Editing item - click an item to edit it"
          : "⚠️ We don't want more than one piece of the same food in our fridge."}
      </h3>
    </div>
  );
};
