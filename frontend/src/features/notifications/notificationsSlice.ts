import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import { IProduct } from "../products/interfaces/Product.interface";

interface Notification {
  id: string;
  productId: string;
  cantidadRestante: number;
  fechaRegistro: string;
}

interface NotificationsState {
  list: Notification[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  products: Record<string, IProduct>;
}

const initialState: NotificationsState = {
  list: [],
  status: "idle",
  error: null,
  products: {},
};

export const fetchNotifications = createAsyncThunk<Notification[]>(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Notification[]>("/notifications");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching notifications");
    }
  }
);

export const createStockAlert = createAsyncThunk<Notification, { productId: string; cantidad_restante: number }>(
  "notifications/createStockAlert",
  async ({ productId, cantidad_restante }, { rejectWithValue }) => {
    try {
      const response = await api.post<Notification>("/notifications", {
        productId,
        cantidad_restante,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error creating stock alert");
    }
  }
);

export const fetchProductById = createAsyncThunk<IProduct, string>(
  "notifications/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get<IProduct>(`/products/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching product");
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string || "Unknown error";
      })

      .addCase(createStockAlert.fulfilled, (state, action: PayloadAction<Notification>) => {
        state.list.push(action.payload);
      })
      .addCase(createStockAlert.rejected, (state, action) => {
        state.error = action.payload as string || "Unknown error";
      })
      
      
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<IProduct>) => {
        const product = action.payload;
        if (product.id) { // ✅ Verifica que `id` no sea undefined
          state.products[product.id] = product;
        }
      });
      
      
  },
});

export default notificationsSlice.reducer;
