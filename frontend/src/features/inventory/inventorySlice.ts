import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

interface InventoryMovement {
  id: string;
  producto_id: string;
  tipo: "entrada" | "salida";
  cantidad: number;
  fecha: string;
}

interface InventoryState {
  movements: InventoryMovement[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InventoryState = {
  movements: [],
  status: "idle",
  error: null,
};

export const updateStock = createAsyncThunk<
  InventoryMovement,
  { producto_id: string; tipo: "entrada" | "salida"; cantidad: number }
>("inventory/updateStock", async (movement, { rejectWithValue }) => {
  try {
    const response = await api.post<InventoryMovement>("/inventory/move", movement);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error updating stock");
  }
});

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStock.fulfilled, (state, action: PayloadAction<InventoryMovement>) => {
        state.status = "succeeded";
        state.movements.push(action.payload);
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string || "Unknown error";
      });
  },
});

export default inventorySlice.reducer;
