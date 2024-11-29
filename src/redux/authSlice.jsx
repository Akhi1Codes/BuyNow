import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseline = "http://localhost:4000";
// const baseline = "https://buynow-backend-iasj.onrender.com";

const initialState = {
  data: [],
  profile: [],
  loading: false,
  isAuthenticated: false,
  registerLoading: false,
  registered: false,
  message: [],
  sent: false,
};

//Login User

export const userLogin = createAsyncThunk("user/login", async (data) => {
  const res = await fetch(`${baseline}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
});

//Logout user

export const userLogout = createAsyncThunk("user/logout", async () => {
  const res = await fetch(`${baseline}/api/v1/logout`);
  const result = await res.json();
  return result;
});

//Register User

export const userRegister = createAsyncThunk("user/register", async (data) => {
  const res = await fetch(`${baseline}/api/v1/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
});

//forgotPassword

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email) => {
    const res = await fetch(`${baseline}/api/v1/password/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    const result = await res.json();
    return result;
  }
);

//Profile
export const userProfile = createAsyncThunk("user/profile", async () => {
  const res = await fetch(`${baseline}/api/v1/me`, {
    credentials: "include",
  });
  const result = await res.json();
  return result;
});

//Update Profile

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (name, email) => {
    const res = await fetch(`${baseline}/api/v1/me/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(name, email),
    });
    const result = await res.json();
    return result;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //Logout user
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.data = "";
      state.profile = "";
      state.isAuthenticated = false;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.error = action.error.message;
    });

    //Registration
    builder.addCase(userRegister.pending, (state) => {
      state.registerLoading = true;
      state.error = "";
    });
    builder.addCase(userRegister.fulfilled, (state) => {
      state.registerLoading = false;
      state.registered = true;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.registerLoading = false;
      state.error = action.error.message;
    });

    //forgotPassword
    builder.addCase(forgotPassword.pending, (state) => {
      state.error = "";
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.message = action.payload;
      state.sent = true;
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.error = "";
    });

    //Profile
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    //Update Profile
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.message = action.payload;
    });
  },
});

export default authSlice.reducer;
