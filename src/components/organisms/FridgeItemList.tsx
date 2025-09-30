import { FridgeItemCard } from "../molecules/FridgeItemCard";
import { LoadingSpinner } from "../atoms/LoadingSpinner";

interface FridgeItemListProps {
  items: any[];
  isLoading: boolean;
  onItemClick: (item: any) => void;
  onDeleteClick: (itemId: string, itemName: string) => void;
  getItemStatus: (expiry: string) => { label: string; color: string };
}

export const FridgeItemList = ({
  items,
  isLoading,
  onItemClick,
  onDeleteClick,
  getItemStatus
}: FridgeItemListProps) => (
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
            onItemClick={() => onItemClick(item)}
            onDeleteClick={() => onDeleteClick(item._id, item.title)}
          />
        ))
      )}
    </div>
  </div>
);
