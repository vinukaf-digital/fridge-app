import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../atoms/Button";
import { FormField } from "../molecules/FormField";
import {
  useAddFridgeItemMutation,
  useUpdateFridgeItemMutation,
} from "../../lib/store/fridgeApi";
import { cancelEdit } from "../../lib/store/formSlice";
import type { RootState } from "../../lib/store";

function convertDateForAPI(dateString: string) {
  return dateString.replace(/-/g, "/");
}

function convertDateForInput(dateString: string) {
  return dateString.replace(/\//g, "-");
}

export const AddItemForm = () => {
  const dispatch = useDispatch();
  const editingItem = useSelector((state: RootState) => state.form.editingItem);

  const [addItem] = useAddFridgeItemMutation();
  const [updateItem] = useUpdateFridgeItemMutation();

  const [title, setTitle] = useState("");
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setExpiry(convertDateForInput(editingItem.expiry));
    } else {
      setTitle("");
      setExpiry("");
    }
  }, [editingItem]);

  const handleCancel = () => {
    dispatch(cancelEdit());
  };

  const handleSubmit = async () => {
    if (title && expiry) {
      const expiryForAPI = convertDateForAPI(expiry);

      try {
        if (editingItem) {
          await updateItem({
            id: editingItem.id,
            title,
            expiry: expiryForAPI,
          }).unwrap();
          dispatch(cancelEdit());
        } else {
          await addItem({ title, expiry: expiryForAPI }).unwrap();
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
            <Button onClick={handleCancel} variant="secondary">
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
