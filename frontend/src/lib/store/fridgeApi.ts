import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fromAPIDate, toAPIDate } from '../utils/dateUtils';

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
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ['FridgeItems'],
  endpoints: (builder) => ({
    // GET all items
    getFridgeItems: builder.query<FridgeItem[], void>({
      query: () => '/fridge',
      transformResponse: (response: FridgeItem[]) => {
        return response.map(item => ({
          ...item,
          expiry: fromAPIDate(item.expiry)
        }));
      },
      providesTags: ['FridgeItems'],
    }),

    // POST new item
    addFridgeItem: builder.mutation<FridgeItem, AddItemRequest>({
      query: (item) => ({
        url: '/fridge',
        method: 'POST',
        body: {
          ...item,
          expiry: toAPIDate(item.expiry)
        },
      }),
      
      transformResponse: (response: FridgeItem) => ({
        ...response,
        expiry: fromAPIDate(response.expiry)
      }),
      invalidatesTags: ['FridgeItems'],
    }),

    // PUT update item
    updateFridgeItem: builder.mutation<FridgeItem, UpdateItemRequest>({
      query: ({ id, ...item }) => ({
        url: `/fridge/${id}`,
        method: 'PUT',
        body: {
          ...item,
          expiry: toAPIDate(item.expiry) 
        },
      }),
      
      transformResponse: (response: FridgeItem) => ({
        ...response,
        expiry: fromAPIDate(response.expiry)
      }),
      invalidatesTags: ['FridgeItems'],
    }),

    // DELETE item
    deleteFridgeItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/fridge/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FridgeItems'],
    }),
  }),
});

export const {
  useGetFridgeItemsQuery,
  useAddFridgeItemMutation,
  useUpdateFridgeItemMutation,
  useDeleteFridgeItemMutation,
} = fridgeApi;