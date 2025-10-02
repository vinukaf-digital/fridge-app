import { FridgeItemCard } from "../molecules/FridgeItemCard";
import { LoadingSpinner } from "../atoms/LoadingSpinner";

interface FridgeItemListProps {
  items: any[];
  isLoading: boolean;
  onItemClick: (item: any) => void;
  onDeleteClick: (itemId: string, itemName: string) => void;
}

export const FridgeItemList = ({
  items,
  isLoading,
  onItemClick,
  onDeleteClick,
}: FridgeItemListProps) => {

  const getItemStatus = (
    expiry: string
  ): {
    label: string;
    variant: "fresh" | "expiring" | "expired";
  } => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    const daysUntilExpiry = Math.ceil(
      (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiry < 0) {
      return { label: "Expired", variant: "expired" };
    } else if (daysUntilExpiry <= 3) {
      return { label: "Expiring Soon", variant: "expiring" };
    } else {
      return { label: "Fresh", variant: "fresh" };
    }
  };

  const handleItemClick = (item: any) => {
    onItemClick(item);
  };

  const handleDeleteClick = (itemId: string, itemName: string) => {
    onDeleteClick(itemId, itemName);
  };

  return (
    <div className="flex flex-col self-end text-right w-full">
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
