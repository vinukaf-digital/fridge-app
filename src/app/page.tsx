"use client";
import { convertDateForInput } from "./utils/dateConverter";
import getItemStatus from "./utils/itemStatus";
import { convertDateForAPI } from "./utils/dateConverter";
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchItems, addItem, deleteItem, updateItem } from './store/fridgeSlice'
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

const FridgeApp = () => {
  const dispatch = useAppDispatch();
  const {items, isLoading , error} =  useAppSelector((state) => state.fridge);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const [newTitle, setNewTitle] = useState("");
  const [newExpiry, setNewExpiry] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<{show: boolean, itemId: string, itemName: string}>({
    show: false, itemId: "", itemName: ""});
  const [editingItem, setEditingItem] = useState<{id: string, title: string, expiry: string} | null>(null);

  function handleItemClick(item: any) {
    setEditingItem({id: item._id, title: item.title, expiry: item.expiry});
    setNewTitle(item.title);
    setNewExpiry(convertDateForInput(item.expiry));
  }

  async function handleAddItem() {
    if (newTitle && newExpiry) {
      const expiryForAPI = convertDateForAPI(newExpiry);
      if(editingItem){
        await dispatch(updateItem({id: editingItem.id, title: newTitle, expiry: expiryForAPI}));
        setEditingItem(null);
      } else {
        await dispatch(addItem({title: newTitle, expiry: expiryForAPI}));
      }
      dispatch(fetchItems());
      setNewTitle("");
      setNewExpiry("");
    }
  }

  function handleCancelEdit() {
    setEditingItem(null);
    setNewTitle("");
    setNewExpiry("");
  }

  async function handleDeleteItem(id: string) {
    await dispatch(deleteItem(id));
    dispatch(fetchItems());
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col self-center">
          <h1
            className="text-4xl sm:text-6xl font-extrabold text-center sm:text-left"
            style={{ color: "#003A59" }}
          >
            Good Morning, Johnny!
          </h1>
          <h3
            className="text-2xl sm:text-3xl font-semibold text-center sm:text-left"
            style={{ color: "#728197" }}
          >
            🌤️ It's better to go shopping before this friday
          </h3>
        </div>
        <div>
          <div className="m-10 border border-gray-300 shadow-lg p-10 rounded">
            <div className="flex flex-row gap-4 items-end">
              <div className="flex flex-col">
                <label
                  htmlFor="item-name"
                  className="mb-1 text-sm font-medium text-black"
                >
                  Item Name
                </label>
                <input
                  id="item-name"
                  aria-label="Item name"
                  type="text"
                  className="border border-gray-400 rounded px-3 py-2"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
                <div className="flex flex-col">
                <label
                  htmlFor="item-expiry"
                  className="mb-1 text-sm font-medium text-black"
                >
                  Expiry date
                </label>
                <input
                  id="item-expiry"
                  type="date"
                  className="border border-gray-400 rounded px-3 py-2 shadow"
                  value={newExpiry}
                  onChange={(e) => setNewExpiry(e.target.value)}
                />
                </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddItem}
                  className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
                >
                  {editingItem ? "UPDATE ITEM" : "ADD TO FRIDGE"}
                </button>
                {editingItem && (
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    CANCEL
                  </button>
                )}
              </div>
            </div>
            <h3
              className="text-md sm:text-sm font-semibold text-left mt-4"
              style={{ color: "#728197" }}
            >
              {editingItem ? "✏️ Editing item - click an item to edit it" : "⚠️ We don't want more than one piece of the same food in our fridge."}
            </h3>
          </div>
          <div className="flex flex-col self-end text-right w-full">
            <div className="font-semibold mb-2">
              Total Items – {items.length}
            </div>

            <div className="flex flex-col gap-4 w-full mt-2 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
                </div>
              ) : items.length === 0 ? (
                <div>No items in the fridge.</div>
              ) : (
                items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-100 border border-gray-300 rounded p-4 w-full shadow flex items-center justify-between cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex flex-row flex-1 justify-between items-center gap-4">
                      <div className="font-semibold flex-1 text-left">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500 flex-1 text-center">
                        Expiry: {item.expiry}
                      </div>
                      <div className={`text-xs flex-1 text-center ${getItemStatus(item.expiry).color}`}>
                        {getItemStatus(item.expiry).label}
                      </div>
                    </div>

                    <button
                      onClick={() => setDeleteConfirmation({show: false, itemId: item._id, itemName: item.title})}
                      aria-label="Delete"
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      
      {deleteConfirmation.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{deleteConfirmation.itemName}"?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={(e) => {
                  setDeleteConfirmation({show: true, itemId: '', itemName: ''});
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleDeleteItem(deleteConfirmation.itemId);
                  setDeleteConfirmation({show: false, itemId: '', itemName: ''});
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(FridgeApp), {
  ssr: false,
});