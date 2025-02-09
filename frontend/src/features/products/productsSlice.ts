import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import { IProduct } from "./interfaces/Product.interface";

export const fetchProducts = createAsyncThunk<IProduct[]>("products/fetchProducts", async () => {
  const response = await api.get("/products");
  return response.data;
});

export const createProduct = createAsyncThunk<IProduct, IProduct>("products/createProduct", async (product) => {
  const response = await api.post("/products", product);
  return response.data;
});

export const updateProduct = createAsyncThunk<IProduct, { id: string; updates: Partial<IProduct> }>(
  "products/updateProduct",
  async ({ id, updates }) => {
    const response = await api.put(`/products/${id}`, updates);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk<string, string>("products/deleteProduct", async (id) => {
  await api.delete(`/products/${id}`);
  return id;
});

interface ProductsState {
  items: IProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener productos
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error desconocido";
      })

      // Crear producto
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.items.push(action.payload);
      })

      // Modificar producto
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Eliminar producto
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
