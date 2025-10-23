"use client";
import { Header } from "../components/molecules/Header";
import { AddItemForm } from "../components/organisms/AddItemForm";
import { FridgeItemList } from "../components/organisms/FridgeItemList";
import { DeleteConfirmationModal } from "../components/organisms/DeleteConfirmationModal";

const FridgeApp = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-12">
      <div className="w-full flex justify-center">
        <Header
          userName="Johnny"
          subtitle="🌤️ It's better to go shopping before this friday"
        />
      </div>
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <AddItemForm />
      </div>
      <div className="container mx-auto px-4 flex justify-center">
        <FridgeItemList />
      </div>
      <DeleteConfirmationModal />
    </div>
  );
};

export default FridgeApp;
