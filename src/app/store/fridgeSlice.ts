import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

type FridgeItem = {
    _id: string;
    title: string;
    expiry: string;
};

type FridgeState = {
    items: FridgeItem[];
    isLoading: boolean;
    error: string | null;
};

const initialState: FridgeState = {
    items: [],
    isLoading: false,
    error: null,
};

export const fetchItems = createAsyncThunk('fridge/fetchItems', async () => {
    const response = await fetch('https://thefridge-api.karapincha.io/fridge');
    if (!response.ok) throw new Error('Failed to fetch items');
    return (await response.json()) as FridgeItem[];
});

export const addItem = createAsyncThunk(
    'fridge/addItem',
    async (item: {title: string; expiry: string}) => {
        const response = await fetch('https://thefridge-api.karapincha.io/fridge', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item),
        });
        if (!response.ok) throw new Error('Failed to add item');
        return (await response.json()) as FridgeItem;
    }
);

export const deleteItem = createAsyncThunk(
    'fridge/deleteItem',
    async (id: string) => {
        const response = await fetch(`https://thefridge-api.karapincha.io/fridge/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok && response.status !== 404) throw new Error('Failed to delete item');
        return id;
    }
);

export const updateItem = createAsyncThunk(
    'fridge/updateItem',
    async ({id, title, expiry}: {id: string; title: string; expiry: string}) => {   
        const response = await fetch(`https://thefridge-api.karapincha.io/fridge/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, expiry}),
        });
        if (!response.ok) throw new Error('Failed to update item');
        return (await response.json()) as FridgeItem;
    }
);

const fridgeSlice = createSlice({
    name: 'fridge',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action: PayloadAction<FridgeItem[]>) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch items';
            })
            .addCase(addItem.fulfilled, (state) => {})
            .addCase(deleteItem.fulfilled, (state) => {})
            .addCase(updateItem.fulfilled, (state) => {});
    },
});

export default fridgeSlice.reducer;