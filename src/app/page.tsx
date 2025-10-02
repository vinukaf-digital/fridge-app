"use client";
import { useState } from "react";

// Import RTK Query hooks
import {
  useGetFridgeItemsQuery,
  useAddFridgeItemMutation,
  useUpdateFridgeItemMutation,
  useDeleteFridgeItemMutation,
} from "../lib/store/fridgeApi";

import { Header } from "../components/molecules/Header";
import { AddItemForm } from "../components/organisms/AddItemForm";
import { FridgeItemList } from "../components/organisms/FridgeItemList";
import { DeleteConfirmationModal } from "../components/organisms/DeleteConfirmationModal";
import { FridgeTemplate } from "../components/templates/FridgeTemplate";

const FridgeApp = () => {
  const { data: items = [], isLoading } = useGetFridgeItemsQuery();
  const [addItem] = useAddFridgeItemMutation();
  const [updateItem] = useUpdateFridgeItemMutation();
  const [deleteItem] = useDeleteFridgeItemMutation();

  const [openDeleteModal, setOpenDeleteModal] = useState<
    ((itemId: string, itemName: string) => void) | null
  >(null);

  const [formHandlers, setFormHandlers] = useState<{
    startEdit: (id: string, title: string, expiry: string) => void;
  } | null>(null);

  const handleItemClick = (item: any) => {
    formHandlers?.startEdit(item._id, item.title, item.expiry);
  };

  const handleAddItem = async (title: string, expiry: string) => {
    await addItem({ title, expiry }).unwrap();
  };

  const handleUpdateItem = async (
    id: string,
    title: string,
    expiry: string
  ) => {
    await updateItem({ id, title, expiry }).unwrap();
  };

  const handleDelete = async (itemId: string) => {
    await deleteItem(itemId).unwrap();
  };

  const handleDeleteClick = (itemId: string, itemName: string) => {
    openDeleteModal?.(itemId, itemName);
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
          onAddItem={handleAddItem}
          onUpdateItem={handleUpdateItem}
          onReady={setFormHandlers}
        />
      }
      itemList={
        <FridgeItemList
          items={items}
          isLoading={isLoading}
          onItemClick={handleItemClick}
          onDeleteClick={handleDeleteClick}
        />
      }
      modal={
        <DeleteConfirmationModal
          onDelete={handleDelete}
          onReady={setOpenDeleteModal}
        />
      }
    />
  );
};

export default FridgeApp;
