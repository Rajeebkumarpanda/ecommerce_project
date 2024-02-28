import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//getAll Products
export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async (args, { rejectWithValue }) => {
    const result = await axios.get(`https://dummyjson.com/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      return result.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
  cart: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productExists = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (productExists) {
        const index = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        state.cart[index].quantity = (state.cart[index].quantity || 1) + 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    // removeFromCart: (state, action) => {
    //   const productExists = state.cart.find(
    //     (item) => item.id === action.payload.id
    //   );
    //   if (productExists) {
    //     const index = state.cart.findIndex(
    //       (item) => item.id === action.payload.id
    //     );
    //     state.cart[index].quantity = (state.cart[index].quantity || 1) - 1;
    //   }
    // },
    removeFromCart: (state, action) => {
      const productExists = state.cart.find(
        (item) => item.id === action.payload.id
      );
    
      if (productExists) {
        const index = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
    
        state.cart[index].quantity = (state.cart[index].quantity || 1) - 1;
    
        if (state.cart[index].quantity === 0) {
          state.cart.splice(index, 1);
        }
      }
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { addToCart, removeFromCart } =
  productSlice.actions;

export default productSlice.reducer;
