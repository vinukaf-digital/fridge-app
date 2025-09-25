// "use client"

// import { useEffect, useState } from "react";

// type FridgeItem = {
//     _id: string;
//     title: string;
//     expiry: string;
// };

// export default function useFridgeItems() {
//     const [items, setItems] = useState<FridgeItem[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     async function fetchItems() {
//         try {
//             setIsLoading(true);
//             const res = await fetch("https://thefridge-api.karapincha.io/fridge");
//             if (!res.ok) throw new Error("Failed to fetch items");
//             const data = await res.json();
//             setItems(data);
//         } catch (error) {
//             setItems([]);
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     function getItemById(id: string): FridgeItem | undefined {
//         return items.find(item => item._id === id);
//     }

//     async function addItem(title: string, expiry: string) {
//         const res = await fetch("https://thefridge-api.karapincha.io/fridge", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ title, expiry }),
//         });
//         if (res.ok) {
//             await fetchItems();
//         }
//     }

//     async function deleteItem(id: string) {
//             try {
//                 const res = await fetch(`https://thefridge-api.karapincha.io/fridge/${id}`, {
//                     method: "DELETE",
//                 });

//                 if(res.ok || res.status === 404) {
//                     await fetchItems();
//                 } else {
//                     throw new Error("Failed to delete item");
//                 }
//             } catch (error) {
//                 console.error("Error deleting item:", error);
//                 await fetchItems();
//             }
//     }

//     async function updateItem(id: string, title: string, expiry: string) {
//         const res = await fetch(`https://thefridge-api.karapincha.io/fridge/${id}`, {
//             method: "PUT",  
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ title, expiry }),
//         });
//         if (!res.ok) throw new Error("Failed to update item");
//         await fetchItems();
//     }

//     return { items, getItemById, addItem, deleteItem, updateItem, isLoading };
// }