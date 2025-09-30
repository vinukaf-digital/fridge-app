import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type FridgeItem = {
  _id: string;
  title: string;
  expiry: string;
};

type AddItemRequest = {
  title: string;
  expiry: string;
};

type UpdateItemRequest = {
  id: string;
  title: string;
  expiry: string;
};

export const fridgeApi = createApi({
  reducerPath: 'fridgeApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://thefridge-api.karapincha.io' 
  }),
  tagTypes: ['FridgeItems'],
  endpoints: (builder) => ({
    // GET all items
    getFridgeItems: builder.query<FridgeItem[], void>({
      query: () => '/fridge',
      providesTags: ['FridgeItems'],
    }),

    // POST new item
    addFridgeItem: builder.mutation<FridgeItem, AddItemRequest>({
      query: (item) => ({
        url: '/fridge',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['FridgeItems'], // Auto-refetch after add
    }),

    // PUT update item
    updateFridgeItem: builder.mutation<FridgeItem, UpdateItemRequest>({
      query: ({ id, ...item }) => ({
        url: `/fridge/${id}`,
        method: 'PUT',
        body: item,
      }),
      invalidatesTags: ['FridgeItems'], // Auto-refetch after update
    }),

    // DELETE item
    deleteFridgeItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/fridge/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FridgeItems'], // Auto-refetch after delete
    }),
  }),
});

export const {
  useGetFridgeItemsQuery,
  useAddFridgeItemMutation,
  useUpdateFridgeItemMutation,
  useDeleteFridgeItemMutation,
} = fridgeApi;