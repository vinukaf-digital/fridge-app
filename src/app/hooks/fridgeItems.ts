"use client"

import { useEffect, useState } from "react";

type FridgeItem = {
    _id: string;
    title: string;
    expiry: string;
};

export default function useFridgeItems() {
    const [items, setItems] = useState<FridgeItem[]>([]);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
    try {
            const res = await fetch("https://thefridge-api.karapincha.io/fridge");
            if (!res.ok) throw new Error("Failed to fetch items");
            const data = await res.json();
            setItems(data);
        } catch (error) {
            setItems([]);
        }
    }

    function getItemById(id: string): FridgeItem | undefined {
        return items.find(item => item._id === id);
    }

    async function addItem(title: string, expiry: string) {
        const res = await fetch("https://thefridge-api.karapincha.io/fridge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, expiry }),
        });
        // Optionally, you can refresh the items after adding
        if (res.ok) {
            await fetchItems();
        }
    }

    return { items, getItemById, addItem };
}