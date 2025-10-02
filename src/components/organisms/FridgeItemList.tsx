import { FridgeItemCard } from "../molecules/FridgeItemCard";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
interface FridgeItemListProps {
  items: any[];
  isLoading: boolean;
  onItemClick: (item: any) => void;
  onDeleteClick: (itemId: string, itemName: string) => void;
}

function getItemStatus(expiryDate: string) {
  const currentDate = new Date();
  const expiry = new Date(expiryDate);
  const timeDiff = expiry.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysDiff < 0) {
    return { label: "Expired", color: "text-red-600" };
  } else if (daysDiff <= 30) {
    return { label: "Expiring Soon", color: "text-yellow-600" };
  } else {
    return { label: "Healthy", color: "text-green-600" };
  }
} 

export const FridgeItemList = ({
  items,
  isLoading,
  onItemClick,
  onDeleteClick,
}: FridgeItemListProps) => {
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
