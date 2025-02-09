import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import { IProduct } from "../products/interfaces/Product.interface";

interface InventoryMovement {
  id: string;
  productId: string;
  tipo: "entrada" | "salida";
  cantidad: number;
  fecha: string;
}

interface InventoryState {
  movements: InventoryMovement[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  products: Record<string, IProduct>;
}

const initialState: InventoryState = {
  movements: [],
  status: "idle",
  error: null,
  products: {},
};

export const fetchMovements = createAsyncThunk<InventoryMovement[]>(
  "inventory/fetchMovements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<InventoryMovement[]>(
        "/inventory/movements"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching movements"
      );
    }
  }
);

export const updateStock = createAsyncThunk<
  InventoryMovement,
  { productId: string; tipo: "entrada" | "salida"; cantidad: number }
>("inventory/updateStock", async (movement, { rejectWithValue }) => {
  try {
    const response = await api.post<InventoryMovement>(
      "/inventory/movements",
      movement
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error updating stock");
  }
});

export const fetchProducts = createAsyncThunk<Record<string, IProduct>, void>(
  "inventory/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<IProduct[]>("/products"); 
      const productsMap = response.data.reduce((acc, product) => {
        if (product.id) { 
          acc[product.id] = product;
        }
        return acc;
      }, {} as Record<string, IProduct>);
      return productsMap;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching products");
    }
  }
);



const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchMovements.fulfilled,
        (state, action: PayloadAction<InventoryMovement[]>) => {
          state.status = "succeeded";
          state.movements = action.payload;
        }
      )
      .addCase(fetchMovements.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Unknown error";
      })

      .addCase(updateStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateStock.fulfilled,
        (state, action: PayloadAction<InventoryMovement>) => {
          state.status = "succeeded";
          state.movements.push(action.payload);
        }
      )
      .addCase(updateStock.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Unknown error";
      })
      
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      ;
  },
});

export default inventorySlice.reducer;
