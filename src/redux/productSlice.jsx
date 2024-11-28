import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseline = "http://localhost:4000";
// const baseline = "https://buynow-backend-iasj.onrender.com";

const initialState = {
  allProducts: null,
  product: null,
  loading: false,
  searched: false,
};

export const getAllProducts = createAsyncThunk("product/getAll", async () => {
  const res = await fetch(`${baseline}/api/v1/products`);
  const result = await res.json();
  return result;
});

export const getProduct = createAsyncThunk(
  "product/singleProduct",
  async (id) => {
    const res = await fetch(`${baseline}/api/v1/products/${id}`);
    const result = await res.json();
    return result;
  }
);

export const searchProducts = createAsyncThunk(
  "product/search",
  async (keyword) => {
    const res = await fetch(`${baseline}/api/v1/products?keyword=${keyword}`);
    const result = await res.json();
    return result;
  }
);

export const filterProducts = createAsyncThunk(
  "product/productfilter",
  async (category) => {
    const res = await fetch(`${baseline}/api/v1/products?category=${category}`);
    const result = await res.json();
    return result;
  }
);

export const priceFilter = createAsyncThunk(
  "product/pricefilter",
  async (min, max) => {
    const res = await fetch(
      `${baseline}/api/v1/products?price[gte]=${min}&price[lte]=${max}`
    );
    const result = await res.json();
    return result;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Single Product

    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Search Product
    builder.addCase(searchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Filter Product
    builder.addCase(filterProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
    });
    builder.addCase(filterProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Filter Price
    builder.addCase(priceFilter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(priceFilter.fulfilled, (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
    });
    builder.addCase(priceFilter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
