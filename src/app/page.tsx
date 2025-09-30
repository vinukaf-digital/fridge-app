"use client";
import { useState } from "react";
import { convertDateForInput, convertDateForAPI, getItemStatus } from "../lib/utils";

// Import RTK Query hooks
import {
  useGetFridgeItemsQuery,
  useAddFridgeItemMutation,
  useUpdateFridgeItemMutation,
  useDeleteFridgeItemMutation,
} from '../lib/store/fridgeApi';

import { Header } from '../components/molecules/Header';
import { AddItemForm } from '../components/organisms/AddItemForm';
import { FridgeItemList } from '../components/organisms/FridgeItemList';
import { DeleteConfirmationModal } from '../components/organisms/DeleteConfirmationModal';
import { FridgeTemplate } from '../components/templates/FridgeTemplate';

const FridgeApp = () => {
  const { data: items = [], isLoading, error } = useGetFridgeItemsQuery();
  const [addItem] = useAddFridgeItemMutation();
  const [updateItem] = useUpdateFridgeItemMutation();
  const [deleteItem] = useDeleteFridgeItemMutation();

  const [newTitle, setNewTitle] = useState("");
  const [newExpiry, setNewExpiry] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean;
    itemId: string;
    itemName: string;
  }>({
    show: false,
    itemId: "",
    itemName: ""
  });
  const [editingItem, setEditingItem] = useState<{
    id: string;
    title: string;
    expiry: string;
  } | null>(null);

  const handleItemClick = (item: any) => {
    setEditingItem({ id: item._id, title: item.title, expiry: item.expiry });
    setNewTitle(item.title);
    setNewExpiry(convertDateForInput(item.expiry));
  };

  const handleAddItem = async () => {
    if (newTitle && newExpiry) {
      const expiryForAPI = convertDateForAPI(newExpiry);
      
      try {
        if (editingItem) {
          await updateItem({
            id: editingItem.id,
            title: newTitle,
            expiry: expiryForAPI
          }).unwrap();
          setEditingItem(null);
        } else {
          await addItem({ title: newTitle, expiry: expiryForAPI }).unwrap();
        }
        
        setNewTitle("");
        setNewExpiry("");
      } catch (err) {
        console.error('Failed to save item:', err);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setNewTitle("");
    setNewExpiry("");
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteItem(deleteConfirmation.itemId).unwrap();
      setDeleteConfirmation({ show: false, itemId: "", itemName: "" });
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ show: false, itemId: "", itemName: "" });
  };

  const handleDeleteClick = (itemId: string, itemName: string) => {
    setDeleteConfirmation({ show: true, itemId, itemName });
  };

  return (
    <FridgeTemplate
      header={
        <Header
          userName="Johnny"
          subtitle="🌤️ It's better to go shopping before this friday"
        />
      }
      form={
        <AddItemForm
          title={newTitle}
          expiry={newExpiry}
          isEditing={!!editingItem}
          onTitleChange={setNewTitle}
          onExpiryChange={setNewExpiry}
          onSubmit={handleAddItem}
          onCancel={handleCancelEdit}
        />
      }
      itemList={
        <FridgeItemList
          items={items}
          isLoading={isLoading}
          onItemClick={handleItemClick}
          onDeleteClick={handleDeleteClick}
          getItemStatus={getItemStatus}
        />
      }
      modal={
        <DeleteConfirmationModal
          isOpen={deleteConfirmation.show}
          itemName={deleteConfirmation.itemName}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      }
    />
  );
};

export default FridgeApp;