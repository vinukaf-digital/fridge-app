import { Button } from "../atoms/Button";
import { FormField } from "../molecules/FormField";

interface AddItemFormProps {
  title: string;
  expiry: string;
  isEditing: boolean;
  onTitleChange: (value: string) => void;
  onExpiryChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const AddItemForm = ({
  title,
  expiry,
  isEditing,
  onTitleChange,
  onExpiryChange,
  onSubmit,
  onCancel
}: AddItemFormProps) => (
  <div className="m-10 border border-gray-300 shadow-lg p-10 rounded">
    <div className="flex flex-row gap-4 items-end">
      <FormField
        id="item-name"
        label="Item Name"
        type="text"
        value={title}
        onChange={onTitleChange}
      />
      <FormField
        id="item-expiry"
        label="Expiry date"
        type="date"
        value={expiry}
        onChange={onExpiryChange}
      />
      <div className="flex gap-2">
        <Button onClick={onSubmit} variant="primary">
          {isEditing ? "UPDATE ITEM" : "ADD TO FRIDGE"}
        </Button>
        {isEditing && (
          <Button onClick={onCancel} variant="secondary">
            CANCEL
          </Button>
        )}
      </div>
    </div>
    <h3
      className="text-md sm:text-sm font-semibold text-left mt-4"
      style={{ color: "#728197" }}
    >
      {isEditing
        ? "✏️ Editing item - click an item to edit it"
        : "⚠️ We don't want more than one piece of the same food in our fridge."}
    </h3>
  </div>
);