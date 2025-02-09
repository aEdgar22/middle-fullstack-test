import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

// 📌 Tipo para una notificación de stock bajo
interface Notification {
  id: string;
  producto_id: string;
  cantidad_restante: number;
  fecha_registro: string;
}

// 📌 Estado inicial tipado
interface NotificationsState {
  list: Notification[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotificationsState = {
  list: [],
  status: "idle",
  error: null,
};

// 📌 AsyncThunk para obtener notificaciones
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

// 📌 AsyncThunk para registrar una notificación de stock bajo
export const createStockAlert = createAsyncThunk<Notification, { producto_id: string; cantidad_restante: number }>(
  "notifications/createStockAlert",
  async ({ producto_id, cantidad_restante }, { rejectWithValue }) => {
    try {
      const response = await api.post<Notification>("/notifications", {
        producto_id,
        cantidad_restante,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error creating stock alert");
    }
  }
);

// 📌 Slice tipado
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 Fetch Notifications
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

      // 📌 Create Stock Alert
      .addCase(createStockAlert.fulfilled, (state, action: PayloadAction<Notification>) => {
        state.list.push(action.payload);
      })
      .addCase(createStockAlert.rejected, (state, action) => {
        state.error = action.payload as string || "Unknown error";
      });
  },
});

export default notificationsSlice.reducer;
