import axios from "axios";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IUser } from "../types";
import { BASE_URL } from "../utils/constants";

interface AuthState {
	userProfile: any;
	allUsers: Array<IUser>;
	addUser: (user: any) => void;
	removeUser: () => void;
	fetchAllUsers: () => void;
}
const useAuthStore = create<AuthState>()(
	devtools(
		persist(
			set => ({
				userProfile: null,
				allUsers: [],
				addUser: user => set({ userProfile: user }),
				removeUser: () => set({ userProfile: null }),
				fetchAllUsers: async () => {
					try {
						const { data }: { data: Array<IUser> } =
							await axios.get(`${BASE_URL}/api/users`);
						set({ allUsers: data });
					} catch (error) {
						set({ allUsers: [] });
					}
				},
			}),
			{ name: "auth" }
		)
	)
);

export default useAuthStore;
