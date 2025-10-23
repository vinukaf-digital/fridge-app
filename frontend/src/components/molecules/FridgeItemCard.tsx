import { Badge } from "@/components/atoms/Badge";
import { DeleteIcon } from "@/components/atoms/DeleteIcon";

interface FridgeItemCardProps {
  item: {
    _id: string;
    title: string;
    expiry: string;
  };
  status: {
    label: string;
    variant: "fresh" | "expiring" | "expired";
  };
  onItemClick: () => void;
  onDeleteClick: () => void;
}

export const FridgeItemCard = ({
  item,
  status,
  onItemClick,
  onDeleteClick,
}: FridgeItemCardProps) => (
  <div
    className="bg-gray-100 border border-gray-300 rounded p-4 w-full shadow flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors"
    onClick={onItemClick}
  >
    <div className="flex flex-row flex-1 justify-between items-center gap-4">
      <div className="font-semibold flex-1 text-left">{item.title}</div>
      <div className="text-sm text-gray-500 flex-1 text-center">
        Expiry: {item.expiry}
      </div>
      <Badge label={status.label} variant={status.variant} />
    </div>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDeleteClick();
      }}
      aria-label="Delete"
      className="text-red-500 hover:text-red-700 ml-4"
    >
      <DeleteIcon />
    </button>
  </div>
);