import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface InitialState {
	accessToken: string | undefined;
	role: string | undefined;
}

const initialState: InitialState = {
	accessToken: undefined,
	role: undefined,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAccessToken(state, action: PayloadAction<string>) {
			state.accessToken = action.payload;
		},
		setRole(state, action: PayloadAction<string>) {
			state.role = action.payload;
		},
		reset(state) {
			state.accessToken = undefined;
			state.role = undefined;
		},
	},
});

export const { setAccessToken, setRole, reset } = authSlice.actions;

export const getAccessToken = (state: RootState) => state.auth.accessToken;
export const getRole = (state: RootState) => state.auth.role;

export default authSlice.reducer;
