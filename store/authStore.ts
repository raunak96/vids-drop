import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
	userProfile: any;
	allUsers: Array<any>;
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
				fetchAllUsers: () => {},
			}),
			{ name: "auth" }
		)
	)
);

export default useAuthStore;
