import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  sportclubs: [],
  singleclub: {},
  status: "idle", // idle -> loading | successful | failed
  error: null,
};

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = import.meta.env.VITE_SPORT_URL;
const apiUrl = `${baseUrl}${endPoint}`;

export const fetchSportclubs = createAsyncThunk(
  "sportclubs/fetchSportclubs",
  async (_, { rejectWithValue }) => {
    let allResults = [];
    let nextPage = `${apiUrl}`;

    try {
      while (nextPage) {
        const response = await fetch(nextPage);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        allResults = [...allResults, ...data.results];
        nextPage = data.next;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
    return allResults;
  }
);

export const fetchClubById = createAsyncThunk(
  "sportclubs/fetchClubById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const sportclubSlice = createSlice({
  name: "sportclubs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSportclubs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSportclubs.fulfilled, (state, action) => {
        state.status = "successful";
        state.sportclubs = action.payload;
      })
      .addCase(fetchSportclubs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchClubById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClubById.fulfilled, (state, action) => {
        state.status = "successful";
        state.singleclub = action.payload;
      })
      .addCase(fetchClubById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default sportclubSlice.reducer;
export const selectAllSportclubs = (state) => state.sportclubs.sportclubs;
export const selectSingleClub = (state) => state.sportclubs.singleclub;
