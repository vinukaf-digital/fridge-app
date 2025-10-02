import { useDispatch } from "react-redux";
import { FridgeItemCard } from "../molecules/FridgeItemCard";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { startEdit, openDeleteModal } from "../../lib/store/formSlice";
import { useGetFridgeItemsQuery } from "../../lib/store/fridgeApi";

export const FridgeItemList = () => {
  const dispatch = useDispatch();
  const { data: items = [], isLoading } = useGetFridgeItemsQuery();

  const getItemStatus = (
    expiry: string
  ): {
    label: string;
    variant: "fresh" | "expiring" | "expired";
  } => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);

    const daysUntilExpiry = Math.ceil(
      (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiry < 0) {
      return { label: "Expired", variant: "expired" };
    } else if (daysUntilExpiry <= 30) {
      return { label: "Expiring Soon", variant: "expiring" };
    } else {
      return { label: "Healthy", variant: "fresh" };
    }
  };

  const handleItemClick = (item: any) => {
    dispatch(
      startEdit({
        id: item._id,
        title: item.title,
        expiry: item.expiry,
      })
    );
  };

  const handleDeleteClick = (itemId: string, itemName: string) => {
    dispatch(openDeleteModal({ itemId, itemName }));
  };

  return (
    <div className="flex flex-col self-end text-right w-2/3">
      <div className="font-semibold mb-2">Total Items – {items.length}</div>
      <div className="flex flex-col gap-4 w-full mt-2 max-h-96 overflow-y-auto">
        {isLoading ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <div>No items in the fridge.</div>
        ) : (
          items.map((item) => (
            <FridgeItemCard
              key={item._id}
              item={item}
              status={getItemStatus(item.expiry)}
              onItemClick={() => handleItemClick(item)}
              onDeleteClick={() => handleDeleteClick(item._id, item.title)}
            />
          ))
        )}
      </div>
    </div>
  );
};
